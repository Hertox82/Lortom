import { NgModule } from '@angular/core'
import {routing, websiteComponent} from './website.routing';
import {BreadCrumbModule} from '@Lortom-Backend/breadcrumbs/breadcrumbs.module';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {WebsiteService} from './Services/website.service';
import {EditorModule} from '@Lortom-Backend/Editor/editor';
import {UIElementModule} from '@Lortom-Backend/UIElement/uielement.module';
import { CodemirrorModule } from 'lt-codemirror';
import { LtTreeviewModule } from 'lt-treeview';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FileManagerModule } from '@Lortom/app/backend-module/file-manager/filemanager.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        routing,
        BreadCrumbModule,
        EditorModule,
        UIElementModule,
        CodemirrorModule,
        LtTreeviewModule,
        NgbModule.forRoot(),
        FileManagerModule
    ],
    providers : [WebsiteService],
    declarations: [websiteComponent]
})

export class WebsiteModule {}
