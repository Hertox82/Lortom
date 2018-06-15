/**
 * Created by hernan on 04/06/2018.
 */


import {Component, OnInit} from "@angular/core";
import {ListComponent} from "@Lortom/model/list.component";
import {LtTemplate} from "@Lortom/plugins/Hardel/Plugin/Service/plugin.interface";
import {PluginService} from "@Lortom/plugins/Hardel/Plugin/Service/plugin.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
    selector: 'template-install',
    templateUrl: './install-template.component.html',
    styles: ['']
})


export class InstallTemplateComponent extends ListComponent implements OnInit {

    listOfLatestTemplate: LtTemplate[];
    widthStyle: any;

    constructor(public inTmp: PluginService, private router : Router, private serviceModal: NgbModal) {
        super();

        this.listOfLatestTemplate = [];

        this.retrieveListOfLatestTemplate();
    }

    ngOnInit() {}

    retrieveListOfLatestTemplate() {
        this.inTmp.getLatestTemplate().subscribe(
            (data: LtTemplate[]) => {

                this.listOfLatestTemplate = data;
                this.listOfData = this.listOfLatestTemplate;
                this.updateListaShow();
            }
        );
    }

    downloadTemplate(template: LtTemplate,modal) {
        const mod = this.serviceModal.open(modal);
        this.widthStyle = '20%';
        this.inTmp.installTemplate(template).subscribe(
            (message: boolean) => {
                if(message) {
                    this.widthStyle = '40%';
                    this.retrieveListOfLatestTemplate();
                    this.widthStyle = '80%';
                    this.inTmp.getPluginsFrom()
                        .subscribe(
                            (data: LtTemplate[]) => {
                                this.widthStyle = '99%';
                                this.inTmp.setPlugins(data);
                                mod.close();
                                this.widthStyle= '10%';
                            }
                        );
                }

            }
        );
    }

    updateTemplate(template: LtTemplate,modal) {
        //this is to update plugin
        const mod = this.serviceModal.open(modal);
        this.widthStyle='20%';
        this.inTmp.updateTemplate(template).subscribe(
            (message: boolean) => {
                if(message) {
                    this.widthStyle = '40%';
                    this.retrieveListOfLatestTemplate();
                    this.widthStyle = '80%';
                    this.inTmp.getPluginsFrom()
                        .subscribe(
                            (data: LtTemplate[]) => {
                                this.widthStyle = '99%';
                                this.inTmp.setPlugins(data);
                                mod.close();
                                this.widthStyle= '10%';
                            }
                        );
                }
            }
        );
    }
}