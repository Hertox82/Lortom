
import {RouterModule, Routes} from "@angular/router";
import {WebsiteComponent,
        PagesComponent,
        PageNewComponent,
        PageComponent,
        ElementsComponent,
        ElementNewComponent,
        ElementComponent,
        ComponentsComponent,
        NewComponent,
} from './component';
import {ModuleWithProviders} from "@angular/core";


const routes : Routes = [
    {path:'', component: WebsiteComponent, data : { breadcrumb : 'Website'}, children : [
        {path: 'pages', component: PagesComponent, data : {breadcrumb : 'Pages'}, children : [
            {path: 'new', component : PageNewComponent, data : {breadcrumb : 'New'}},
            {path: ':id', component : PageComponent, data : {breadcrumb : 'Page'}}
        ]},
        {path: 'elements', component: ElementsComponent, data : {breadcrumb : 'Elements'}, children: [
            {path: 'new', component : ElementNewComponent, data : {breadcrumb : 'New'}},
            {path : ':id', component : ElementComponent, data : {breadcrumb : 'Element'}}
        ]},
        {path : 'components', component: ComponentsComponent, data : {breadcrumb : 'Components'}, children : [
            {path : 'new', component : NewComponent, data : {breadcrumb : 'New'}}
        ]}
    ]}
];

export const routing : ModuleWithProviders = RouterModule.forChild(routes);

export const websiteComponent = [WebsiteComponent,PagesComponent, PageNewComponent,PageComponent,ElementsComponent,ElementNewComponent,ElementComponent,ComponentsComponent,NewComponent];

//console.log(websiteComponent);