import {OnInit, Component, Input} from "@angular/core";
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
    constructor() {}

    ngOnInit() {}

    onSubmit()
    {
        console.log(this.username);
        console.log(this.password);
    }
}