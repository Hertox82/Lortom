import {Component, OnInit,Input} from "@angular/core";
import {NavbarItem} from "../../interfaces/navbar.interface";
import {EventService} from "../../services/event.service";
/**
 * Created by hernan on 26/10/2017.
 */

@Component({
    selector : 'app-navbar-item',
    templateUrl : './navbar-item.component.html',
    styleUrls : ['./navbar-item.component.css']
})
export class NavbarItemComponent implements OnInit{

    @Input() navbarItem : NavbarItem;
    isShow:boolean;
    constructor(private eService : EventService) {
        this.isShow = false;
       this.eService.clicked$.subscribe(
           (item : {object:NavbarItemComponent, close: boolean}) => {
               if(item.object != this)
               {
                   this.isShow = item.close;
               }
           }
       );
    }

    ngOnInit() {}

    show() {
        this.isShow = true;
        this.eService.clicked({
            object : this,
            close: false
        });
    }
}