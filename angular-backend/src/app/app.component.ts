import { Component } from '@angular/core';
import {EventService} from "../services/event.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isAuth = false;

  constructor(private event : EventService) {

    console.log(document.cookie);
    let cookie = this.getCookie('l_t');

    console.log(cookie);
    this.event.logged$.subscribe(
        (isLogged : boolean) => this.isAuth = isLogged
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
