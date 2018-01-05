

import {Component, OnInit} from "@angular/core";
import {Permission, Role} from "../../Services/settings.interfaces";
import {SettingsService} from "../../Services/settings.service";
import {Router} from "@angular/router";
@Component({
    selector : 'settings-new-role',
    templateUrl : './rolenew.component.html',
    styles : ['']
})

export class RoleNewComponent implements OnInit
{
    role : Role;
    copyRole : Role;
    id : number;
    private sub : any;
    isEdit : boolean;
    listPermissions = [];
    filteredList : Permission[];
    query : string;

    constructor(private sService : SettingsService, private router : Router){
        this.isEdit = false;
        this.filteredList = [];
        this.query = '';

        this.role = {
            id: -1,
            name : '',
            check : false,
            permissions : []
        }
    }
    ngOnInit(){
        this.retrivePermission();
    }

    private retrivePermission()
    {
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

    /**
     * This function filter permission for research
     */
    filter(){
        if (this.query !== "") {
            this.filteredList = this.listPermissions.filter(function(el){
                return el.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        }
    }

    /**
     * This function delete Permission from role.permissions
     * @param item
     */
    erasePermission(item) {
        // cancella il permesso
        this.listPermissions.push(item);
        let index = this.role.permissions.indexOf(item);

        if(index > -1)
        {
            this.role.permissions.splice(index,1);
        }

    }

    /**
     * This Function add Permission at the moment to role.permissions
     * @param item
     */
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

    /**
     * This function go to save Mode
     */
    saveMode() {
        //salva i cambiamenti

        if(!this.isEqual(this.role,this.copyRole))
        {
            if(this.role.name.length == 0)
            {
                alert('You must write a name of Role, please!');
                this.cloneCopyRole();
                return;
            }

            this.sService.newRole(this.role).subscribe(
                (data : any) => {
                    if(!data.hasOwnProperty('state'))
                    {
                        data.state = false;
                    }
                    //push the item into roles
                        this.sService.setRole(data);
                        this.sService.updateListOfRoles();
                    //navigate to Settings Roles
                        this.router.navigate(['/backend/settings/roles']);
                }
            );

        }
    }

    isEqual(v,v2) : boolean
    {
        return (v.name == v2.name) && (v.state == v2.state) && (v.permissions.length == v2.permissions.length)
    }

    /**
     * This function clone the Role
     */
    cloneRole(){
        let permissions: Permission[] = [];

        for(let perm of this.role.permissions)
        {
            permissions.push(perm);
        }

        this.copyRole = Object.assign({},this.role);
        this.copyRole.permissions = permissions;
    }

    /**
     * This function clone the CopyRole
     */
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
