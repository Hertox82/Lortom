import { NgModule } from '@angular/core';
import {FilesComponent} from './component/Files/files.component';
import {routing} from './file.routing';
import {BreadCrumbModule, BreadCrumbsComponent} from '@Lortom-Backend/breadcrumbs';
import {CommonModule} from '@angular/common';
import {FileComponent} from './component/File/file.component';
import {FilesServices} from '@Lortom/plugins/Hardel/File/Services/files.services';
import {FormsModule} from '@angular/forms';
import { FileNewComponent } from './component/NewFile/filenew.component';
import { LtFiledndModule } from 'lt-drag-and-drop';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        routing,
        BreadCrumbModule,
        LtFiledndModule
    ],
    entryComponents: [
        BreadCrumbsComponent
    ],
    providers: [
        FilesServices
    ],
    declarations: [
        FilesComponent,
        FileComponent,
        FileNewComponent
    ]
})

export class FileModule {}
