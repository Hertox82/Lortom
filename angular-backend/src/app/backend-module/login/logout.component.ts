import {OnInit, Component} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { AuthService } from '@Lortom/app/auth-module/auth.service';
import { EventService } from '@Lortom/services/event.service';

@Component({
    selector: 'app-logout',
    template : '',
    styles : [''],
})

export class LogoutComponent implements OnInit {
    constructor(private autSer: AuthService, private router: Router, private eService: EventService) {
        this.autSer.logout().subscribe(
            (data: Observable<any>) => {
                this.eService.logged(false);
                this.eService.clicked({
                    object: null,
                    close: false
                });
                this.router.navigate(['/backend/login']);
            }
        );
    }
    ngOnInit() {}
}
