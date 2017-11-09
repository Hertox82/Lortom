/**
 * Created by hernan on 09/11/2017.
 */

import {Component, OnInit} from "@angular/core";
import {Permission, Role, User} from "../../Services/settings.interfaces";
import {SettingsService} from "../../Services/settings.service";
import {Router} from "@angular/router";
@Component({
    selector : 'settings-new-user',
    templateUrl : './usernew.component.html',
    styles : ['']
})

export class UserNewComponent implements OnInit
{
    user : User;
    copyUser : User;
    id : number;
    private sub : any;
    isEdit : boolean;
    listRole = [];
    filteredList : Role[];
    query : string;

    constructor(private nService : SettingsService, private router : Router){
        this.isEdit = false;
        this.filteredList = [];
        this.query = '';

        this.user = {
            id: -1,
            name : '',
            state : false,
            email : ''
        }
    }
    ngOnInit(){
        this.retriveRoles();
    }

    private retriveRoles()
    {
        this.nService.getRolesFrom().subscribe(
            (roles : Role []) => {
                this.listRole = roles;
            }
        );
        this.cloneUser();
    }

    /**
     * This function filter permission for research
     */
    filter(){
        if (this.query !== "") {
            this.filteredList = this.listRole.filter(function(el){
                return el.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        }
    }

    /**
     * This function delete Permission from role.permissions
     * @param item
     */
    eraseRole(item) {
        // cancella il permesso
        this.listRole.push(item);
        delete this.user.role;
    }

    /**
     * This Function add Permission at the moment to role.permissions
     * @param item
     */
    addRole(item : Role) {
        //aggiunge un permesso
        this.filteredList = [];
        this.query = item.name;
        this.user.role = item;
        let index = this.listRole.indexOf(item);

        if(index > -1)
        {
            this.listRole.splice(index,1);
        }

    }

    /**
     * This function go to save Mode
     */
    saveMode() {
        //salva i cambiamenti

        if(!this.isEqual(this.user,this.copyUser))
        {
            if(this.user.email.length == 0)
            {
                alert('You must write a name of Role, please!');
                this.cloneCopyUser();
                return;
            }

            this.nService.newUser(this.user).subscribe(
                (data : any) => {
                    if(!data.hasOwnProperty('state'))
                    {
                        data.state = false;
                    }
                    //push the item into roles
                    this.nService.setUser(data);
                    this.nService.updateListOfUsers();
                    //navigate to Settings Roles
                    this.router.navigate(['/backend/settings/users']);
                }
            );

        }
    }

    isEqual(v,v2) : boolean
    {
        return (v.username == v2.username) && (v.state == v2.state) && (v.name == v2.name)
    }

    /**
     * This function clone the User
     */
    cloneUser(){
        let permissions: Permission[] = [];

        if(this.user.role !== undefined) {
            for (let perm of this.user.role.permissions) {
                permissions.push(perm);
            }

            let role: Role;

            role = Object.assign({}, this.user.role);

            this.copyUser = Object.assign({}, this.user);
            this.copyUser.role = role;
            this.copyUser.role.permissions = permissions;
        }
    }

    /**
     * This function clone the CopyUser
     */
    cloneCopyUser()
    {
        let permissions: Permission[] = [];

        for(let perm of this.copyUser.role.permissions)
        {
            permissions.push(perm);
        }

        let role : Role;

        role = Object.assign({},this.copyUser.role);

        this.user = Object.assign({},this.copyUser);
        this.user.role = role;
        this.user.role.permissions = permissions;
    }
}