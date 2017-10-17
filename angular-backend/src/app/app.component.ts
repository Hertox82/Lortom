import { Component } from '@angular/core';
import {MenuService} from "./menuservice";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  routes : Route[];
  constructor(private routeService : MenuService, private router : Router)
  {
    this.routeService.helpRoute$.subscribe(
        (route : Route[]) => {
          this.routes = route;
          console.log(this.routes);
          this.router.resetConfig(this.routes);
        }
    );
  }
}
