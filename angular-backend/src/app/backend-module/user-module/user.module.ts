import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {UserSideComponent} from "./user-side/user-side.component";
import {EventService} from "../../../services/event.service";
import {UserModelComponent} from "./user-model/usermodel.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
    ],
    declarations : [
        UserSideComponent,
        UserModelComponent
    ],
    providers : [
        EventService
    ],
    exports: [
        UserSideComponent,
        UserModelComponent
    ]
})

export class UserModule {}


