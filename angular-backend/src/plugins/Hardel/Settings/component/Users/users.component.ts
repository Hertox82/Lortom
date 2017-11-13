/**
 * Created by hernan on 09/11/2017.
 */


import {Component, OnInit} from "@angular/core";
import {Role,User} from "../../Services/settings.interfaces";
import {SettingsService} from "../../Services/settings.service";
import {NavigationEnd, Router} from "@angular/router";

@Component({
    selector : 'settings-users',
    templateUrl : './users.component.html',
    styles : ['']
})

export class UsersComponent implements OnInit
{
    listaUser : User[];
    myRoot = '/backend/settings/users';
    isRoot = false;

    listaUserDelete : User[];

    constructor(private s_Service : SettingsService, private router : Router) {

        if(!this.s_Service.hasPermissions('Hardel.Settings.Users'))
        {
            this.router.navigate(['/backend/dashboard']);
        }

        this.listaUserDelete = [];

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
        this.retrieveListOfUsers();
        this.s_Service.updateUsers$.subscribe(
            () => {
                this.retrieveListOfUsers();
            }
        );

    }

    ngOnInit() {
    }

    retrieveListOfUsers() : void
    {
        if(!this.s_Service.checkUsersExist())
        {
            this.s_Service.getUsersFrom().subscribe(
                (users: User[]) => {

                    this.listaUser = users;
                    this.listaUser.forEach((user : User) => {
                        user.state = false;
                    });
                    this.s_Service.setUsers(this.listaUser);
                }
            );
        }
        else {
            this.listaUser = this.s_Service.getUsers();
            this.listaUser.forEach((item : any) => {
                if(!item.hasOwnProperty('state'))
                {
                    item.state = false;
                }
            });
        }
    }

    /**
     * function to push or splice item into Deleted List of Roles
     * @param ev
     * @param data
     */
    eventChange(ev,data : User) : void
    {
        if(ev.target.checked)
        {
            this.listaUserDelete.push(data);
        }
        else
        {
            let index = this.listaUserDelete.indexOf(data);

            if(index > -1)
            {
                this.listaUserDelete.splice(index,1);
            }
        }
    }

    deleteUsers()
    {
        if(this.listaUserDelete.length > 0)
        {
            if(confirm('Do you really want delete this Roles?'))
            {
                this.s_Service.deleteUsers(this.listaUserDelete).subscribe(
                    (data : any) => {
                        this.listaUserDelete = [];
                        this.listaUser = data;
                        this.s_Service.setUsers(this.listaUser);
                    }
                );
            }
        }
    }
}