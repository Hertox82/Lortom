import {Component, Input, OnInit} from '@angular/core';
import {SlideItem} from "../../interfaces/slideItem.interface";

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {

  @Input() item : SlideItem;

  constructor() { }

  ngOnInit() {
  }

}
