
/**
 * Created by hernan on 17/10/2017.
 */
import {RouterModule, Routes} from "@angular/router";
import {SettingsComponent} from "./component/settings.component";
import {ModuleWithProviders} from "@angular/core";


const routes : Routes = [
    {path: '' , component:SettingsComponent}
];

export const routing : ModuleWithProviders = RouterModule.forChild(routes);