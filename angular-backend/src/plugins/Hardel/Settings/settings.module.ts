/**
 * Created by hernan on 17/10/2017.
 */


import {NgModule} from "@angular/core";
import {routing,routedComponents} from "./settings.routing";
import {SettingsService} from "./Services/settings.service";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        routing
    ],
    providers: [SettingsService],
    declarations: [routedComponents]
})

export class SettingsModule {}