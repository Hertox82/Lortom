
import {RouterModule, Routes} from "@angular/router";
import {FileComponent} from './component/file.component';
import {ModuleWithProviders} from "@angular/core";


const routes : Routes = [
    {path:'', component: FileComponent}
];

export const routing : ModuleWithProviders = RouterModule.forChild(routes);