/**
 * Created by hernan on 16/11/2017.
 */


import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {PaginationComponent} from "./pagination/pagination.component";
@NgModule({
    imports : [
        CommonModule,
        FormsModule
    ],
    declarations : [PaginationComponent],
    providers : [],
    exports : [PaginationComponent]
})

export class UIElementModule {}