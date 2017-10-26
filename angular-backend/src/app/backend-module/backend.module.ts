/**
 * Created by hernan on 26/10/2017.
 */

import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {NavbarComponent} from "./navbar/navbar.component";
import {NavbarItemComponent} from "./navbar-item/navbar-item.component";
import {MenuItemsComponent} from "./menu-items/menu-items.component";
import {MenuItemComponent} from "./menu-item/menu-item.component";
import {SubMenuItemComponent} from "./submenu-item/submenu-item.component";
import {LoginComponent} from "./login/login.component";
import {MenuService} from "../menuservice";
import {EventService} from "../../services/event.service";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {LogoutComponent} from "./logout/logout.component";
import {UserModule} from "./user-module/user.module";
import {UserSideComponent} from "./user-module/user-side/user-side.component";

@NgModule({
    imports : [
        CommonModule,
        RouterModule,
        FormsModule,
        UserModule
    ],
    declarations : [
        NavbarComponent,
        NavbarItemComponent,
        MenuItemsComponent,
        MenuItemComponent,
        SubMenuItemComponent,
        LoginComponent,
        LogoutComponent
    ],
    providers: [
        MenuService,
        EventService
    ],
    exports : [
        NavbarComponent,
        MenuItemsComponent,
        LoginComponent,
        LogoutComponent,
        UserSideComponent
    ]
})
export class BackendModule {}