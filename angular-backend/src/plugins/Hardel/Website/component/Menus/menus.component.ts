/**
 * Created by hernan on 05/12/2017.
 */



import {Component, OnInit} from "@angular/core";
import {LortomMenu} from "@Lortom/plugins/Hardel/Website/Services/website.interfaces";
import {WebsiteService} from "@Lortom/plugins/Hardel/Website/Services/website.service";
import {Router} from "@angular/router";
import {ListComponent} from "@Lortom/model/list.component";
@Component({
    selector: 'wb-menus',
    templateUrl: './menus.component.html',
    styles: ['']
})

export class MenusComponent extends ListComponent implements OnInit {
    listOfMenus : LortomMenu [] = [];
    myRoot = '/backend/website/menu';
    isRoot = false;

    constructor(private mcService : WebsiteService, private router : Router) {

        super();
        this.listOfMenus = [];
        this.onComponentInit({
            name: 'mcService',
            permission: 'Hardel.Website.Menu',
            upd: 'updateMenus$'
        },'router','retrieveListOfMenus');
    }
    ngOnInit(){}

    retrieveListOfMenus()
    {
        this.retrieveListOfData({
            name:'mcService',
            getData: 'getMenus',
            setData: 'setMenus',
            callApi: 'getMenusFrom',
            check: 'checkMenusExist'
        },'listOfMenus');
    }

    eventChange(ev,data : LortomMenu) : void
    {
        this.eventChangeData(ev,data);
    }

    deleteMenus()
    {
        this.deleteData({
            name: 'mcService',
            setData: 'setMenus',
            delFn: 'deleteMenus'
        },'listOfMenus',"Do you really want delete this Menus?");
    }
}
