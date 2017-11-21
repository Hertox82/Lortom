/**
 * Created by hernan on 14/11/2017.
 */


import {Injectable} from "@angular/core";
import {ApiManager} from "../../../../app/urlApi/api.manager";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {User} from "../../../../app/backend-module/user-module/user-model/user.interface";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {LortomComponent, LortomElement, Page} from "./website.interfaces";
import {MasterService} from "@Lortom/services/master.service";

@Injectable()
export class WebsiteService extends MasterService{


    listOfPages : Page[];
    listOfElements : LortomElement[];
    listOfComponents : LortomComponent[];

    private _updatePages = new Subject();
    updatePages$ = this._updatePages.asObservable();

    private _updateElements = new Subject();
    updateElements$ = this._updateElements.asObservable();

    private _updateComponents = new Subject();
    updateComponents$ = this._updateComponents.asObservable();

    constructor(private http: Http)
    {
        super();

        // write the api route for setting
        const urls = [
            { namePath : 'getPages', path: 'pages'},
            { namePath : 'savePage', path: 'page'},
            { namePath : 'getPageAtt', path: 'pages/attribute/list'},
            { namePath : 'getElements', path: 'elements'},
            { namePath : 'saveElement', path : 'element'},
            { namePath : 'getComponents', path : 'components'},
            { namePath : 'saveComponent', path : 'component'}
        ];
        //Add the Api to the ApiManager
        this.apiManager.addListUrlApi(urls);
    }

    /**
     * This function return Page by Property
     * @param name
     * @param value
     * @returns {Page}
     */
    getPageByProperty(name : string, value : any)
    {
        return this.getItemByProperty(name,value,'pages','listOfPages') as Page;
    }

    /**
     * This function return Element by Property
     * @param name
     * @param value
     * @returns {LortomElement}
     */

    getElementByProperty(name : string, value : any)
    {
       return this.getItemByProperty(name,value,'elements','listOfElements') as LortomElement;
    }


    /**
     * This function update Element in listOfElements
     * @param el
     */
    updateElementInList(el : LortomElement) : void
    {
        if(this.listOfElements == undefined)
        {
            this.listOfElements = this.getElements();
        }
        let elm = this.updateItemInList(el,this.listOfElements) as LortomElement[];

        this.setElements(elm);
    }


    /**
     * This function update Page in listOfPages
     * @param page
     */
    updatePageInList(page : Page) : void
    {
        if(this.listOfPages == undefined)
        {
            this.listOfPages = this.getPages();
        }
       let p = this.updateItemInList(page,this.listOfPages) as Page[];

       this.setPages(p);
    }


    /**
     * this function return if Pages Exists
     * @returns {boolean}
     */
    checkPagesExist() : boolean
    {
        return this.checkItemExist('pages');
    }

    /**
     * This function check if Elements exist
     * @returns {boolean}
     */
    checkElementsExist() : boolean
    {
        return this.checkItemExist('elements');
    }

