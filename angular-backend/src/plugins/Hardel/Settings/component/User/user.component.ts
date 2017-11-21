/**
 * Created by hernan on 10/11/2017.
 */


import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {Permission, Role, User} from "../../Services/settings.interfaces";
import {SettingsService} from "../../Services/settings.service";
import {ActivatedRoute, Router} from "@angular/router";
@Component({
    selector : 'settings-user',
    templateUrl : './user.component.html',
    styles : ['']
})

export class UserComponent implements OnInit,OnDestroy
{
    @Input() user : User;
    copyUser : User;
    id : number;
    private sub : any;
    isEdit : boolean;
    listRoles : Role[] = [];
    filteredList : Role[];
    query : string;
    notFound : boolean;

    constructor(private sService : SettingsService, private router : ActivatedRoute,private nav : Router){
        this.isEdit = false;
        this.notFound = false;
        this.filteredList = [];
        this.query = '';
        this.user = {
            id : -2,
            name : '',
            email : '',
            state : false,
            role : null
        };
        this.sub = this.router.params.subscribe(
            (params) => {
                this.id = +params['id'];
                this.user = this.sService.getUserByProperty('id',this.id);
                if(this.user != null)
                {
                    this.notFound = true;
                }
                else
                {
                    this.nav.navigate(['/backend/not-found']);
                }
                this.cloneUser();
            }
        );
    }

    ngOnInit(){
        this.retriveRoles();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    /**
     * This function pass into edit Mode
     */
    editMode(){
        //passa in modalità edit
        this.isEdit = !this.isEdit;
    }

    /**
     * This function go to save Mode
     */
    saveMode() {
        //salva i cambiamenti
        if(this.user !== this.copyUser)
        {
            if(this.user.email.length == 0)
            {
                alert('You must write an email of User, please!');
                this.cloneCopyUser();
                return;
            }

            this.sService.saveUser(this.user).subscribe(
                (user : User) => {
                    this.user = user;
                    this.retriveRoles();
                    this.sService.updateUserInList(this.user);
                    this.editMode();
                }
            );
        }
    }

    /**
     * This function is to get Permission from API
     */
    private retriveRoles()
    {
        this.sService.getRolesFrom().subscribe(
            (roles : Role []) => {
                this.listRoles = roles;

                let index = this.listRoles.indexOf(this.user.role);

                if(index > -1)
                {
                    this.listRoles.splice(index,1);
                }
            }
        );
        this.cloneUser();
    }

    /**
     * This function reset the Information of Role
     */
    resetMode() {

        if(this.isEqual(this.user, this.copyUser)) {
            if (confirm('Are you sure you don\'t want to save this changement and restore it?')) {
                this.cloneCopyUser();
            }
        }
    }

    isEqual(v,v2) : boolean
    {
        return (v.email == v2.email) && (v.state == v2.state) && (v.name == v2.name)
    }

    /**
     * This function delete Role from user.role
     * @param item
     */
    eraseRole(item) {
        // cancella il permesso
        this.listRoles.push(item);
        delete this.user.role;
    }

    /**
     * This Function add Role at the moment to user.role
     * @param item
     */
    addRole(item : Role) {
        //aggiunge un permesso
        this.filteredList = [];
        this.query = item.name;
        this.user.role = item;
        let index = this.listRoles.indexOf(item);

        if(index > -1)
        {
            this.listRoles.splice(index,1);
        }

    }


    /**
     * This function filter permission for research
     */
    filter(){
        if (this.query !== "") {
            this.filteredList = this.listRoles.filter(function(el){
                return el.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        }
    }

    /**
     * This function clone the User
     */
    cloneUser(){
        let permissions: Permission[] = [];

        this.copyUser = Object.assign({}, this.user);
        if(this.user.role !== undefined) {
            for (let perm of this.user.role.permissions) {
                permissions.push(perm);
            }

            let role: Role;

            role = Object.assign({}, this.user.role);
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