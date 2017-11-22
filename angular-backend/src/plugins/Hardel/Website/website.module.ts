import { NgModule } from '@angular/core';
import {routing,websiteComponent} from "./website.routing";
import {BreadCrumbModule} from "@Lortom-Backend/breadcrumbs/breadcrumbs.module";
import {CommonModule} from "@angular/common";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {WebsiteService} from "./Services/website.service";
import {EditorModule} from "@Lortom-Backend/Editor/editor";
import {UIElementModule} from "@Lortom-Backend/UIElement/uielement.module";
import { CodemirrorModule } from "ng2-codemirror";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        routing,
        BreadCrumbModule,
        EditorModule,
        UIElementModule,
        CodemirrorModule,
    ],
    providers : [WebsiteService],
    declarations: [websiteComponent]
})

export class WebsiteModule {}