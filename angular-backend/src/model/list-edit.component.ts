import { ITabListObject } from '@Lortom/app/build-editor/tablist/interface.tablist';
import { ViewChild } from '@angular/core';
import { TabListComponent } from '@Lortom/app/build-editor/tablist/component/tablist.component';
import { Router, NavigationEnd } from '@angular/router';
import { MasterService } from '@Lortom/services/master.service';



export class ListEditComponent {
    listOfResource = [];
    isRoot = false;
    myRoot = '';
    listOfLink: any[];
    listOfActions = [];
    listTh: ITabListObject;
    self: any;
    keyPath: string;

    @ViewChild(TabListComponent) tbList: TabListComponent;
    constructor(private srvBlog: MasterService,
        private rt: Router,
        url: string,
        functName: string) {
        this.listTh = {
            fields: []
        };

        this.self = this;
        this.myRoot = url;
        this.keyPath = functName;
        this.rt.events.subscribe(
            (val) => {
                if (val instanceof NavigationEnd) {
                    if (this['myRoot'] === val.url) {
                        this['isRoot'] = true;
                        this.buildView();
                    } else {
                        this['isRoot'] = false;
                    }
                }
            }
        );
    }

    buildView() {
        this.srvBlog.index(this.keyPath)
        .subscribe((response: any) => {
            this.listOfResource = response.data;
            this.listOfActions = response.actions;
            this.listTh = response.tableHeader;
            if (this.tbList !== undefined) {
                this.tbList.header = this.listTh;
                this.listOfLink = response.tabs;

                this.listOfActions.forEach(
                    (item) => {
                        if (item.type === 'event') {
                            item.data['obj'] = this.self;
                            let label: string = item.data['label'];
                            label = label.toLowerCase();
                            const nameFn = label + item.type.charAt(0).toUpperCase() + item.type.slice(1);
                            item.data['nameFn'] = nameFn;
                        }
                    }
                );

                this.tbList.listOfAction = this.listOfActions;
                this.tbList.build();
                this.tbList.listOfData = this.listOfResource;
                this.tbList.updateListaShow();
            }
        });
    }

    deleteEvent(data: any, self: any) {
        self.delete(self.tbList.passId());
    }

    delete(data: any) {
        this.srvBlog.delete(this.keyPath, data)
        .subscribe(
            (response: any) => {
                this.buildView();
            }
        );
    }
}
