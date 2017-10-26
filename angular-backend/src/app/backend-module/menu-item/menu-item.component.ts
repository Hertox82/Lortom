import {Component, Input, OnInit} from '@angular/core';
import {SlideItem} from "../../../interfaces/slideItem.interface";
import {EventService} from "../../../services/event.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {

  @Input() item : SlideItem;
  isClicked : boolean;

  constructor(private eService: EventService, private router : Router) {
    this.isClicked = false;
    this.eService.clicked$.subscribe(
        (item : {object: MenuItemComponent, close: boolean}) => {
          if(item.object != this)
          {
            if(this.isClicked === true)
              this.isClicked = item.close;
          }
        }
    );
  }

  ngOnInit() {
  }

  onRouterClick(){

    let closeAll: boolean;

    closeAll = !this.isClicked;

    this.isClicked = closeAll;
    this.eService.clicked({
      object: this,
      close: !closeAll
    });
  }


}
