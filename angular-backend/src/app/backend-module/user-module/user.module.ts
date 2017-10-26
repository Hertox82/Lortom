import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {UserSideComponent} from "./user-side/user-side.component";
import {EventService} from "../../../services/event.service";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
    ],
    declarations : [
        UserSideComponent
    ],
    providers : [
        EventService
    ],
    exports: [
        UserSideComponent
    ]
})

export class UserModule {}
