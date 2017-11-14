/**
 * Created by hernan on 14/11/2017.
 */

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {EditorComponent} from "./editor.component";



@NgModule({
    imports: [
        CommonModule,
    ],
    declarations : [
        EditorComponent
    ],
    providers : [
    ],
    exports: [
        EditorComponent
    ]
})

export class EditorModule {}