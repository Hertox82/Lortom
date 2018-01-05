/**
 * Created by hernan on 14/12/2017.
 */


import {Component, OnInit} from "@angular/core";
import {LtPlugin} from "@Lortom/plugins/Hardel/Plugin/Service/plugin.interface";
import {PluginService} from "@Lortom/plugins/Hardel/Plugin/Service/plugin.service";
import {Router} from "@angular/router";
import {ListComponent} from "@Lortom/model/list.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'pl-install',
    templateUrl: './install-plugin.component.html',
    styles: ['']
})
export class InstallPluginComponent extends ListComponent implements OnInit {

    listOfLatestPlugin: LtPlugin [];
    widthStyle: any;

    constructor(public inPl: PluginService, private router : Router, private serviceModal: NgbModal) {
        super();

        this.listOfLatestPlugin = [];

        this.retrieveListOfLatestPlugin();
    }
    ngOnInit() {}

    retrieveListOfLatestPlugin() {
        this.inPl.getLatestPlugin().subscribe(
            (data: LtPlugin[]) => {

                this.listOfLatestPlugin = data;
                this.listOfData = this.listOfLatestPlugin;
                this.updateListaShow();
            }
        );
    }

    downloadPlugin(plugin: LtPlugin,modal) {
        const mod = this.serviceModal.open(modal);
        this.widthStyle = '20%';
        this.inPl.installPlugin(plugin).subscribe(
           (message: boolean) => {
               if(message) {
                   this.widthStyle = '40%';
                   this.retrieveListOfLatestPlugin();
                   this.widthStyle = '80%';
                   this.inPl.getPluginsFrom()
                       .subscribe(
                       (data: LtPlugin[]) => {
                           this.widthStyle = '99%';
                           this.inPl.setPlugins(data);
                           mod.close();
                           this.widthStyle= '10%';
                       }
                   );
               }

           }
       );
    }

    updatePlugin(plugin: LtPlugin,modal) {
        //this is to update plugin
        const mod = this.serviceModal.open(modal);
        this.widthStyle='20%';
        this.inPl.updatePlugin(plugin).subscribe(
            (message: boolean) => {
                if(message) {
                    this.widthStyle = '40%';
                    this.retrieveListOfLatestPlugin();
                    this.widthStyle = '80%';
                    this.inPl.getPluginsFrom()
                        .subscribe(
                            (data: LtPlugin[]) => {
                                this.widthStyle = '99%';
                                this.inPl.setPlugins(data);
                                mod.close();
                                this.widthStyle= '10%';
                            }
                        );
                }
            }
        );
    }
}