/**
 * Created by hernan on 30/10/2017.
 */


import {Component, OnInit} from "@angular/core";
import {SettingsService} from "../../Services/settings.service";
import {Role} from "../../Services/settings.interfaces";
import {NavigationEnd, Router} from "@angular/router";
import {hasOwnProperty} from "tslint/lib/utils";

@Component({
    selector : 'app-roles-component',
    templateUrl : './roles.component.html',
    styles : ['']
})

export class RolesComponent implements OnInit
{
    listaRole : Role[];
    myRoot = '/backend/settings/roles';
    isRoot = false;

    listaRoleDelete : Role[];

    constructor(private m_Service : SettingsService, private router :Router) {

        this.listaRoleDelete = [];

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
            this.retrieveListOfRoles();
            this.m_Service.updateRoles$.subscribe(
                () => {
                    this.retrieveListOfRoles();
                }
            );

    }

    ngOnInit() {
    }

    retrieveListOfRoles() : void
    {
        if(!this.m_Service.checkRolesExist())
        {
            this.m_Service.getRolesFrom().subscribe(
                (roles: Role[]) => {

                    this.listaRole = roles;
                    this.listaRole.forEach((role : Role) => {
                        role.state = false;
                    });
                    this.m_Service.setRoles(this.listaRole);
                }
            );
        }
        else {
            this.listaRole = this.m_Service.getRoles();
            this.listaRole.forEach((item : any) => {
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
    eventChange(ev,data : Role) : void
    {
        if(ev.target.checked)
        {
            this.listaRoleDelete.push(data);
        }
        else
        {
            let index = this.listaRoleDelete.indexOf(data);

            if(index > -1)
            {
                this.listaRoleDelete.splice(index,1);
            }
        }
    }

    deleteRoles()
    {
        if(this.listaRoleDelete.length > 0)
        {
            if(confirm('Do you really want delete this Roles?'))
            {
                this.m_Service.deleteRoles(this.listaRoleDelete).subscribe(
                    (data : any) => {
                        this.listaRoleDelete = [];
                        this.listaRole = data;
                        this.m_Service.setRoles(this.listaRole);
                    }
                );
            }
        }
    }
}