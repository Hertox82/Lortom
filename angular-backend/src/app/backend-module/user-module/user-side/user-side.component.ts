

import {Component, OnInit} from "@angular/core";
import {EventService}   from "../../../../services/event.service";

@Component({
    selector : 'app-user-side',
    templateUrl : './user-side.component.html',
    styleUrls : ['./user-side.component.css']
})
export class UserSideComponent implements OnInit
{
    user : {username : string, name : string};

    constructor(private eService : EventService) {
        this.eService.user$.subscribe(
            (data : {username:string, name:string}) => {
                this.user = data;
                console.log(this.user);
            }
        );
    }
    ngOnInit () {}
}
