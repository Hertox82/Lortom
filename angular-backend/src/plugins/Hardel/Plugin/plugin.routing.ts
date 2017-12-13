
/**
 * Created by hernan on 17/10/2017.
 */

import {RouterModule, Routes} from "@angular/router";
import * as PL from "./component";
import {ModuleWithProviders} from "@angular/core";


const routes : Routes = [
    {path: '', component: PL.PluginComponent, data : { breadcrumb : 'Plugins'}, children : [
        {path: 'plugins', component: PL.ListPluginComponent, data: { breadcrumb: 'List'}}
    ]}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

export const pluginComponent = [
    PL.PluginComponent,
    PL.ListPluginComponent
];
