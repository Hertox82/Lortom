
/**
 * Created by hernan on 17/10/2017.
 */

import {RouterModule, Routes} from "@angular/router";
import {PluginComponent} from "./component/plugin.component";
import {ModuleWithProviders} from "@angular/core";


const routes : Routes = [
    {path: '', component: PluginComponent, data : { breadcrumb : 'Plugin'} }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);