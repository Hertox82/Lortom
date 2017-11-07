/**
 * Created by hernan on 26/10/2017.
 */

import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {MenuService} from "../menuservice";
import {EventService} from "../../services/event.service";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {UserModule,BreadCrumbModule,BackendImportComponent,BackendExportComponent} from "../backend-module";

@NgModule({
    imports : [
        CommonModule,
        RouterModule,
        FormsModule,
        UserModule,
        BreadCrumbModule
    ],
    declarations : [
        BackendImportComponent
    ],
    providers: [
        MenuService,
        EventService
    ],
    exports : [
        BackendExportComponent
    ]
})
export class BackendModule {}