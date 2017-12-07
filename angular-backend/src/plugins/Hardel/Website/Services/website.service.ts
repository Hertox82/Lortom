/**
 * Created by hernan on 14/11/2017.
 */


import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {LortomComponent, Page, LortomMenu} from "./website.interfaces";
import {MasterService} from "@Lortom/services/master.service";

@Injectable()
export class WebsiteService extends MasterService{


    listOfPages : Page[];
    listOfComponents : LortomComponent[];
    listOfMenus: LortomMenu[];

    private _updatePages = new Subject();
    updatePages$ = this._updatePages.asObservable();

    private _updateMenus = new Subject();
    updateMenus$ = this._updateMenus.asObservable();

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
            { namePath : 'getComponents', path : 'components'},
            { namePath : 'saveComponent', path : 'component'},
            { namePath : 'getMenus', path: 'menus'},
            { namePath : 'saveMenu', path: 'menu'},
            { namePath : 'getMenuAtt', path: 'menus/attribute/list'},
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
     * This function return LortomComponent by Property
     * @param name
     * @param value
     * @returns {LortomComponent}
     */
    getComponentByProperty(name : string, value: any)
    {
        return this.getItemByProperty(name,value,'components','listOfComponents') as LortomComponent;
    }

    /**
     * This function return LortomMenu by Property
     * @param name
     * @param value
     * @returns {LortomMenu}
     */
    getMenuByProperty(name: string, value: any) {
        return this.getItemByProperty(name, value, 'menus', 'listOfMenus') as LortomMenu;
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

    updateComponentInList(cmp : LortomComponent) : void{

        if(this.listOfComponents == undefined)
        {
            this.listOfComponents = this.getComponents();
        }

        let cs = this.updateItemInList(cmp,this.listOfComponents) as LortomComponent[];

        this.setComponents(cs);
    }

    updateMenuInList(menu: LortomMenu): void {

        if (this.listOfMenus == undefined) {
            this.listOfMenus = this.getMenus();
        }

        const ms = this.updateItemInList(menu, this.listOfMenus) as LortomMenu[];

        this.setMenus(ms);
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
     * This function check if Components exist
     * @returns {boolean}
     */
    checkComponentsExist() : boolean
    {
        return this.checkItemExist('components');
    }

    /**
     * This function check if Menus exist
     * @returns {boolean}
     */
    checkMenusExist(): boolean {
        return this.checkItemExist('menus');
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
     * This function call API to get List of Components
     * @returns {Observable<R>}
     */
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
     * This function call API to get List of Menus
     * @returns {Observable<R>}
     */
    getMenusFrom() : Observable<any> {
        return this.http.get(this.apiManager.getPathByName('getMenus'))
            .map(
                (response: Response) => {
                    return response.json().menus;
                }
            );
    }

    /**
     * This function set pages and store it into a Session
     * @param pages
     */
    setPages(pages : Page[]) : void
    {
        this.setItem('pages',pages);
        this.listOfPages = pages;
    }

    /**
     * This function set components and store it into a Session
     * @param components
     */
    setComponents(components : LortomComponent []) : void
    {
        this.setItem('components',components);
        this.listOfComponents = components;
    }

    /**
     * This function set menus and store it into a Session
     * @param menus
     */
    setMenus(menus: LortomMenu[]): void {
        this.setItem('menus',menus);
        this.listOfMenus = menus;
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
     * This function get listOfComponents
     * @returns {LortomComponent[]}
     */
    getComponents() : LortomComponent []
    {
        return this.getItem('components','listOfComponents') as LortomComponent[];
    }

    /**
     * This function get listOfMenus
     * @returns {LortomMenu[]}
     */
    getMenus(): LortomMenu[] {
        return this.getItem('menus','listOfMenus') as LortomMenu[];
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
     * This function call API in order to Delete a list of Components
     * @param cmp
     * @returns {Observable<R>}
     */
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
     * This function call API in order to Delete a list of Menus
     * @param menu
     * @returns {Observable<R>}
     */
    deleteMenus(menu: LortomMenu[] ): Observable<any> {
        return this.http.put(this.apiManager.getPathByName('getMenus'),menu,this.getOptions())
            .map(
                (response: Response) => {
                    return response.json().menus;
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

    createComponent(comp : LortomComponent) : Observable<any>{

        return this.http.post(this.apiManager.getPathByName('saveComponent'),comp,this.getOptions())
            .map(
                (response: Response) => {
                    return response.json().component;
                }
            )
    }

    createMenu(menu: any): Observable<any> {
        return this.http.post(this.apiManager.getPathByName('saveMenu'),menu,this.getOptions())
            .map(
                (response: Response) => {
                    return response.json().menu;
                }
            );
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


    setMenu(menu: LortomMenu): void {
        const menuList = this.getMenus();
        menuList.push(menu);
        this.deleteMenuFromCache();
        this.setMenus(menuList);
    }

    /**
     * this function delete pages from cache
     */
    deletePageFromCache() : void
    {
        this.deleteItem('pages','listOfPages');
    }

    /**
     * This function delete components from cache
     */
    deleteComponentFromCache() :void {
        this.deleteItem('components','listOfComponents');
    }

    deleteMenuFromCache(): void {
        this.deleteItem('menus','listOfMenus');
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
    updateListOfComponents()
    {
        this._updateComponents.next();
    }

    /**
     * this function fire event
     */
    updateListOfMenus() {
        this._updateMenus.next();
    }


    /**
     * This function call API in order to get Attribute List
     * @returns {Observable<R>}
     */
    getPageAtt() : Observable<any> {
        return this.http.get(this.apiManager.getPathByName('getPageAtt'))
            .map(
                (response : Response) => {
                    return response.json();
                }
            );
    }

    /**
     * This function call API in order to get Attribute List
     * @returns {Observable<R>}
     */
    getMenuAtt() : Observable<any> {
        return this.http.get(this.apiManager.getPathByName('getMenuAtt'))
            .map(
                (response: Response) => {
                    return response.json().data;
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
     * this is HTTP request to API
     * @param comp
     * @returns {Observable<R>}
     */
    saveComponent(comp : LortomComponent) : Observable <any> {

        return this.http.put(this.apiManager.getPathByName('saveComponent'),comp,this.getOptions())
            .map(
                (response : Response) => {
                    return response.json().component;
                }
            );
    }

    /**
     * This is HTTP request to API
     * @param menu
     * @returns {Observable<R>}
     */
    saveMenu(menu: any): Observable<any> {
        return this.http.put(this.apiManager.getPathByName('saveMenu'),menu,this.getOptions())
            .map(
                (response: Response) => {
                    return response.json().menu;
                }
            );
    }
}