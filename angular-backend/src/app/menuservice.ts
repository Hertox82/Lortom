/**
 * Created by hernan on 16/10/2017.
 */
import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import {ApiManager} from "./urlApi/api.manager";
import {User} from "./backend-module/user-module/user-model/user.interface";
import {Permission} from "../plugins/Hardel/Settings/Services/settings.interfaces";

@Injectable()
export class MenuService {

    urlManager : ApiManager;

    user : User;
    constructor(private http: Http)
    {
        this.user = null;
        this.urlManager = new ApiManager();
    }

    getMenu(){
        return this.http.get(this.urlManager.getPathByName('getMenu'))
            .map(
                (response: Response) => {
                    return response.json().menulista;
                }
            );
    }

    login(credential : {username:string, password:string}) : Observable<any>{
        let headers = new Headers({'Content-Type' : 'application/json'});
        let options = new RequestOptions( { headers: headers} );
        return this.http.post(this.urlManager.getPathByName('login'),credential,options)
            .map(
                (response: Response) => {return response.json();}
            );
    }

    logout() : Observable<any>{
        return this.http.get(this.urlManager.getPathByName('logout'))
            .map(
                (response :Response) => {
                    return response.json();
                }
            );
    }

    editMyProfile(user : User) : Observable<any>{
        let headers = new Headers({'Content-Type' : 'application/json'});
        let options = new RequestOptions( { headers: headers} );
        return this.http.put(this.urlManager.getPathByName('editMyProfile'),user,options)
            .map(
                (response : Response) => {
                    return response.json();
                }
            );
    }


    setUser(user : User) : void{
        this.user = user;
        sessionStorage.setItem('user',JSON.stringify(user));
    }

    getUser() : User {
        if(this.user == null)
        {
            this.user = JSON.parse(sessionStorage.getItem('user'));
        }

        return this.user;
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

    deleteUser() : void {
        sessionStorage.removeItem('user');
    }
}