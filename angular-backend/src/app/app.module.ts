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



@NgModule({
  declarations: [
    AppComponent,
    MenuItemsComponent,
    MenuItemComponent,
    SubMenuItemComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing
  ],
  providers: [MenuService,EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
