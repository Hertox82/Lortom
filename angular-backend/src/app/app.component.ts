import { Component } from '@angular/core';
import {EventService} from '../services/event.service';
import {NavigationEnd, Router} from '@angular/router';
import { AuthService } from './auth-module/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: ['']
})
export class AppComponent {
  title = 'app';
  isAuth = false;
  user: any;
  urlLogin = '/backend/login';
  isLogin = true;

  constructor(private event: EventService, private authSer: AuthService, private router: Router) {

    if (this.authSer.isAuthenticated()) {
        this.isLogin = false;
        this.isAuth = true;
        this.authSer.createUser();
        this.user = this.authSer._currentUser;
    }
    this.router.events.subscribe(
        (val) => {
          if (val instanceof NavigationEnd) {
            if (this.urlLogin === val.url) {
              this.isLogin = true;
              this.isAuth = false;
            } else {
              this.isLogin = false;
            }
          }
        }
    );

    if (!this.isAuth) {
      sessionStorage.removeItem('users');
      sessionStorage.removeItem('roles');
    }
    this.event.getAuthenticate()
    .subscribe(
        (isLogged: boolean) => this.isAuth = isLogged
    );

    this.event.retriveUser()
    .subscribe(
        (user: any ) => {
          this.user = user;
        }
    );
  }
}
