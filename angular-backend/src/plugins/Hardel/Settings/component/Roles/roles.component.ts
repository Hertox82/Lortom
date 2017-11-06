/**
 * Created by hernan on 30/10/2017.
 */


import {Component, OnInit} from "@angular/core";
import {SettingsService} from "../../Services/settings.service";
import {Role} from "../../Services/settings.interfaces";
import {NavigationEnd, Router} from "@angular/router";

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

    constructor(private m_Service : SettingsService, private router :Router) {


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

        if(!this.m_Service.checkRolesExist())
        {
            this.m_Service.getRolesFrom().subscribe(
                (roles: Role[]) => {
                    this.listaRole = roles;
                    this.m_Service.setRoles(this.listaRole);
                }
            );
        }
        else {
            this.listaRole = this.m_Service.getRoles();
        }
    }

    ngOnInit() {

    }

}