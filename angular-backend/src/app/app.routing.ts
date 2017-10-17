/**
 * Created by hernan on 17/10/2017.
 */

import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";

/*const routes : Routes = [
    {path: 'backend', redirectTo:'backend/dashboard', pathMatch: 'full'},
    {path: 'backend/dashboard', loadChildren: '../plugins/Hardel/Dashboard/dashboard.module#DashBoardModule'},
    {path: 'backend/settings', loadChildren: '../plugins/Hardel/Settings/settings.module#SettingsModule'},
    {path: 'backend/plugin', loadChildren: '../plugins/Hardel/Plugin/plugin.module#PluginModule'}
];*/

const routes: Routes = [
    {path: 'backend', redirectTo:'backend/dashboard', pathMatch: 'full'},
    {path: 'backend/dashboard', loadChildren: '../plugins/Hardel/Dashboard/dashboard.module#DashBoardModule'},
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);