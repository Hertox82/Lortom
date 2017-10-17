import { Component, OnInit } from '@angular/core';
import {SlideItem} from "../../interfaces/slideItem.interface";
import {Response} from "@angular/http";
import {MenuService} from "../menuservice";

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.css']
})
export class MenuItemsComponent implements OnInit {

  items : SlideItem[];
  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.menuService.getMenu()
        .subscribe(
            (menuItems : any) => {
              this.items = menuItems.menulista;
              this.menuService.sendData(menuItems.route);
              },
            (error : Response) => console.log(error)
        );
  }
}
