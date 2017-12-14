


import {Component, OnInit} from "@angular/core";
import {Page} from "../../Services/website.interfaces";
import {WebsiteService} from "../../Services/website.service";
import {NavigationEnd, Router} from "@angular/router";
import {ListComponent} from "@Lortom/model/list.component";
@Component({
    selector : 'wb-pages',
    templateUrl : './pages.component.html',
    styles : ['']
})

export class PagesComponent extends ListComponent implements OnInit
{
    listaPages : Page[] = [];
    myRoot = '/backend/website/pages';
    isRoot = false;

    constructor(private wb_Service : WebsiteService, private router :Router) {

        super();
        this.onComponentInit({
            name: 'wb_Service',
            permission: 'Hardel.Website.Pages',
            upd: 'updatePages$'
        },'router','retrieveListOfPages');
    }

    ngOnInit() {}

    retrieveListOfPages() : void
    {
        this.retrieveListOfData({
            name:'wb_Service',
            getData: 'getPages',
            setData: 'setPages',
            callApi: 'getPagesFrom',
            check: 'checkPagesExist'
        },'listaPages');
    }


    /**
     * function to push or splice item into Deleted List of Roles
     * @param ev
     * @param data
     */
    eventChange(ev,data : Page) : void
    {
        this.eventChangeData(ev,data);
    }

    deletePages()
    {
        this.deleteData({
            name: 'wb_Service',
            setData: 'setPages',
            delFn: 'deletePages'
        },'listaPages',"Do you really want delete this Pages?");
    }
}
