import { NgModule } from '@angular/core';
import {FileComponent} from "./component/file.component";
import {routing} from "./file.routing";


@NgModule({
    imports: [routing],
    declarations: [
        FileComponent
    ],
})

export class FileModule {}