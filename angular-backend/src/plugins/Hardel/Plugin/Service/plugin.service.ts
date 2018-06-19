/**
 * Created by hernan on 13/12/2017.
 */


import {Injectable} from "@angular/core";
import {MasterService} from "@Lortom/services/master.service";
import {Http, Response} from "@angular/http";
import {LtPlugin, LtTemplate} from "@Lortom/plugins/Hardel/Plugin/Service/plugin.interface";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

@Injectable()
export class PluginService extends MasterService
{
    listOfPlugins : LtPlugin[];
    listOfTemplate: LtTemplate[];

    private _updatePlugins = new Subject();
    private _updateTemplate = new Subject();
    updatePlugins$ = this._updatePlugins.asObservable();
    updateTemplate$ = this._updateTemplate.asObservable();

    constructor(private http: Http) {
        super();

        // write the api route for setting
        const urls = [
            { namePath: 'getPlugins', path: 'plugins'},
            { namePath: 'installPlugin', path: 'plugin'},
            { namePath: 'packPlugin', path: 'plugin/pack'},
            { namePath: 'delPack', path: 'plugin/delete'},
            { namePath: 'getLatestPlugin', path: 'plugins/latest'},
            { namePath: 'getLatestTemplate', path: 'templates/latest'},
            { namePath: 'getTemplate', path: 'templates'},
            { namePath: 'packTemplate', path: 'template/pack'},
            { namePath: 'unPackTemp', path: 'template/delpack'},
            { namePath: 'instTemp', path: 'template'}
        ];
        //Add the Api to the ApiManager
        this.apiManager.addListUrlApi(urls);
    }

    /* Section call to API */

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

    getTemplateFrom(): Observable<any> {
        return this.http.get(this.apiManager.getPathByName('getTemplate'))
            .map(
                (response: Response) => {
                    return response.json();
                }
            );
    }

    getLatestPlugin(): Observable<any> {
        return this.http.get(this.apiManager.getPathByName('getLatestPlugin'))
            .map(
                (response: Response) => {
                    return response.json().plugins;
                }
            );
    }

    getLatestTemplate(): Observable<any> {
        return this.http.get(this.apiManager.getPathByName('getLatestTemplate'))
            .map(
                (response: Response) => {
                    return response.json().template;
                }
            );
    }

    /**
     * This Function call API in order to Delete a list of Plugins
     * @param plugins
     * @returns {Observable<R>}
     */
    uninstallPlugins(plugins : LtPlugin []) : Observable<any> {

        return this.http.put(this.apiManager.getPathByName('getPlugins'),plugins,this.getOptions())
            .map(
                (response : Response) => {
                    return response.json().message;
                }
            );
    }

    uninstallTemplate(template: LtTemplate): Observable<any> {
        return this.http.put(this.apiManager.getPathByName('instTemp'),template,this.getOptions())
            .map(
                (response: Response) => {
                    return response.json().message;
                }
            );
    }

    deletePackPlugin(plugin: LtPlugin): Observable<any> {
        return this.http.post(this.apiManager.getPathByName('delPack'),plugin,this.getOptions())
            .map(
                (response: Response) => {
                    return response.json().plugins;
                }
            );
    }

    deletePackTemplate(template: LtTemplate): Observable<any> {
        return this.http.post(this.apiManager.getPathByName('unPackTemp'),template,this.getOptions())
            .map(
                (response: Response) => {
                    return response.json().message;
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
                    return response.json().message;
                }
            );
    }

    installTemplate(template: LtTemplate): Observable<any> {
        return this.http.post(this.apiManager.getPathByName('instTemp'),template,this.getOptions())
            .map(
                (response: Response) => {
                    return response.json().message;
                }
            );
    }

    activateTemplate(template: LtTemplate): Observable<any> {
        return this.http.post(this.apiManager.getPathByName('actiTemp'),template,this.getOptions())
            .map(
                (response: Response) => {
                    return response.json().message;
                }
            );
    }

    deactivateTemplate(template: LtTemplate): Observable<any> {
        return this.http.post(this.apiManager.getPathByName('deactiTemp'),template,this.getOptions())
            .map(
                (response: Response) => {
                    return response.json().message;
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
                    return response.json().messsage;
                }
            );
    }

    updateTemplate(template: LtTemplate): Observable<any> {
        return this.http.put(this.apiManager.getPathByName('installTemplate'),template,this.getOptions())
            .map(
                (response: Response) => {
                    return response.json().message;
                }
            );
    }

    packPlugin(plugin: LtPlugin): Observable<any> {
        return this.http.post(this.apiManager.getPathByName('packPlugin'),plugin,this.getOptions())
            .map(
                (response: Response) => {
                    return response.json().plugins;
                }
            );
    }

    packTemplate(template: LtTemplate): Observable<any> {
        return this.http.post(this.apiManager.getPathByName('packTemplate'),template,this.getOptions())
            .map(
                (response: Response) => {
                    return response.json().message;
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

    setTemplate(template: any): void {

        let data = template as LtTemplate[];
        this.setItem('template',data);
        this.listOfTemplate = data;
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

    updateListOfTemplate() {
        this._updateTemplate.next();
    }

}
