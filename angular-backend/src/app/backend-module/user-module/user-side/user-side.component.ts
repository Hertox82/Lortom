

import {Component, OnInit, Input} from "@angular/core";

@Component({
    selector : 'app-user-side',
    templateUrl : './user-side.component.html',
    styleUrls : ['./user-side.component.css']
})
export class UserSideComponent implements OnInit
{
    @Input() user : any;

    constructor() {
    }
    ngOnInit () {
        if(!this.user)
        {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
    }
}
