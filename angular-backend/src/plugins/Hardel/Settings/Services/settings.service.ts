

import {Injectable} from "@angular/core";
import {Role,Permission} from "./settings.interfaces";
import {Http,Response} from "@angular/http";
import 'rxjs/Rx';
import {ApiManager} from "../../../../app/urlApi/api.manager";

@Injectable()
export class SettingsService {

    apiManager : ApiManager;
    constructor(private http : Http)
    {
        this.apiManager = new ApiManager();
         const urls = [
                { namePath : 'getPermission', path: 'permissions'},
                { namePath : 'getRoles', path: 'roles' }
        ];

        this.apiManager.addListUrlApi(urls);
    }
    listOfRoles : Role[];


    getRolesFrom()
    {
        return this.http.get(this.apiManager.getPathByName('getRoles'))
            .map( (response : Response) => {
                return response.json().roles;
            });

    }

    getPermissionsFrom()
    {
        return this.http.get(this.apiManager.getPathByName('getPermission'))
            .map((response : Response) =>  {
                return response.json().permissions;
            });
    }

    setRoles(roles : Role[])
    {
        sessionStorage.setItem('roles',JSON.stringify(roles));
        this.listOfRoles = roles;
    }

    checkRolesExist()
    {
        return (sessionStorage.getItem('roles') !== null);
    }

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
}

