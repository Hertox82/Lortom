
import {RouterModule, Routes} from "@angular/router";
import {WebsiteComponent,PagesComponent,PageNewComponent,PageComponent,ElementsComponent} from './component';
import {ModuleWithProviders} from "@angular/core";


const routes : Routes = [
    {path:'', component: WebsiteComponent, data : { breadcrumb : 'Website'}, children : [
        {path: 'pages', component: PagesComponent, data : {breadcrumb : 'Pages'}, children : [
            {path: 'new', component : PageNewComponent, data : {breadcrumb : 'New'}},
            {path: ':id', component : PageComponent, data : {breadcrumb : 'Page'}}
        ]},
        {path: 'elements', component: ElementsComponent, data : {breadcrumb : 'Elements'}}
    ]}
];

export const routing : ModuleWithProviders = RouterModule.forChild(routes);

export const websiteComponent = [WebsiteComponent,PagesComponent, PageNewComponent,PageComponent,ElementsComponent];

//console.log(websiteComponent);