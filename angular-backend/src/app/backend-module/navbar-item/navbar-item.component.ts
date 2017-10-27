import {Component, OnInit,Input} from "@angular/core";
import {NavbarItem} from "../../../interfaces/navbar.interface";
import {EventService} from "../../../services/event.service";


@Component({
    selector : 'app-navbar-item',
    templateUrl : './navbar-item.component.html',
    styleUrls : ['./navbar-item.component.css']
})
export class NavbarItemComponent implements OnInit{

    @Input() navbarItem : NavbarItem;
    isShow:boolean;
    isClicked:boolean;
    constructor(private eService : EventService){
        this.isShow = false;
        this.isClicked = false;
       this.eService.clicked$.subscribe(
           (item : {object:NavbarItemComponent, close: boolean, active: boolean}) => {
               if(item.object != this)
               {
                   this.isShow = item.close;
                   this.isClicked = item.active;
               }

               if(this.navbarItem.name == sessionStorage.getItem('navBarClicked'))
               {
                   this.isClicked = true;
               }
           }
       );
    }

    ngOnInit() {}

    show(event) {

        sessionStorage.removeItem('navBarClicked');
        sessionStorage.setItem('navBarClicked',event.target.className);
        this.isShow = true;
        this.isClicked = true;
        this.eService.clicked({
            object : this,
            close: false,
            active : false,
        });
    }
}