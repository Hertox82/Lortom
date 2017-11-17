/**
 * Created by hernan on 14/11/2017.
 */


import {Injectable} from "@angular/core";
import {ApiManager} from "../../../../app/urlApi/api.manager";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {User} from "../../../../app/backend-module/user-module/user-model/user.interface";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {LortomElement, Page} from "./website.interfaces";

@Injectable()
export class WebsiteService{

    apiManager : ApiManager;
    user : User;
    listOfPages : Page[];
    listOfElements : LortomElement[];

    private _updatePages = new Subject();
    updatePages$ = this._updatePages.asObservable();

    private _updateElements = new Subject();
    updateElements$ = this._updateElements.asObservable();

    constructor(private http: Http)
    {
        this.apiManager = new ApiManager();


        // write the api route for setting
        const urls = [
            { namePath : 'getPages', path: 'pages'},
            { namePath : 'savePage', path: 'page'},
            { namePath : 'getPageAtt', path: 'pages/attribute/list'},
            { namePath : 'getElements', path: 'elements'},
            { namePath : 'saveElement', path : 'element'}
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

    /**
     * This function return Page by Property
     * @param name
     * @param value
     * @returns {Page}
     */
    getPageByProperty(name : string, value : any)
    {
        let response: Page;
        response = null;

        if(this.listOfPages == null)
        {
            this.listOfPages = JSON.parse(sessionStorage.getItem('pages'));
        }
        this.listOfPages.forEach(
            (page : Page) => {
                if(page[name] === value)
                {
                    response = page;
                }
            }
        );

        return response;
    }

    /**
     * this function return if Pages Exists
     * @returns {boolean}
     */
    checkPagesExist() : boolean
    {
        return this.checkItemExist('pages');
    }

    checkElementsExist() : boolean
    {
        return this.checkItemExist('elements');
    }

    /**
     * Return if an Item exist
     * @param name
     * @returns {boolean}
     */
    private checkItemExist(name : string) : boolean
    {
        return (sessionStorage.getItem(name) !== null);
    }

    /**
     * This function Call API to get List Of Pages
     * @returns {Observable<R>}
     */
    getPagesFrom() : Observable<any>
    {
        return this.http.get(this.apiManager.getPathByName('getPages'))
            .map(
                (response : Response) => {
                    return response.json().pages;
                }
            );
    }

    getElementsFrom() : Observable<any>
    {
        return this.http.get(this.apiManager.getPathByName('getElements'))
            .map(
                (response : Response) => {
                    return response.json().elements;
                }
            );
    }

    /**
     * This function set pages and store into a Session
     * @param pages
     */
    setPages(pages : Page[]) : void
    {
        this.setItem('pages',pages);
        this.listOfPages = pages;
    }

    setElements(elements : LortomElement[]) : void
    {
        this.setItem('elements',elements);
        this.listOfElements = elements;
    }

    private setItem(name : string, list :any) : void
    {
        sessionStorage.setItem(name,JSON.stringify(list));
    }

    private getItem(name : string, prop : string) : any
    {
        if(this[prop] == null) {
            return JSON.parse(sessionStorage.getItem(name));
        }
        else
        {
            return this[prop];
        }
    }

    private deleteItem(name : string, prop : string) : void
    {
        this[prop] = null;
        sessionStorage.removeItem(name);
    }

    /**
     * This function get listOfPages
     * @returns {any}
     */
    getPages() : Page[]
    {
        return this.getItem('pages','listOfPages') as Page[];
    }

    getElements() : LortomElement []
    {
        return this.getItem('elements','listOfElements') as LortomElement[];
    }

    /**
     * This Function call API in order to Delete a list of Pages
     * @param pages
     * @returns {Observable<R>}
     */
    deletePages(pages : Page []) : Observable<any>
    {
        let headers = new Headers({'Content-Type' : 'application/json'});
        let options = new RequestOptions({headers : headers});

        return this.http.put(this.apiManager.getPathByName('getPages'),pages,options)
            .map(
                (response : Response) => {
                    return response.json().pages;
                }
            );
    }

    deleteElements(el : LortomElement []) : Observable <any>
    {
        let headers = new Headers({'Content-Type' : 'application/json'});
        let options = new RequestOptions({headers : headers});

        return this.http.put(this.apiManager.getPathByName('getElements'),el,options)
            .map(
                (response : Response) => {
                    return response.json().elements;
                }
            );
    }

    /**
     *This function call API in order to create a Page.
     * @param page
     * @returns {Observable<R>}
     */
    createPage(page : Page) :Observable<any>
    {
        let headers = new Headers({'Content-Type' : 'application/json'});
        let options = new RequestOptions({headers : headers});

        return this.http.post(this.apiManager.getPathByName('savePage'),page,options)
            .map(
                (response : Response) => {
                    return response.json().page;
                }
            );
    }

    createElement(elem : LortomElement)
    {
        let headers = new Headers({'Content-Type' : 'application/json'});
        let options = new RequestOptions({headers : headers});

        return this.http.post(this.apiManager.getPathByName('saveElement'),elem,options)
            .map(
                (response : Response) => {
                    return response.json().element;
                }
            );
    }

    setElement(elem : LortomElement) : void
    {
        let el = this.getElements();
        el.push(elem);
        this.deleteElementFromCache();
        this.setElements(el);
    }

    setPage(page : Page) : void
    {
        let pages = this.getPages();
        pages.push(page);
        this.deletePageFromCache();
        this.setPages(pages);
    }

    deletePageFromCache() : void
    {
        this.deleteItem('pages','listOfPages');
    }

    deleteElementFromCache() : void
    {
        this.deleteItem('elements','listOfElements');
    }

    updateListOfPages()
    {
        this._updatePages.next();
    }

    updateListOfElements()
    {
        this._updateElements.next();
    }


    getPageAtt() : Observable<any>
    {
        return this.http.get(this.apiManager.getPathByName('getPageAtt'))
            .map(
                (response : Response) => {
                    return response.json();
                }
            );
    }

    /**
     * This function delete from listOfPages one page
     * @param page
     */
    erasePage (page : Page){
        let index = this.listOfPages.indexOf(page);

        if(index > -1)
        {
            this.listOfPages.splice(index,1);
        }
    }

    /**
     * this is HTTP request to API
     * @param page
     * @returns {Observable<R>}
     */
    savePage(page : Page) : Observable<any>
    {
        let headers = new Headers({'Content-Type' : 'application/json'});
        let options = new RequestOptions({headers : headers});


        return this.http.put(this.apiManager.getPathByName('savePage'),page,options)
            .map(
                (response : Response) => {
                    return response.json().page;
                }
            );
    }

}