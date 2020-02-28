import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppComponent } from './app.component';
import {MenuService} from './menuservice';
import {routing} from './app.routing';
import {EventService} from '../services/event.service';
import {FormsModule} from '@angular/forms';
import {BackendModule} from './backend-module/backend.module';
import { UtilModule } from './utilModule/utilModule';
import { AuthInterceptor} from '@Lortom/app/auth-module/auth.interceptor';
import { AuthModule } from './auth-module/auth.module';
import { AuthGuardService } from './auth-module/auth.guard';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      headerName: 'X-CSRF-TOKEN'
    }),
    routing,
    BackendModule,
    FormsModule,
    UtilModule.forRoot(),
    AuthModule.forRoot()
  ],
  providers: [
    MenuService,
    EventService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
