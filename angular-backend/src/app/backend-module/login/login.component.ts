import {OnInit, Component, Input} from '@angular/core';
import {EventService} from '@Lortom/services/event.service';
import {Router} from '@angular/router';
import { AuthService } from '@Lortom/app/auth-module/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    @Input() username: string;
    @Input() password: string;
    error: string;

    constructor(private auth: AuthService, private event: EventService, private router: Router) {}

    ngOnInit() {}

    onSubmit() {
            this.auth.attemptLogin({username: this.username, password: this.password})
                .subscribe(
                    (data: { error?: string, token?: string, user?: any }) => {
                        if (data.error) {
                            this.error = data.error;
                        } else {
                            this.event.logged(true);
                            // this.service.setUser(data.user);
                            this.event.userCreated(data.user);
                            this.router.navigate(['/backend']);
                        }
                    }
                );
    }
}
