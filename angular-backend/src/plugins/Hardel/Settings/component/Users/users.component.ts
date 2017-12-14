/**
 * Created by hernan on 09/11/2017.
 */


import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {ListComponent} from "@Lortom/model/list.component";
import {User} from "@Lortom/plugins/Hardel/Settings/Services/settings.interfaces";
import {SettingsService} from "@Lortom/plugins/Hardel/Settings/Services/settings.service";

@Component({
    selector : 'settings-users',
    templateUrl : './users.component.html',
    styles : ['']
})

export class UsersComponent extends ListComponent implements OnInit
{
    listaUser : User[] = [];
    myRoot = '/backend/settings/users';
    isRoot = false;

    constructor(public s_Service : SettingsService, public router : Router) {

        super();

        this.onComponentInit({
            name: 's_Service',
            permission: 'Hardel.Settings.Users',
            upd: 'updateUsers$'
        },'router','retrieveListOfUsers');
    }

    ngOnInit() {}

    retrieveListOfUsers() : void
    {
        this.retrieveListOfData({
            name:'s_Service',
            getData: 'getUsers',
            setData: 'setUsers',
            callApi: 'getUsersFrom',
            check: 'checkUsersExist'
        },'listaUser');
    }

    /**
     * function to push or splice item into Deleted List of Roles
     * @param ev
     * @param data
     */
    eventChange(ev,data : User) : void
    {
        this.eventChangeData(ev,data);
    }

    deleteUsers()
    {
        this.deleteData({
            name: 's_Service',
            setData: 'setUsers',
            delFn: 'deleteUsers'
        },'listaUser',"Do you really want delete this Users?");
    }
}