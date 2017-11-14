import { NgModule } from '@angular/core';
import {routing,websiteComponent} from "./website.routing";
import {BreadCrumbModule} from "../../../app/backend-module/breadcrumbs/breadcrumbs.module";
import {CommonModule} from "@angular/common";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {WebsiteService} from "./Services/website.service";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        routing,
        BreadCrumbModule,
    ],
    providers : [WebsiteService],
    declarations: [websiteComponent]
})

export class WebsiteModule {}