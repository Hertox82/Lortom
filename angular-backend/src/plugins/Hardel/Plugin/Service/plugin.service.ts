/**
 * Created by hernan on 13/12/2017.
 */


import {Injectable} from "@angular/core";
import {MasterService} from "@Lortom/services/master.service";
import {Http, Response} from "@angular/http";
import {LtPlugin} from "@Lortom/plugins/Hardel/Plugin/Service/plugin.interface";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

@Injectable()
export class PluginService extends MasterService
{
    listOfPlugins : LtPlugin[];

    private _updatePlugins = new Subject();
    updatePlugins$ = this._updatePlugins.asObservable();

    constructor(private http: Http) {
        super();

        // write the api route for setting
        const urls = [
            { namePath: 'getPlugins', path: 'plugins'},
            { namePath: 'installPlugin', path: 'plugin'},
            { namePath: 'packPlugin', path: 'plugin/pack'}
        ];
        //Add the Api to the ApiManager
        this.apiManager.addListUrlApi(urls);
    }

    /* Section call to API*/

    /**
     * This function Call API in order to get List of Plugin
     * @returns {Observable<R>}
     */
    getPluginsFrom(): Observable<any> {
        return this.http.get(this.apiManager.getPathByName('getPlugins'))
            .map(
                (response : Response) => {
                    return response.json().plugins;
                }
            );
    }

    /**
     * This Function call API in order to Delete a list of Plugins
     * @param plugins
     * @returns {Observable<R>}
     */
    deletePlugins(plugins : LtPlugin []) : Observable<any> {

        return this.http.put(this.apiManager.getPathByName('getPlugins'),plugins,this.getOptions())
            .map(
                (response : Response) => {
                    return response.json().plugins;
                }
            );
    }

    /**
     * This function call API in order to Install the Plugin
     * @param plugin
     * @returns {Observable<R>}
     */
    installPlugin(plugin: LtPlugin) : Observable<any> {
        return this.http.post(this.apiManager.getPathByName('installPlugin'),plugin,this.getOptions())
            .map(
                (response: Response) => {
                    return response.json().plugin;
                }
            );
    }

    /**
     * This function call API in order to Update the Plugin
     * @param plugin
     * @returns {Observable<R>}
     */
    updatePlugin(plugin: LtPlugin): Observable<any> {
        return this.http.put(this.apiManager.getPathByName('installPlugin'),plugin,this.getOptions())
            .map(
                (response: Response) => {
                    return response.json().plugin;
                }
            );
    }

    packPlugin(plugin: LtPlugin): Observable<any> {
        return this.http.post(this.apiManager.getPathByName('packPlugin'),plugin,this.getOptions())
            .map(
                (response: Response) => {
                    console.log(response);
                    return response.json().plugins;
                }
            );
    }

    /* End Section call to API*/

    /**
     * This function set plugins and store it into a Session
     * @param plugins
     */
    setPlugins(plugins: any) : void
    {
        let data = plugins as LtPlugin[];
        this.setItem('plugins',data);
        this.listOfPlugins = data;
    }

    /**
     * This function get listOfPlugins
     * @returns {any}
     */
    getPlugins() : LtPlugin[]
    {
        return this.getItem('plugins','listOfPlugins') as LtPlugin[];
    }

    /**
     * this function delete plugins from cache
     */
    deletePluginFromCache() : void
    {
        this.deleteItem('plugins','listOfPlugins');
    }

    /**
     * this function return if Plugins Exists
     * @returns {boolean}
     */
    checkPluginsExist() : boolean
    {
        return this.checkItemExist('plugins');
    }

    /* Fire Event*/

    /**
     * this function fire event
     */
    updateListOfPlugins()
    {
        this._updatePlugins.next();
    }

}
