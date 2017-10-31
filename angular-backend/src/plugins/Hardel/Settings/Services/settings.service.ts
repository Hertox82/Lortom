

import {Injectable} from "@angular/core";
import {Role,Permission} from "./settings.interfaces";

@Injectable()
export class SettingsService {

    listOfRoles : Role[];


    setRoles(roles : Role[])
    {
        sessionStorage.setItem('roles',JSON.stringify(roles));
        this.listOfRoles = roles;
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
}

