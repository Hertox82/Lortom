
import {Component, Input, OnInit} from "@angular/core";
import {SlideSubMenu} from "../../../interfaces/slideItem.interface";
import {EventService} from "../../../services/event.service";

@Component({
    selector : 'app-submenu-item',
    templateUrl : './submenu-item.component.html'
})

export class SubMenuItemComponent implements OnInit
{
    @Input() item : SlideSubMenu;

    constructor(private eService : EventService){

    }
    ngOnInit(){

    }


    send(event,item)
    {
        this.eService.emitEventSubMenu(item);
    }
}
