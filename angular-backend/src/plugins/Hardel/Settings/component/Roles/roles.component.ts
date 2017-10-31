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

    constructor(private tService : SettingsService) {

       this.listaRole = [
           {id: 1, name: 'Admin', permissions : [
               {id: 1, name: 'Hardel.Settings'},
               {id: 2, name: 'Hardel.Dashboard'},
               {id: 3, name: 'Hardel.Settings.Roles'},
               {id: 4, name: 'Hardel.Settings.Permissions'},
               {id: 5, name: 'Hardel.Plugin'}
           ]},
           {id: 2, name: 'Web Operator', permissions : []}
        ];

       this.tService.setRoles(this.listaRole);
    }

    ngOnInit() {

    }
}
