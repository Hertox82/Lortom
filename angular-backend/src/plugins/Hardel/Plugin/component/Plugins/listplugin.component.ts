

import {Component, OnInit} from "@angular/core";
import {LtPlugin} from "@Lortom/plugins/Hardel/Plugin/Service/plugin.interface";
import {PluginService} from "@Lortom/plugins/Hardel/Plugin/Service/plugin.service";
import {Router} from "@angular/router";
import {ListComponent} from "@Lortom/model/list.component";


@Component({
    selector: 'pl-list',
    templateUrl: './listplugin.component.html',
    styles : ['']
})
export class ListPluginComponent extends ListComponent implements OnInit
{
    listOfPlugins : LtPlugin[];
    myRoot: string = '/backend/plugin/plugins';
    isRoot = false;

    constructor(public plsSer: PluginService, public router: Router) {

        super();

        this.listOfPlugins = [];

        this.onComponentInit({
            name: 'plsSer',
            permission: 'Hardel.Plugin.Plugins',
            upd: 'updatePlugins$'
        },'router','retrieveListOfPlugins');
    }
    ngOnInit() {}

    /**
     * This function call the Service in order to get the list Of Plugins
     */
    retrieveListOfPlugins() : void {
        this.retrieveListOfData({
            name:'plsSer',
            getData: 'getPlugins',
            setData: 'setPlugins',
            callApi: 'getPluginsFrom',
            check: 'checkPluginsExist'
        },'listOfPlugins');
    }

    /**
     * function to push or splice item into Deleted List of Roles
     * @param ev
     * @param data
     */
    eventChange(ev,data : LtPlugin) : void
    {
       this.eventChangeData(ev,data);
    }

    /**
     * This function is to delete Plugins selected
     */
    deletePlugins()
    {
        this.deleteData({
            name: 'plsSer',
            setData: 'setPlugins',
            delFn: 'deletePlugins'
        },'listOfPlugins',"Do you really want delete this Plugins?");
    }
}