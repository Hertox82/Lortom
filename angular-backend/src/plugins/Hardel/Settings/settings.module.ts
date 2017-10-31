/**
 * Created by hernan on 17/10/2017.
 */


import {NgModule} from "@angular/core";
import {routing,routedComponents} from "./settings.routing";
import {SettingsService} from "./Services/settings.service";
import {CommonModule} from "@angular/common";

@NgModule({
    imports:[routing,CommonModule],
    providers: [SettingsService],
    declarations: [routedComponents]
})

export class SettingsModule {}