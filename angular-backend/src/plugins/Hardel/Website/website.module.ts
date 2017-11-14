import { NgModule } from '@angular/core';
import {routing,websiteComponent} from "./website.routing";
import {BreadCrumbModule} from "../../../app/backend-module/breadcrumbs/breadcrumbs.module";
import {CommonModule} from "@angular/common";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {WebsiteService} from "./Services/website.service";
import {EditorModule} from "../../../app/backend-module/Editor/editor";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        routing,
        BreadCrumbModule,
        EditorModule,
    ],
    providers : [WebsiteService],
    declarations: [websiteComponent]
})

export class WebsiteModule {}