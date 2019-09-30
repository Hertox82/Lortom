import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterContentInit, OnDestroy, Input } from '@angular/core';
import { SC } from '../../sc';
import { RoutingActionComponent } from '../actions/routing.action.component';
import { EventActionComponent } from '../actions/event.action.component';
import { IActionTabList, ITabListObject } from '../interface.tablist';
import { PaginationService } from '@Lortom/services/pagination.service';



@Component({
    selector: 'tablist',
    templateUrl: './tablist.component.html',
    styleUrls: []
})
export class TabListComponent implements AfterContentInit, OnDestroy {
    @Input() listOfTabLink: any[];
    @ViewChild('acCon', {read: ViewContainerRef}) actionContainer: ViewContainerRef;
    @Input() listOfAction: {
        data: any;
        type: string;
    }[];

    @Input() listOfData: ITabListObject[];
    @Input() header: ITabListObject;
    @Input() basePath: string;

    listOfActionComponent: IActionTabList[];
    listToShow: any;
    listOfDataToDelete: any = [];
    actualPage: number;
    perPage: number;
    pagServ: PaginationService;
    subscription = [];

    constructor(private tbliService: SC, private tblresolver: ComponentFactoryResolver) {
        this.listOfTabLink = [];
        this.tbliService
        .addTabListAction('routing', RoutingActionComponent)
        .addTabListAction('event', EventActionComponent);
        this.listOfActionComponent = [];
        this.header = {
            fields: []
        };
        this.basePath = '';
        this.listOfAction = [];
        this.actualPage = 1;
        this.pagServ = new PaginationService();
    }

    ngAfterContentInit() {
        this.build();
    }

    build() {
        this.actionContainer.clear();
        this.listOfAction.forEach((action) => {
            const factory = this.tblresolver.resolveComponentFactory(this.tbliService.getTabListAction(action.type));
            const compRef = this.actionContainer.createComponent(factory);
            const component = compRef.instance;
            component.setData(action.data);
            if ( action.type === 'event') {
                if ('obj' in action.data) {
                    if (typeof action.data.obj[action.data.nameFn] === 'function') {
                        this.subscription.push(component.action.subscribe(
                            (event: any) => {
                                action.data.obj[action.data.nameFn](event, action.data.obj);
                            }
                        ));
                    } else {
                        console.error('no function matched with this name');
                    }
                } else {
                    console.error('No Object in action.data');
                }
            }
            this.listOfActionComponent.push(component);
        });
    }

    ngOnDestroy() {
        this.subscription.forEach(x => x.unsubscribe());
    }

        /**
     * This function is
     */
     updateListaShow(): void {
        this.listToShow = this.pagServ.getShowList({
            entry : this.perPage,
            list : this.listOfData,
            pageToShow : this.actualPage
        });
    }

    /**
     * This function is to Catch Event of Pagination
     */
    onPrev() {
        this.actualPage--;
        this.updateListaShow();
    }

    /**
     * This function is to Catch Event of Pagination
     * @param ev
     */
    onNext(ev) {
        this.actualPage++;
        this.updateListaShow();
    }

    /**
     * This function is to Catch Event of Pagination
     * @param act
     */
    onPage(act) {
        this.actualPage = act;
        this.updateListaShow();
    }

    /**
     * This function is to Catch Event of Pagination
     * @param n
     */
    onPerPage(n: number) {
        this.perPage = n;
        this.updateListaShow();
    }

     /**
     * This function hold the Event from other Component
     * @param ev
     * @param data
     */
    public  eventChange(ev, data: any): void {
        if (ev.target.checked) {
            this.listOfDataToDelete.push(data);
        } else {
            const index = this.listOfDataToDelete.indexOf(data);
            if (index > -1) {
                this.listOfDataToDelete.splice(index, 1);
            }
        }
    }

    public passId() {
        const listToReturn = [];
        this.listOfDataToDelete.forEach((
            (item: any) => {
                 item.fields.forEach((field) => {
                    if (field.type == 'id') {
                        listToReturn.push({
                            id: field.value
                        });
                    }
                });
            }
        ));

        return listToReturn;
    }
}
