

import {Component, OnInit, Input} from "@angular/core";
import {SettingsService} from "../../Services/settings.service";
import {Role} from "../../Services/settings.interfaces";

@Component({
    selector : 'app-role',
    templateUrl : './role.component.html',
    styles : ['']
})

export class RoleComponent implements OnInit
{
    @Input() role : Role;

    constructor(private sService : SettingsService){}

    ngOnInit(){}
}
