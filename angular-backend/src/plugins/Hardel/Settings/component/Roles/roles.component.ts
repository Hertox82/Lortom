/**
 * Created by hernan on 30/10/2017.
 */


import {Component, OnInit} from "@angular/core";
import {SettingsService} from "../../Services/settings.service";
import {Role} from "../../Services/settings.interfaces";

@Component({
    selector : 'app-roles-component',
    templateUrl : './roles.component.html',
    styles : ['']
})

export class RolesComponent implements OnInit
{
    listaRole : Role[];

    constructor(private mService : SettingsService) {


        if(!this.mService.checkRolesExist())
        {
            this.mService.getRolesFrom().subscribe(
                (roles: Role[]) => {
                    this.listaRole = roles;
                    this.mService.setRoles(this.listaRole);
                }
            );
        }
        else {
            this.listaRole = this.mService.getRoles();
        }
    }

    ngOnInit() {

    }

}