    /**
     * This function check if Components exist
     * @returns {boolean}
     */
    checkComponentsExist() : boolean
    {
        return this.checkItemExist('components');
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

    /**
     * This function call API to get Elements
     * @returns {Observable<R>}
     */
    getElementsFrom() : Observable<any>
    {
        return this.http.get(this.apiManager.getPathByName('getElements'))
            .map(
                (response : Response) => {
                    return response.json().elements;
                }
            );
    }

    getComponentsFrom() : Observable<any>
    {
        return this.http.get(this.apiManager.getPathByName('getComponents'))
            .map(
                (response : Response) => {
                    return response.json().components;
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

    /**
     * This function set a list Of Elements
     * @param elements
     */
    setElements(elements : LortomElement[]) : void
    {
        this.setItem('elements',elements);
        this.listOfElements = elements;
    }

    setComponents(components : LortomComponent []) : void
    {
        this.setItem('components',components);
        this.listOfComponents = components;
    }

    /**
     * This function get listOfPages
     * @returns {any}
     */
    getPages() : Page[]
    {
        return this.getItem('pages','listOfPages') as Page[];
    }

    /**
     * This function return a list Of Elements
     * @returns {LortomElement[]}
     */
    getElements() : LortomElement []
    {
        return this.getItem('elements','listOfElements') as LortomElement[];
    }

    getComponents() : LortomComponent []
    {
        return this.getItem('components','listOfComponents') as LortomComponent[];
    }

    /**
     * This Function call API in order to Delete a list of Pages
     * @param pages
     * @returns {Observable<R>}
     */
    deletePages(pages : Page []) : Observable<any> {

        return this.http.put(this.apiManager.getPathByName('getPages'),pages,this.getOptions())
            .map(
                (response : Response) => {
                    return response.json().pages;
                }
            );
    }

    /**
     * This function call API in order to Delete an Array of Element
     * @param el
     * @returns {Observable<R>}
     */
    deleteElements(el : LortomElement []) : Observable <any> {

        return this.http.put(this.apiManager.getPathByName('getElements'),el,this.getOptions())
            .map(
                (response : Response) => {
                    return response.json().elements;
                }
            );
    }

    deleteComponents(cmp : LortomComponent []) : Observable<any>
    {
        return this.http.put(this.apiManager.getPathByName('getComponents'),cmp,this.getOptions())
            .map(
                (response : Response) => {
                    return response.json().components;
                }
            );
    }

    /**
     *This function call API in order to create a Page.
     * @param page
     * @returns {Observable<R>}
     */
    createPage(page : Page) :Observable<any> {

        return this.http.post(this.apiManager.getPathByName('savePage'),page,this.getOptions())
            .map(
                (response : Response) => {
                    return response.json().page;
                }
            );
    }

    /**
     * This function call API in order to Create an Element
     * @param elem
     * @returns {Observable<R>}
     */
    createElement(elem : LortomElement) : Observable<any> {

        return this.http.post(this.apiManager.getPathByName('saveElement'),elem,this.getOptions())
            .map(
                (response : Response) => {
                    return response.json().element;
                }
            );
    }

    createComponent(comp : LortomComponent) : Observable<any>{

        return this.http.post(this.apiManager.getPathByName('saveComponent'),comp,this.getOptions())
            .map(
                (response: Response) => {
                    return response.json().component;
                }
            )
    }

    /**
     * This function set an Element into the listOfElements
     * @param elem
     */
    setElement(elem : LortomElement) : void {

        let el = this.getElements();
        el.push(elem);
        this.deleteElementFromCache();
        this.setElements(el);
    }

    /**
     * This function set a Page into the listOfPages
     * @param page
     */
    setPage(page : Page) : void {

        let pages = this.getPages();
        pages.push(page);
        this.deletePageFromCache();
        this.setPages(pages);
    }

    /**
     * This function set a Component into the listOfComponents
     * @param cmp
     */
    setComponent(cmp : LortomComponent) : void {

        let comp = this.getComponents();
        comp.push(cmp);
        this.deleteComponentFromCache();
        this.setComponents(comp);
    }

    /**
     * this function delete pages from cache
     */
    deletePageFromCache() : void
    {
        this.deleteItem('pages','listOfPages');
    }

    /**
     * This function delete elements from cache
     */
    deleteElementFromCache() : void {
        this.deleteItem('elements','listOfElements');
    }

    /**
     * This function delete components from cache
     */
    deleteComponentFromCache() :void {
        this.deleteItem('components','listOfComponents');
    }

    /**
     * this function fire event
     */
    updateListOfPages()
    {
        this._updatePages.next();
    }

    /**
     * this function fire event
     */
    updateListOfElements()
    {
        this._updateElements.next();
    }

    updateListOfComponents()
    {
        this._updateComponents.next();
    }


    getPageAtt() : Observable<any> {
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
    savePage(page : Page) : Observable<any> {

        return this.http.put(this.apiManager.getPathByName('savePage'),page,this.getOptions())
            .map(
                (response : Response) => {
                    return response.json().page;
                }
            );
    }

    /**
     * This function call API in order to update an Element
     * @param element
     * @returns {Observable<R>}
     */
    saveElement(element : LortomElement) : Observable <any> {

        return this.http.put(this.apiManager.getPathByName('saveElement'),element,this.getOptions())
            .map(
                (response : Response) => {
                    return response.json().element;
                }
            );
    }

}