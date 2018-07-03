

import {Component, OnInit} from '@angular/core';
import {LtPlugin} from '@Lortom/plugins/Hardel/Plugin/Service/plugin.interface';
import {PluginService} from '@Lortom/plugins/Hardel/Plugin/Service/plugin.service';
import {Router} from '@angular/router';
import {ListComponent} from '@Lortom/model/list.component';


@Component({
    selector: 'pl-list',
    templateUrl: './listplugin.component.html',
    styles : ['']
})
export class ListPluginComponent extends ListComponent implements OnInit {
    listOfPlugins: LtPlugin[];
    myRoot = '/backend/plugin/plugins';
    isRoot = false;

    constructor(public plsSer: PluginService, public router: Router) {

        super();

        this.listOfPlugins = [];

        this.onComponentInit({
            name: 'plsSer',
            permission: 'Hardel.Plugin.Plugins',
            upd: 'updatePlugins$'
        }, 'router', 'retrieveListOfPlugins');
    }
    ngOnInit() {}

    /**
     * This function call the Service in order to get the list Of Plugins
     */
    retrieveListOfPlugins(): void {
        this.plsSer.getPluginsFrom().subscribe(
            (listPl: LtPlugin[]) => {
                this.listOfPlugins = listPl;
                this.listOfData = this.listOfPlugins;
                this.plsSer.setPlugins(this.listOfPlugins);
                this.updateListaShow();
            }
        );
    }

    /**
     * function to push or splice item into Deleted List of Roles
     * @param ev
     * @param data
     */
    eventChange(ev, data: LtPlugin): void {
       this.eventChangeData(ev, data);
    }

    /**
     * This function is to delete Plugins selected
     */
    deletePlugin(plugin: LtPlugin) {
        this.plsSer.deletePackPlugin(plugin).subscribe(
            (data: LtPlugin[]) => {
                this.listOfPlugins = data;
                this.listOfData = this.listOfPlugins;
                this.plsSer.setPlugins(this.listOfPlugins);
                this.retrieveListOfData({
                    name: 'plsSer',
                    getData: 'getPlugins',
                    setData: 'setPlugins',
                    callApi: 'getPluginsFrom',
                    check: 'checkPluginsExist'
                }, 'listOfPlugins');
            }
        );
    }

    updatePlugin(plugin: LtPlugin) {
        console.log('update this plugin');
    }

    packPlugin(plugin: LtPlugin) {
        this.plsSer.packPlugin(plugin).subscribe(
            (data: LtPlugin[]) => {
                this.listOfPlugins = data;
                this.listOfData = this.listOfPlugins;
                this.plsSer.setPlugins(this.listOfPlugins);
                this.retrieveListOfData({
                    name: 'plsSer',
                    getData: 'getPlugins',
                    setData: 'setPlugins',
                    callApi: 'getPluginsFrom',
                    check: 'checkPluginsExist'
                }, 'listOfPlugins');
            }
        );
    }

    uninstallPlugins() {
        if (confirm('Do you really uninstall this plugins?')) {
            this.plsSer.uninstallPlugins(this.listOfDataToDelete).subscribe(
                (message: boolean) => {
                    if (message) {
                        this.plsSer.getPluginsFrom().subscribe(
                            (listPl: LtPlugin[]) => {
                                this.listOfPlugins = listPl;
                                this.listOfData = this.listOfPlugins;
                                this.plsSer.setPlugins(this.listOfPlugins);
                                this.updateListaShow();
                            }
                        );
                    }
                }
            );
        }
    }
}
