/**
 * Created by hernan on 17/10/2017.
 */


import {NgModule} from "@angular/core";
import {routing,routedComponents} from "./settings.routing";
import {SettingsService} from "./Services/settings.service";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        HttpModule,
        routing
    ],
    providers: [SettingsService],
    declarations: [routedComponents]
})

export class SettingsModule {}
