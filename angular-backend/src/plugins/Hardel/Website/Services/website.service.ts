/**
 * Created by hernan on 14/11/2017.
 */


import {Injectable} from "@angular/core";
import {ApiManager} from "../../../../app/urlApi/api.manager";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {User} from "../../../../app/backend-module/user-module/user-model/user.interface";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {Page} from "./website.interfaces";

@Injectable()
export class WebsiteService{

    apiManager : ApiManager;
    user : User;
    listOfPages : Page[];

    private _updatePages = new Subject();
    updatePages$ = this._updatePages.asObservable();

    constructor(private http: Http)
    {
        this.apiManager = new ApiManager();


        // write the api route for setting
        const urls = [
            { namePath : 'getPages', path: 'pages'},
        ];
        //Add the Api to the ApiManager
        this.apiManager.addListUrlApi(urls);
    }

    /**
     * Check if User has permission
     * @param name
     * @returns {boolean}
     */
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


    checkPagesExist()
    {
        return (sessionStorage.getItem('pages') !== null);
    }

    getPagesFrom() : Observable<any>
    {
        return this.http.get(this.apiManager.getPathByName('getPages'))
            .map(
                (response : Response) => {
                    return response.json().pages;
                }
            );
    }

    setPages(pages : Page[])
    {
        sessionStorage.setItem('pages',JSON.stringify(pages));
        this.listOfPages = pages;
    }

    getPages()
    {
        if(this.listOfPages == null)
        {
            return JSON.parse(sessionStorage.getItem('pages'));
        }
        else
        {
            return this.listOfPages;
        }
    }

    deletePages(pages : Page []) : Observable<any>
    {
        let headers = new Headers({'Content-Type' : 'application/json'});
        let options = new RequestOptions({headers : headers});

        return this.http.put(this.apiManager.getPathByName('getRoles'),pages,options)
            .map(
                (response : Response) => {
                    return response.json().pages;
                }
            );
    }

}