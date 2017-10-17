/**
 * Created by hernan on 17/10/2017.
 */


import {RouterModule, Routes} from "@angular/router";
import {DashBoardComponent} from './component/dashboard.component';
import {ModuleWithProviders} from "@angular/core";


const routes : Routes = [
    {path:'', component: DashBoardComponent}
];

export const routing : ModuleWithProviders = RouterModule.forChild(routes);
