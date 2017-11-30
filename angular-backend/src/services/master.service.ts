import {ApiManager} from "@Lortom/app/urlApi/api.manager";
import {User} from "@Lortom-Backend/user-module/user-model/user.interface";
import {RequestOptions, Headers} from "@angular/http";
/**
 * Created by hernan on 20/11/2017.
 */



export class MasterService {

    protected apiManager : ApiManager;
    protected user : User;

    constructor()
    {
        this.apiManager = new ApiManager();
    }

    /**
     * Check if User has permission
     * @param name
     * @returns {boolean}
     */
    public hasPermissions(name: string) : boolean
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
     * This function is abstraction of getting item by property
     * @param propertyName
     * @param value
     * @param sessionName
     * @param prop
     * @returns {null | any }
     */
    protected getItemByProperty(propertyName : string, value: any, sessionName : string, prop : string)
    {
        let list = this.getItem(sessionName,prop);

        let response = null;

        list.forEach(
            (item : any) => {
                if(item[propertyName] === value)
                {
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
    protected updateItemInList(item : any, iList : any) :any
    {
       for(let i=0; i<iList.length; i++)
       {
         if(iList[i].id === item.id)
         {
             console.log('change item');
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
    protected checkItemExist(name : string) : boolean
    {
        return (sessionStorage.getItem(name) !== null);
    }

    /**
     * Set Item into a SessionStorage
     * @param name
     * @param list
     */
    protected setItem(name : string, list :any) : void
    {
        sessionStorage.setItem(name,JSON.stringify(list));
    }

    /**
     * Get Item from SessionStorage
     * @param name
     * @param prop
     * @returns {any}
     */
    protected getItem(name : string, prop : string) : any
    {
        if(this[prop] == null || this[prop] == undefined) {
            return JSON.parse(sessionStorage.getItem(name));
        }
        else
        {
            return this[prop];
        }
    }

    /**
     * Delete item from SessionStorage
     * @param name
     * @param prop
     */
    protected deleteItem(name : string, prop : string) : void
    {
        this[prop] = null;
        sessionStorage.removeItem(name);
    }

    protected getOptions() : RequestOptions
    {
        let headers = new Headers({'Content-Type' : 'application/json'});

        return new RequestOptions({headers : headers});
    }
}