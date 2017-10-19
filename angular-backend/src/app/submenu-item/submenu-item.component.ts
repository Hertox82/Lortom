
import {Component, Input, OnInit} from "@angular/core";
import {SlideSubMenu} from "../../interfaces/slideItem.interface";

@Component({
    selector : 'app-submenu-item',
    templateUrl : './submenu-item.component.html'
})

export class SubMenuItemComponent implements OnInit
{
    @Input() item : SlideSubMenu;

    constructor(){

    }
    ngOnInit(){

    }
}
