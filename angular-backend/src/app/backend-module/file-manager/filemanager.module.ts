import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileManagerComponent } from './filemanager.component';
import { LtFiledndModule } from 'lt-drag-and-drop';
import { FilesServices } from '@Lortom/plugins/Hardel/File/Services/files.services';




@NgModule({
    imports: [
        CommonModule,
        LtFiledndModule
    ],
    declarations: [
        FileManagerComponent
    ],
    exports: [
        FileManagerComponent
    ],
    providers: [
        FilesServices
    ]
})
export class FileManagerModule {}
