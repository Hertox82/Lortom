import {Routes, RouterModule} from "@angular/router"; 
import {ModuleWithProviders} from "@angular/core";
import {LoginComponent,LogoutComponent} from "./backend-module/login";

const routes: Routes = [ 
       {path: 'backend', redirectTo:'backend/dashboard', pathMatch: 'full'},
       {path: 'backend/login', component: LoginComponent},
       {path: 'backend/logout', component: LogoutComponent},
       {path: 'backend/dashboard',loadChildren:'../plugins/Hardel/Dashboard/dashboard.module#DashboardModule'},
       {path: 'backend/plugin', loadChildren:'../plugins/Hardel/Plugin/plugin.module#PluginModule'},
       {path: 'backend/settings', loadChildren:'../plugins/Hardel/Settings/settings.module#SettingsModule'}
]; 
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);