import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import {MenuService} from './menuservice';
import {routing} from './app.routing';
import {EventService} from '../services/event.service';
import {FormsModule} from '@angular/forms';
import {BackendModule} from './backend-module/backend.module';
import { UtilModule } from './utilModule/utilModule';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routing,
    BackendModule,
    FormsModule,
    UtilModule.forRoot()
  ],
  providers: [MenuService, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
