

import {Injectable} from "@angular/core";
import {Role,Permission} from "./settings.interfaces";
import {Http,Response} from "@angular/http";
import 'rxjs/Rx';
import {ApiManager} from "../../../../app/urlApi/api.manager";
import {Subject} from "rxjs/Subject";

@Injectable()
export class SettingsService {

    apiManager : ApiManager;
    listOfRoles : Role[];
    private _oC = new Subject();
    oc$ = this._oC.asObservable();

    constructor(private http : Http)
    {
        // create the ApiManager
        this.apiManager = new ApiManager();
        // write the api route for setting
         const urls = [
                { namePath : 'getPermission', path: 'permissions'},
                { namePath : 'getRoles', path: 'roles' }
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

    /**
     * This function check if Dataset of Roles exist
     * @returns {boolean}
     */
    checkRolesExist()
    {
        return (sessionStorage.getItem('roles') !== null);
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

    emitOc(object){
        this._oC.next(object);
    }

}

