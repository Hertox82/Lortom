import {Component, OnInit, Input} from '@angular/core';
import {MenuService} from '../../../menuservice';
import {EventService} from '../../../../services/event.service';
import {User} from '../user-model/user.interface';

@Component({
    selector : 'app-user-side',
    templateUrl : './user-side.component.html',
    styles : ['']
})
export class UserSideComponent implements OnInit {
    @Input() user: any;

    constructor( private mService: MenuService, private eService: EventService) {
    }
    ngOnInit () {
        if (!this.user) {
            this.user = this.mService.getUser();
        }

        this.eService.user$.subscribe(
            (data: User ) => {
                this.user = this.mService.getUser();
            }
        );
    }
}
