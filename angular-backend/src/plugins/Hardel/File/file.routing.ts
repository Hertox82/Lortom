
import {RouterModule, Routes} from "@angular/router";
import {FilesComponent} from './component/files.component';
import {ModuleWithProviders} from "@angular/core";
import {FileComponent} from "./component/file.component";


const routes : Routes = [
    {path:'', component: FilesComponent, data : { breadcrumb : 'Files'}, children:[
        {path:':id', component: FileComponent, data: {breadcrumb : 'Edit File'}}
    ]}
];

export const routing : ModuleWithProviders = RouterModule.forChild(routes);