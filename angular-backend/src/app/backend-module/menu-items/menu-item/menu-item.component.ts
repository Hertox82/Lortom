import {Component, Input, OnInit} from '@angular/core';
import {SlideItem, SlideSubMenu} from '@Lortom/interfaces/slideItem.interface';
import {EventService} from '@Lortom/services/event.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styles: ['']
})
export class MenuItemComponent implements OnInit {

  @Input() item: SlideItem;
  isClicked: boolean;

  constructor(private eService: EventService, private router: Router) {
    this.isClicked = false;
    this.eService.clicked$.subscribe(
        (item: {object: MenuItemComponent, close: boolean}) => {
          if (item.object != this) {
            if (this.isClicked === true) {
              this.isClicked = item.close;
            }
          }
        }
    );

    this.eService._subMenu$.subscribe(
        (item: SlideSubMenu) => {
          this.item.subMenu.forEach(
              (subItem: SlideSubMenu) => {
                  if (item === subItem) {
                    this.eService.clicked({
                      object : this,
                      close : false,
                    });
                  }
              }
          );
        }
    );
  }

  ngOnInit() {}

  onRouterClick() {

    let closeAll: boolean;
    closeAll = !this.isClicked;
    this.isClicked = closeAll;
    this.eService.clicked({
      object: this,
      close: !closeAll
    });
  }

  checkUrlRouter() {
    const substring = this.item.href;
    const count = substring.length;
    return (this.router.url.substring(0, count) !== substring);
  }
}
