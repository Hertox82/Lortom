

import {Component, OnInit, Input, OnDestroy} from "@angular/core";
import {SettingsService} from "../../Services/settings.service";
import {Role} from "../../Services/settings.interfaces";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector : 'app-role',
    templateUrl : './role.component.html',
    styles : ['']
})

export class RoleComponent implements OnInit,OnDestroy
{
    @Input() role : Role;
    id : number;
    private sub : any;
    isEdit : boolean;

    constructor(private sService : SettingsService, private router : ActivatedRoute){
        console.log('roma merda');
        this.isEdit = false;
        this.sub = this.router.params.subscribe(
            (params) => {
                this.id = +params['id'];
                this.role = this.sService.getRoleByProperty('id',this.id);
            }
        );
    }

    ngOnInit(){}

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    editMode(){}

    saveMode() {}

    resetMode() {}

    addPermissions() {}
}
