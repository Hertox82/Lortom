
import {RouterModule, Routes} from "@angular/router";
import {WebsiteComponent,
        PagesComponent,
        PageNewComponent,
        PageComponent,
        ComponentsComponent,
        NewComponent,
        ComponentComponent,
} from './component';
import {ModuleWithProviders} from "@angular/core";


const routes : Routes = [
    {path:'', component: WebsiteComponent, data : { breadcrumb : 'Website'}, children : [
        {path: 'pages', component: PagesComponent, data : {breadcrumb : 'Pages'}, children : [
            {path: 'new', component : PageNewComponent, data : {breadcrumb : 'New'}},
            {path: ':id', component : PageComponent, data : {breadcrumb : 'Page'}}
        ]},
        {path : 'components', component: ComponentsComponent, data : {breadcrumb : 'Components'}, children : [
            {path : 'new', component : NewComponent, data : {breadcrumb : 'New'}},
            {path : ':id', component : ComponentComponent, data : {breadcrumb : 'Component'}}
        ]}
    ]}
];

export const routing : ModuleWithProviders = RouterModule.forChild(routes);

export const websiteComponent = [
    WebsiteComponent,
    PagesComponent,
    PageNewComponent,
    PageComponent,
    ComponentsComponent,
    NewComponent,
    ComponentComponent
];

//console.log(websiteComponent);