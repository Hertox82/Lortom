import { NgModule } from '@angular/core';
import {FilesComponent} from "./component/files.component";
import {routing} from "./file.routing";
import {BreadCrumbModule} from "@Lortom-Backend/breadcrumbs";
import {CommonModule} from "@angular/common";
import {FileComponent} from "./component/file.component";
import {FilesServices} from "@Lortom/plugins/Hardel/File/Services/files.services";
import {FormsModule} from "@angular/forms";


@NgModule({
    imports: [
        routing,
        BreadCrumbModule,
        CommonModule,
        FormsModule
    ],
    providers: [
        FilesServices
    ],
    declarations: [
        FilesComponent,
        FileComponent
    ],
})

export class FileModule {}