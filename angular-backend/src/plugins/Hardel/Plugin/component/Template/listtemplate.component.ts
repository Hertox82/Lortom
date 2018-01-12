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
    listOfLastTemplate: LtTemplate[];
    myRoot = '/backend/plugin/template';
    isRoot = false;
    constructor(public tpSer: PluginService, public router: Router) {
        super();

        this.listOfTemplate = [];
        this.listOfLastTemplate = [];

        this.onComponentInit({
            name: 'tpSer',
            permission: 'Hardel.Plugin.Template',
            upd: 'updatePlugins$'
        }, 'router', 'retrieveListOfTemplate');
    }
    ngOnInit() {}


    retrieveListOfTemplate() {
        this.tpSer.getTemplateFrom().subscribe(
            (data: any) => {
                this.listOfLastTemplate = data.templates as LtTemplate[];
                this.listOfTemplate = data.template as LtTemplate[];
                this.listOfData = this.listOfLastTemplate;
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

    installTemplate(temp: LtTemplate) {
        //todo
    }

    uninstallTemplate() {
        //todo
    }
}
