
/**
 * Created by hernan on 17/10/2017.
 */
import {RouterModule, Routes} from "@angular/router";
import {SettingsComponent} from "./component/settings.component";
import {ModuleWithProviders} from "@angular/core";
import {RolesComponent} from "./component/Roles/roles.component";

const routes : Routes = [
    {path: '' , component:SettingsComponent, children:[
        {path: 'roles', component:RolesComponent}
    ]}
];

export const routing : ModuleWithProviders = RouterModule.forChild(routes);

export const routedComponents = [SettingsComponent,RolesComponent];