

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
    copyRole : Role;
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
                this.copyRole = Object.assign({},this.role);
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
        this.cloneRole();
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
        if(this.role !== this.copyRole)
        {
            if(this.role.name.length == 0)
            {
                alert('You must write a name of Role, please!');
                this.cloneCopyRole();
                return;
            }

            this.sService.saveRole(this.role).subscribe(
                (response : any) => {

                }
            );
        }
    }

    resetMode() {

        if(this.role !== this.copyRole) {
            if (confirm('Are you sure you don\'t want to save this changement and restore it?')) {
                this.cloneCopyRole();
            }
        }
    }

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

    cloneRole(){
        let permissions: Permission[] = [];

        for(let perm of this.role.permissions)
        {
            permissions.push(perm);
        }

        this.copyRole = Object.assign({},this.role);
        this.copyRole.permissions = permissions;
    }

    cloneCopyRole()
    {
        let permissions: Permission[] = [];

        for(let perm of this.copyRole.permissions)
        {
            permissions.push(perm);
        }

        this.role = Object.assign({},this.copyRole);
        this.role.permissions = permissions;
    }
}
