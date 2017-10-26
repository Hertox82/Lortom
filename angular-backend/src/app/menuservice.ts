/**
 * Created by hernan on 16/10/2017.
 */
import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import {ApiManager} from "./urlApi/api.manager";

@Injectable()
export class MenuService {

    urlManager : ApiManager
    constructor(private http: Http)
    {
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
}