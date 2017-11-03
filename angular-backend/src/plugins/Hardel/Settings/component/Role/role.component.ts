

import {Component, OnInit, Input, OnDestroy} from "@angular/core";
import {SettingsService} from "../../Services/settings.service";
import {Permission, Role} from "../../Services/settings.interfaces";
import {ActivatedRoute} from "@angular/router";
import {element} from "protractor";

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
    listPermissions = [];
    filteredList : Permission[];
    query : string;

    constructor(private sService : SettingsService, private router : ActivatedRoute){
        this.isEdit = false;
        this.filteredList = [];
        this.query = '';
        this.sub = this.router.params.subscribe(
            (params) => {
                this.id = +params['id'];
                this.role = this.sService.getRoleByProperty('id',this.id);
            }
        );
    }

    ngOnInit(){
        this.sService.getPermissionsFrom().subscribe(
            (perms : Permission []) => {
                this.listPermissions = perms;
                this.role.permissions.forEach((item : Permission)=>{
                    let index = -1;
                    for(let i = 0; i<this.listPermissions.length; i++)
                    {
                        let m = this.listPermissions[i];

                        if(m.id === item.id && m.name === item.name)
                        {
                            index = i;
                            break;
                        }
                    }
                    if(index > -1){
                        this.listPermissions.splice(index,1);
                    }
                });
            }
        );
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    editMode(){
        //passa in modalità edit
        this.isEdit = !this.isEdit;
    }

    saveMode() {
        //salva i cambiamenti
    }

    resetMode() {}

    addPermissions(item : Permission) {
        //aggiunge un permesso
        this.filteredList = [];
        this.query = item.name;
        this.role.permissions.push(item);
        let index = this.listPermissions.indexOf(item);

        if(index > -1)
        {
            this.listPermissions.splice(index,1);
        }

    }

    erasePermission(item) {
        // cancella il permesso
        this.listPermissions.push(item);
        let index = this.role.permissions.indexOf(item);

        if(index > -1)
        {
            this.role.permissions.splice(index,1);
        }

    }

    filter(){
        if (this.query !== "") {
            this.filteredList = this.listPermissions.filter(function(el){
                return el.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        }
        else {

        }
    }
}
