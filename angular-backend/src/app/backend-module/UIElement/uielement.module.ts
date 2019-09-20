/**
 * Created by hernan on 16/11/2017.
 */


import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {PaginationComponent} from "./pagination/pagination.component";
import {ShowEntryComponent} from "./pagination/show-entry.component";
@NgModule({
    imports : [
        CommonModule,
        FormsModule
    ],
    declarations : [PaginationComponent, ShowEntryComponent],
    providers : [],
    exports : [PaginationComponent, ShowEntryComponent]
})

export class UIElementModule {}
