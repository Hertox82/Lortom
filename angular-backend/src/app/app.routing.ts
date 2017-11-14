import {Routes, RouterModule} from "@angular/router"; 
import {ModuleWithProviders} from "@angular/core"; 
import {LoginComponent,LogoutComponent} from "./backend-module/login"; 
import {UserModelComponent} from "./backend-module/user-module"; 
import {NotFoundComponent} from "./backend-module/notfoundpage"; 

const routes: Routes = [ 
       {path: 'backend', redirectTo:'backend/dashboard', pathMatch: 'full'}, 
              {path: 'backend/login', component: LoginComponent}, 
              {path: 'backend/logout', component: LogoutComponent}, 
              {path: 'backend/profile/edit', component : UserModelComponent }, 
              {path: 'backend/not-found', component: NotFoundComponent}, 
       {path: 'backend/dashboard' , loadChildren:'../plugins/Hardel/Dashboard/dashboard.module#DashboardModule'},
       {path: 'backend/plugin' , loadChildren:'../plugins/Hardel/Plugin/plugin.module#PluginModule'},
       {path: 'backend/settings' , loadChildren:'../plugins/Hardel/Settings/settings.module#SettingsModule'},
       {path: 'backend/website' , loadChildren:'../plugins/Hardel/Website/website.module#WebsiteModule'}
]; 
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);