/**
 * Created by hernan on 30/10/2017.
 */


import {Component, OnInit} from "@angular/core";
import {SettingsService} from "../../Services/settings.service";
import {Role} from "../../Services/settings.interfaces";
import {Router} from "@angular/router";
import {ListComponent} from "@Lortom/model/list.component";

@Component({
    selector : 'app-roles-component',
    templateUrl : './roles.component.html',
    styles : ['']
})

export class RolesComponent extends ListComponent implements OnInit
{
    listaRole: Role[] = [];
    myRoot = '/backend/settings/roles';
    isRoot = false;

    constructor(public c_Service: SettingsService, public router: Router) {
        super();

        this.onComponentInit({
            name: 'c_Service',
            permission: 'Hardel.Settings.Roles',
            upd: 'updateRoles$'
        }, 'router', 'retrieveListOfRoles');
    }

    ngOnInit() {}

    retrieveListOfRoles(): void {
        this.retrieveListOfData({
            name: 'c_Service',
            getData: 'getRoles',
            setData: 'setRoles',
            callApi: 'getRolesFrom',
            check: 'checkRolesExist'
        }, 'listaRole');
    }

    /**
     * function to push or splice item into Deleted List of Roles
     * @param ev
     * @param data
     */
    eventChange(ev,data : Role) : void
    {
       this.eventChangeData(ev,data);
    }

    deleteRoles()
    {
        this.deleteData({
            name: 'c_Service',
            setData: 'setRoles',
            delFn: 'deleteRoles'
        },'listaRole',"Do you really want delete this Roles?");
    }
}