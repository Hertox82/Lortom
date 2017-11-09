
/**
 * Created by hernan on 17/10/2017.
 */
import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {RoleComponent,RoleNewComponent,RolesComponent,SettingsComponent,UsersComponent,UserNewComponent} from "./component";

const routes : Routes = [
    {path: '' , component:SettingsComponent, data : { breadcrumb : 'Settings'} , children:[
        {path: 'roles', component: RolesComponent, data : { breadcrumb : 'Roles'}, children: [
            {path: 'new', component:RoleNewComponent, data : { breadcrumb : 'New Role'} },
            {path: ':id', component:RoleComponent, data : {breadcrumb : 'Role'}},
        ]},
        {path: 'users', component:UsersComponent, data: {breadcrumb : 'Users'}, children: [
            {path: 'new', component:UserNewComponent, data : { breadcrumb : 'New User'} },
        ]}
    ]}
];

export const routing : ModuleWithProviders = RouterModule.forChild(routes);

export const routedComponents = [SettingsComponent,RolesComponent,RoleComponent,RoleNewComponent,UsersComponent, UserNewComponent];