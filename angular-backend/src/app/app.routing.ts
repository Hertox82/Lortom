import {Routes, RouterModule} from "@angular/router"; 
import {ModuleWithProviders} from "@angular/core"; 

const routes: Routes = [ 
       {path: 'backend', redirectTo:'backend/dashboard', pathMatch: 'full'}, 
       {path: 'backend/dashboard' , loadChildren:'../plugins/Hardel/Dashboard/dashboard.module#DashboardModule'},
       {path: 'backend/plugin' , loadChildren:'../plugins/Hardel/Plugin/plugin.module#PluginModule'},
       {path: 'backend/settings' , loadChildren:'../plugins/Hardel/Settings/settings.module#SettingsModule'}
]; 
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);