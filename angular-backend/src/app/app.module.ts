import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from "@angular/http";
import { AppComponent } from './app.component';
import { MenuItemsComponent } from './menu-items/menu-items.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import {MenuService} from "./menuservice";



@NgModule({
  declarations: [
    AppComponent,
    MenuItemsComponent,
    MenuItemComponent
  ],
  imports: [
    BrowserModule,
      HttpModule
  ],
  providers: [MenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
