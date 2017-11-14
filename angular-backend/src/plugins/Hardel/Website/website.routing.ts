
import {RouterModule, Routes} from "@angular/router";
import {WebsiteComponent,PagesComponent} from './component';
import {ModuleWithProviders} from "@angular/core";


const routes : Routes = [
    {path:'', component: WebsiteComponent, data : { breadcrumb : 'Website'}, children : [
        {path: 'pages', component: PagesComponent, data : {breadcrumb : 'Pages'} }
    ]}
];

export const routing : ModuleWithProviders = RouterModule.forChild(routes);

export const websiteComponent = [WebsiteComponent,PagesComponent];