
import {RouterModule, Routes} from "@angular/router";
import {ProvaComponent} from './component/prova.component';
import {ModuleWithProviders} from "@angular/core";


const routes : Routes = [
    {path:'', component: ProvaComponent}
];

export const routing : ModuleWithProviders = RouterModule.forChild(routes);