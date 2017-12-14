/**
 * Created by hernan on 20/11/2017.
 */



import {Component, OnInit} from "@angular/core";
import {LortomComponent} from "@Lortom/plugins/Hardel/Website/Services/website.interfaces";
import {WebsiteService} from "@Lortom/plugins/Hardel/Website/Services/website.service";
import {Router} from "@angular/router";
import {ListComponent} from "@Lortom/model/list.component";
@Component({
    selector : 'wb-components',
    templateUrl : './components.component.html',
    styles : ['']
})


export class ComponentsComponent extends ListComponent implements OnInit
{
    listOfComponents : LortomComponent [] = [];
    myRoot = '/backend/website/components';
    isRoot = false;

    constructor(public ccService : WebsiteService, public router : Router) {

        super();
        this.listOfComponents = [];

        this.onComponentInit({
            name: 'ccService',
            permission: 'Hardel.Website.Component',
            upd: 'updateComponents$'
        },'router','retrieveListOfComponents');
    }
    ngOnInit(){}

    retrieveListOfComponents()
    {
        this.retrieveListOfData({
            name:'ccService',
            getData: 'getComponents',
            setData: 'setComponents',
            callApi: 'getComponentsFrom',
            check: 'checkComponentsExist'
        },'listOfComponents');
    }

    eventChange(ev,data : LortomComponent) : void
    {
        this.eventChangeData(ev,data);
    }

    deleteComponents()
    {
        this.deleteData({
            name: 'ccService',
            setData: 'setComponents',
            delFn: 'deleteComponents'
        },'listOfComponents',"Do you really want delete this Components?");
    }
}
