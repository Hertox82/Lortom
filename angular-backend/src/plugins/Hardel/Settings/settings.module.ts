/**
 * Created by hernan on 17/10/2017.
 */


import {NgModule} from "@angular/core";
import {routing,routedComponents} from "./settings.routing";
import {SettingsService} from "./Services/settings.service";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {BreadCrumbModule} from "../../../app/backend-module/";
import {UIElementModule} from "../../../app/backend-module/UIElement/uielement.module";

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        HttpClientModule,
        routing,
        BreadCrumbModule,
        UIElementModule
    ],
    providers: [SettingsService],
    declarations: [routedComponents]
})

export class SettingsModule {}
