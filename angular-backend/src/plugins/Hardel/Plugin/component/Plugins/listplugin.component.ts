

import {Component, OnInit} from "@angular/core";
import {LtPlugin} from "@Lortom/plugins/Hardel/Plugin/Service/plugin.interface";
import {PluginService} from "@Lortom/plugins/Hardel/Plugin/Service/plugin.service";
import {NavigationEnd, Router} from "@angular/router";
import {PaginationService} from "@Lortom/services/pagination.service";
import {ListComponent} from "@Lortom/model/list.component";


@Component({
    selector: 'pl-list',
    templateUrl: './listplugin.component.html',
    styles : ['']
})
export class ListPluginComponent extends ListComponent implements OnInit
{
    listOfPlugins : LtPlugin[];
    listPluginsShow : LtPlugin[];
    listOfPluginsToDelete: LtPlugin[];
    actualPage : number;
    perPage : number;
    myRoot: string = '/backend/plugin/plugins';
    isRoot = false;
    pagServ : PaginationService;

    constructor(private plsSer: PluginService, private router: Router) {

        super();

        if(!this.plsSer.hasPermissions("Hardel.Plugin.Plugins"))
        {
            this.router.navigate(['/backend/dashboard']);
        }
        this.listOfPlugins = [];
        this.listOfPluginsToDelete = [];


        this.router.events.subscribe(
            (val) => {
                if(val instanceof NavigationEnd)
                {
                    if(this.myRoot === val.url)
                    {
                        this.isRoot = true;
                    }
                    else
                    {
                        this.isRoot = false;
                    }
                }
            }
        );

        this.retrieveListOfPlugins();
        this.plsSer.updatePlugins$.subscribe(
            () => {
                this.retrieveListOfPlugins();
            }
        );
    }
    ngOnInit() {}

    /**
     * This function call the Service in order to get the list Of Plugins
     */
    retrieveListOfPlugins() : void {
        if(!this.plsSer.checkPluginsExist())
        {
            this.plsSer.getPluginsFrom().subscribe(
                (plugins: LtPlugin[]) => {

                    this.listOfPlugins = plugins;
                    this.listOfData = this.listOfPlugins;
                    this.listOfPlugins.forEach((plugin : LtPlugin) => {
                        plugin.check = false;
                    });
                    this.plsSer.setPlugins(this.listOfPlugins);
                    this.updateListaShow();
                }
            );
        }
        else {
            this.listOfPlugins = this.plsSer.getPlugins();
            this.listOfData = this.listOfPlugins;
            this.listOfPlugins.forEach((item : any) => {
                if(!item.hasOwnProperty('check'))
                {
                    item.check = false;
                }
            });
            this.updateListaShow();
        }
    }

    /**
     * function to push or splice item into Deleted List of Roles
     * @param ev
     * @param data
     */
    eventChange(ev,data : LtPlugin) : void
    {
        if(ev.target.checked)
        {
            this.listOfPluginsToDelete.push(data);
        }
        else
        {
            let index = this.listOfPluginsToDelete.indexOf(data);

            if(index > -1)
            {
                this.listOfPluginsToDelete.splice(index,1);
            }
        }
    }

    deletePages()
    {
        if(this.listOfPluginsToDelete.length > 0)
        {
            if(confirm('Do you really want delete this Roles?'))
            {
                this.plsSer.deletePlugins(this.listOfPluginsToDelete).subscribe(
                    (data : any) => {
                        this.listOfPluginsToDelete = [];
                        this.listOfPlugins = data;
                        this.listOfData = this.listOfPlugins;
                        this.plsSer.setPlugins(this.listOfPlugins);
                        this.updateListaShow();
                    }
                );
            }
        }
    }
}