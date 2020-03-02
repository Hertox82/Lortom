import { Component, OnInit } from '@angular/core';
import {SlideItem} from '../../../interfaces/slideItem.interface';
import {Response} from '@angular/http';
import {MenuService} from '../../menuservice';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styles: ['']
})
export class MenuItemsComponent implements OnInit {

  items: SlideItem[];
  constructor(private menuService: MenuService) { }

  ngOnInit() {
   this.menuService.getMenu().map(
         (response: {menulista: SlideItem[]}) => {
              return response.menulista;
            }
        ).subscribe(
            (menuItems: SlideItem[]) => {
              // this.items = menuItems;
              this.items = Object.keys(menuItems).map(function(itemsIndex){
                const item = menuItems[itemsIndex];
                // do something with person
                return item;
              });
            },
            (error: Response) => console.log(error)
        );
  }
}
