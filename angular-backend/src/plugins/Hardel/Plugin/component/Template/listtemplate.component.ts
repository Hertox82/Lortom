import { Component, OnInit } from '@angular/core';
import {ListComponent} from "@Lortom/model/list.component";
import {LtTemplate} from "@Lortom/plugins/Hardel/Plugin/Service/plugin.interface";
import {PluginService} from "@Lortom/plugins/Hardel/Plugin/Service/plugin.service";
import {Router} from "@angular/router";


@Component({
    selector: 'tp-list',
    templateUrl: './listtemplate.component.html',
    styles: ['']
})
export class ListTemplateComponent extends ListComponent implements OnInit {
    listOfTemplate:  LtTemplate[];
    listOfNotActiveTemplate: LtTemplate[];
    myRoot = '/backend/plugin/template';
    isRoot = false;
    constructor(public tpSer: PluginService, public router: Router) {
        super();

        this.listOfTemplate = [];
        this.listOfNotActiveTemplate = [];

        this.onComponentInit({
            name: 'tpSer',
            permission: 'Hardel.Plugin.Template',
            upd: 'updateTemplate$'
        }, 'router', 'retrieveListOfTemplate');
    }
    ngOnInit() {}

    /**
     * function to push or splice item into Deleted List of Roles
     * @param ev
     * @param data
     */
    eventChange(ev, data: LtTemplate): void {
        this.eventChangeData(ev, data);
    }


    retrieveListOfTemplate() {
        this.tpSer.getTemplateFrom().subscribe(
            (data: any) => {
                this.listOfNotActiveTemplate = data.templates as LtTemplate[];
                this.listOfTemplate = data.template as LtTemplate[];
                this.listOfData = this.listOfNotActiveTemplate;
                this.tpSer.setTemplate(this.listOfTemplate);
                this.updateListaShow();
            }
        );
    }

    packTemplate(temp: LtTemplate) {
        this.tpSer.packTemplate(temp).subscribe(
            (data: any) => {
                this.retrieveListOfTemplate();
            }
        );
    }

    unpackTemplate(temp: LtTemplate) {
        this.tpSer.deletePackTemplate(temp).subscribe(
            (data: any) => {
                this.retrieveListOfTemplate();
            }
        );

    }

    activateTemplate(temp: LtTemplate) {
        this.tpSer.activateTemplate(temp).subscribe(
            (data: any) => {
                this.retrieveListOfTemplate();
            }
        );
    }

    deactivateTemplate(temp: LtTemplate) {
        this.tpSer.deactivateTemplate(temp).subscribe(
            (data: any) => {
                this.retrieveListOfTemplate();
            }
        );
    }

    installTemplate(temp: LtTemplate) {
        this.tpSer.installTemplate(temp).subscribe(
            (data: any) => {
                this.retrieveListOfTemplate();
            }
        );
    }

    uninstallTemplate(temp: LtTemplate) {
        this.tpSer.uninstallTemplate(temp).subscribe(
            (data: any) => {
                this.retrieveListOfTemplate();
            }
        );
    }

    uninstallTemplates() {
        if (confirm('Do you really uninstall this plugins?')) {
            this.tpSer.uninstallTemplates(this.listOfDataToDelete).subscribe(
                (message: boolean) => {
                    if (message) {
                       this.retrieveListOfTemplate();
                    }
                }
            );
        }
    }
}
