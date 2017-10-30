import { Component } from '@angular/core';
import {EventService} from "../services/event.service";
import {MenuService} from "./menuservice";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isAuth = false;
  user : any;

  constructor(private event : EventService) {

    let cookie = this.getCookie('l_t');
    if(cookie)
    {
      this.isAuth = true;
    }
    this.event.logged$.subscribe(
        (isLogged : boolean) => this.isAuth = isLogged
    );

    this.event.user$.subscribe(
        (user : any ) => {
          this.user = user;
        }
    );
  }


  private getCookie(name : string)
  {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }
}
