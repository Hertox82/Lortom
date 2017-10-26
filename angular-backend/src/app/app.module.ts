import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from "@angular/http";
import { AppComponent } from './app.component';
import { MenuItemsComponent } from './menu-items/menu-items.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import {MenuService} from "./menuservice";
import {routing} from "./app.routing";
import {SubMenuItemComponent} from "./submenu-item/submenu-item.component";
import {EventService} from "../services/event.service";
import {LoginComponent} from "./login/login.component";
import {FormsModule} from "@angular/forms";
import {NavbarComponent} from "./navbar/navbar.component";
import {NavbarItemComponent} from "./navbar-item/navbar-item.component";



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavbarItemComponent,
    MenuItemsComponent,
    MenuItemComponent,
    SubMenuItemComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    FormsModule
  ],
  providers: [MenuService,EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
