import {OnInit, Component, Input, Output, EventEmitter} from "@angular/core";
import {MenuService} from "../../menuservice";
import {EventService} from "../../../services/event.service";
import {Router} from "@angular/router";
/**
 * Created by hernan on 23/10/2017.
 */

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit
{
    @Input() username : string;
    @Input() password : string;
    error : string;

    constructor(private service: MenuService, private event : EventService, private router : Router) {}

    ngOnInit() {}

    onSubmit() {
            this.service.login({username: this.username, password: this.password})
                .subscribe(
                    (data: { error?: string, token?: string, user?: any }) => {
                        if (data.error) {
                            console.log(data.error);
                            this.error = data.error;
                        }
                        else {

                            this.event.logged(true);
                            localStorage.setItem('l_t', data.token);
                            this.event.user(data.user);
                            this.router.navigate(['/backend']);
                        }
                    }
                );
    }
}