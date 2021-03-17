import {ApiManager} from '@Lortom/app/urlApi/api.manager';
import {User} from '@Lortom-Backend/user-module/user-model/user.interface';
import {HttpHeaders, HttpParams, HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
/**
 * Created by hernan on 20/11/2017.
 */



export class MasterService {

    protected apiManager: ApiManager;
    protected user: User;

    constructor(protected http?: HttpClient) {
        this.apiManager = new ApiManager();
    }

     /**
     * Check if User has permission
     * @param name
     * @returns {boolean}
     */
    public hasPermissions(name: string): boolean {
        if (this.user == null) {
            this.user = JSON.parse(sessionStorage.getItem('user'));
        }
        for (let i = 0; i < this.user.permissions.length; i++) {
            if (this.user.permissions[i].name === name) {
                return true;
            }
        }
        return false;
    }

    protected getFrom<T>(path: string): Observable<T[]> {
        return this.http.get<T>(path)
        .pipe(
            map(item => this.convertData(item))
        );
    }

    protected updateItem<T>(item: T, path: string): Observable<T[]> {
        return this.http.put<T>(path, item, this.getOptions())
        .pipe(
            map(data => this.convertData(data))
        );
    }


    protected storeItem<T>(item: T, path: string, typeHeader: any = 'application/json'): Observable<T[]> {
        return this.http.post<T>(path, item, this.getOptions(typeHeader))
        .pipe(
            map(data => this.convertData(data))
        );
    }

    protected convertData<T>(data: any): T[] {
        return data;
    }

    /**
     * This function get index page of Element
     * @param keyPath
     */
    public index(keyPath: string): Observable<any[]> {
        return this.getFrom<any>(this.apiManager.getPathByName('index' + keyPath));
    }

    /**
     * This function get create page of Element
     * @param keyPath
     */
    public create(keyPath: string): Observable<any[]> {
        return this.getFrom<any>(this.apiManager.getPathByName('create' + keyPath));
    }

    /**
     * This function store the Object into API
     * @param keyPath
     * @param data
     */
    public store(keyPath: string, data: any): Observable<any[]> {
        return this.storeItem<any>(data, this.apiManager.getPathByName('store' + keyPath));
    }

    /**
     * This function get edit page of Element
     * @param keyPath
     * @param id
     */
    public edit(keyPath: string, id: number): Observable<any[]> {
        return this.getFrom<any>(this.apiManager.getPathByName('edit' + keyPath).replace('{id}', id.toString()));
    }


    /**
     * This function update the Object into API
     * @param keyPath
     * @param id
     * @param data
     */
    public update(keyPath: string, id: number, data: any): Observable<any[]> {
        return this.updateItem<any>(data, this.apiManager.getPathByName('update' + keyPath).replace('{id}', id.toString()));
    }

    public delete(keyPath: string, data: any): Observable<any[]> {
        return this.storeItem<any>(data, this.apiManager.getPathByName('delete' + keyPath));
    }

    public loadOnServer(url: string, file: {id: string, data: File}): void {
        const formData = new FormData();
        formData.append(file.id, file.data, file.data.name);
        const option = this.getOptions([]);
        this.http.post(url, formData, option)
        .pipe(
            map(
                (response) => {
                    console.log(response);
                    return [];
                }
            )
        ).subscribe((response) => {
            console.log(response);
        });
    }

    /**
     * This function is abstraction of getting item by property
     * @param propertyName
     * @param value
     * @param sessionName
     * @param prop
     * @returns {null | any }
     */
    protected getItemByProperty(propertyName: string, value: any, sessionName: string, prop: string) {
        const list = this.getItem(sessionName, prop);

        let response = null;

        list.forEach(
            (item: any) => {
                if (item[propertyName] === value) {
                    response = item;
                }
            }
        );

        return response;
    }

    /**
     * this function update every type of item into the own List
     * @param item
     * @param list
     */
    protected updateItemInList(item: any, iList: any): any {
       for (let i = 0; i < iList.length; i++) {
         if (iList[i].id === item.id) {
            iList[i] = item;
         }
       }

        return iList;
    }

    /**
     * Return if an Item exist
     * @param name
     * @returns {boolean}
     */
    protected checkItemExist(name: string): boolean {
        const variabile = sessionStorage.getItem(name);

        if (sessionStorage.getItem(name) !== null) {
            if (variabile.length !== 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    /**
     * Set Item into a SessionStorage
     * @param name
     * @param list
     */
    protected setItem(name: string, list: any, obj?: string): void {
        sessionStorage.setItem(name, JSON.stringify(list));
        if (obj !== undefined) {
            this[obj] = list;
        }
    }

    /**
     * Get Item from SessionStorage
     * @param name
     * @param prop
     * @returns {any}
     */
    protected getItem(name: string, prop: string): any {
        if (this[prop] == null || this[prop] === undefined) {
            return JSON.parse(sessionStorage.getItem(name));
        } else {
            return this[prop];
        }
    }

    /**
     * Delete item from SessionStorage
     * @param name
     * @param prop
     */
    protected deleteItem(name: string, prop: string): void {
        this[prop] = null;
        sessionStorage.removeItem(name);
    }

    protected getOptions(type: any = 'application/json'): {
    headers?: HttpHeaders;
    observe?: 'body';
    params?: HttpParams;
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
    } {
        const headers = new HttpHeaders({'Content-Type' : type});

        return {headers : headers};
    }

}
