
import {RouterModule, Routes} from "@angular/router";
import * as WB from './component';
import {ModuleWithProviders} from "@angular/core";


const routes : Routes = [
    {path:'', component: WB.WebsiteComponent, data : { breadcrumb : 'Website'}, children : [
        {path: 'pages', component: WB.PagesComponent, data : {breadcrumb : 'Pages'}, children : [
            {path: 'new', component : WB.PageNewComponent, data : {breadcrumb : 'New'}},
            {path: ':id', component : WB.PageComponent, data : {breadcrumb : 'Page'}}
        ]},
        {path : 'components', component: WB.ComponentsComponent, data : {breadcrumb : 'Components'}, children : [
            {path : 'new', component : WB.NewComponent, data : {breadcrumb : 'New'}},
            {path : ':id', component : WB.ComponentComponent, data : {breadcrumb : 'Component'}}
        ]},
        {path: 'menu', component: WB.MenusComponent, data: {breadcrumb: 'Menus'}, children: [
            {path: 'new', component: WB.MenuNewComponent, data: {breadcrumb: 'New'}},
            {path: ':id', component: WB.MenuComponent, data: {breadcrumb: 'Menu'}}
        ]}
    ]}
];

export const routing : ModuleWithProviders = RouterModule.forChild(routes);

export const websiteComponent = [
    WB.WebsiteComponent,
    WB.PagesComponent,
    WB.PageNewComponent,
    WB.PageComponent,
    WB.ComponentsComponent,
    WB.NewComponent,
    WB.ComponentComponent,
    WB.MenusComponent,
    WB.MenuNewComponent,
    WB.MenuComponent,
];

//console.log(websiteComponent);