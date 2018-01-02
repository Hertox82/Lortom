/**
 * Created by hernan on 14/12/2017.
 */


import {Component, OnInit} from "@angular/core";
import {LtPlugin} from "@Lortom/plugins/Hardel/Plugin/Service/plugin.interface";
import {PluginService} from "@Lortom/plugins/Hardel/Plugin/Service/plugin.service";
import {Router} from "@angular/router";
import {ListComponent} from "@Lortom/model/list.component";

@Component({
    selector: 'pl-install',
    templateUrl: './install-plugin.component.html',
    styles: ['']
})
export class InstallPluginComponent extends ListComponent implements OnInit {

    listOfLatestPlugin: LtPlugin [];

    constructor(public inPl: PluginService, private router : Router) {
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

    downloadPlugin(plugin: LtPlugin) {
        //this is to install plugin
    }

    updatePlugin(plugin: LtPlugin) {
        //this is to update plugin
    }
}