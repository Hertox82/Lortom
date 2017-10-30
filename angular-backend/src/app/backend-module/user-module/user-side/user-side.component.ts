

import {Component, OnInit, Input} from "@angular/core";
import {MenuService} from "../../../menuservice";

@Component({
    selector : 'app-user-side',
    templateUrl : './user-side.component.html',
    styleUrls : ['./user-side.component.css']
})
export class UserSideComponent implements OnInit
{
    @Input() user : any;

    constructor( private mService : MenuService) {
    }
    ngOnInit () {
        if(!this.user)
        {
            this.user = this.mService.getUser();
        }
    }
}
