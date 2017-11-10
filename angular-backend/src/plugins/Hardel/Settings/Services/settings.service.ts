

import {Injectable} from "@angular/core";
import {Role, Permission, User} from "./settings.interfaces";
import {Http,Response, RequestOptions, Headers} from "@angular/http";
import 'rxjs/Rx';
import {ApiManager} from "../../../../app/urlApi/api.manager";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {User as userFirst} from "../../../../app/backend-module/user-module/user-model/user.interface";

@Injectable()
export class SettingsService {

    apiManager : ApiManager;
    listOfRoles : Role[];
    listOfUsers : User[];
    user : userFirst;
    private _updateRoles = new Subject();
    updateRoles$ = this._updateRoles.asObservable();

    private _updateUsers = new Subject();
    updateUsers$ = this._updateUsers.asObservable();

    constructor(private http : Http)
    {
        // create the ApiManager
        this.apiManager = new ApiManager();
        // write the api route for setting
         const urls = [
                { namePath : 'getPermission', path: 'permissions'},
                { namePath : 'getRoles', path: 'roles' },
                { namePath : 'saveRole', path: 'role'},
                { namePath : 'getUsers', path: 'users'},
                { namePath : 'saveUser', path: 'user'}
            ];
        //Add the Api to the ApiManager
        this.apiManager.addListUrlApi(urls);
    }

    /**
     * This function retrive the roles from the API (Laravel)
     * @returns {Observable<R>}
     */
    getRolesFrom()
    {
        return this.http.get(this.apiManager.getPathByName('getRoles'))
            .map( (response : Response) => {
                return response.json().roles;
            });

    }

    getUsersFrom()
    {
        return this.http.get(this.apiManager.getPathByName('getUsers'))
            .map(
                (response : Response) => {
                    return response.json().users;
                }
            );
    }

    /**
     * This function retrive the permissions from the API (Laravel)
     * @returns {Observable<R>}
     */
    getPermissionsFrom()
    {
        return this.http.get(this.apiManager.getPathByName('getPermission'))
            .map((response : Response) =>  {
                return response.json().permissions;
            });
    }

    /**
     * This function set the Roles
     * @param roles
     */
    setRoles(roles : Role[])
    {
        sessionStorage.setItem('roles',JSON.stringify(roles));
        this.listOfRoles = roles;
    }

    setUsers(users : User[])
    {
        sessionStorage.setItem('users',JSON.stringify(users));
        this.listOfUsers = users;
    }


    /**
     * This function is to set new User into the listOfRoles
     * @param role
     */
    setRole(role : Role)
    {
        let roles = this.getRoles();
        roles.push(role);
       this.deleteRoleFromCache();
       this.setRoles(roles);
    }

    setUser(user : User)
    {
        let users = this.getUsers();
        users.push(user);
        this.deleteUserFromCache();
        this.setUsers(users);
    }


    deleteRoleFromCache()
    {
        this.listOfRoles = null;
        sessionStorage.removeItem('roles');
    }

    deleteUserFromCache()
    {
        this.listOfUsers = null;
        sessionStorage.removeItem('users');
    }

    /**
     * This function check if Dataset of Roles exist
     * @returns {boolean}
     */
    checkRolesExist()
    {
        return (sessionStorage.getItem('roles') !== null);
    }

    checkUsersExist()
    {
        return (sessionStorage.getItem('users') !== null);
    }

    /**
     * This function return Role passing a property
     * @param name
     * @param value
     * @returns {Role}
     */
    getRoleByProperty(name : string, value : any)
    {
        let response: Role;
        response = null;

        if(this.listOfRoles == null)
        {
            this.listOfRoles = JSON.parse(sessionStorage.getItem('roles'));
        }
        this.listOfRoles.forEach(
            (role : Role) => {
                if(role[name] === value)
                {
                    response = role;
                }
            }
        );

        return response;
    }

    /**
     * This function check if a role has permission
     * @param role
     * @param permission
     * @returns {boolean}
     */
    roleHasPermission(role: Role, permission : string)
    {
        let response = false;

        role.permissions.forEach(
            (p : Permission) => {
               if(p.name === permission)
               {
                   response = true;
               }
            });
        return response;
    }

    /**
     * This function get The Roles
     * @returns {any}
     */
    getRoles(){
        if(this.listOfRoles == null)
        {
            return JSON.parse(sessionStorage.getItem('roles'));
        }
        else
        {
            return this.listOfRoles;
        }
    }

    getUsers()
    {
        if(this.listOfUsers == null)
        {
            return JSON.parse(sessionStorage.getItem('users'));
        }
        else
        {
            return this.listOfUsers;
        }
    }

    saveRole(role : Role) : Observable<any> {
        let headers = new Headers({'Content-Type' : 'application/json'});
        let options = new RequestOptions({headers : headers});

        return this.http.put(this.apiManager.getPathByName('saveRole'),role,options)
            .map((response : Response) => {
                return response.json().role;
            });
    }

    newRole(role : Role) : Observable<any> {
        let headers = new Headers({'Content-Type' : 'application/json'});
        let options = new RequestOptions({headers : headers});

        return this.http.post(this.apiManager.getPathByName('saveRole'),role,options)
            .map(
                (response : Response) => {
                    return response.json().role;
                }
            );
    }

    newUser(user : User) : Observable<any> {
        let headers = new Headers({'Content-Type' : 'application/json'});
        let options = new RequestOptions({headers : headers});

        return this.http.post(this.apiManager.getPathByName('saveUser'),user,options)
            .map(
                (response : Response) => {
                    return response.json().user;
                }
            );
    }

    deleteRoles(roles : Role[]) : Observable<any>
    {
        let headers = new Headers({'Content-Type' : 'application/json'});
        let options = new RequestOptions({headers : headers});

        return this.http.put(this.apiManager.getPathByName('getRoles'),roles,options)
            .map(
                (response : Response) => {
                    return response.json().roles;
                }
            );
    }

    deleteUsers (users : User[]) : Observable<any>
    {
        let headers = new Headers({'Content-Type' : 'application/json'});
        let options = new RequestOptions({headers : headers});

        return this.http.put(this.apiManager.getPathByName('getUsers'),users,options)
            .map(
                (response : Response) => {
                    return response.json().roles;
                }
            );
    }

    updateListOfRoles()
    {
        this._updateRoles.next();
    }

    updateListOfUsers()
    {
        this._updateUsers.next();
    }


    hasPermissions(name: string) : boolean
    {
        if(this.user == null)
        {
            this.user = JSON.parse(sessionStorage.getItem('user'));
        }

        for(let i = 0; i<this.user.permissions.length; i++)
        {
            if(this.user.permissions[i].name === name)
            {
                return true;
            }
        }

        return false;
    }
}

