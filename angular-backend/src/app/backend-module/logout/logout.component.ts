import {OnInit,Component} from "@angular/core";
import {MenuService} from "../../menuservice";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {EventService} from "../../../services/event.service";
/**
 * Created by hernan on 26/10/2017.
 */

@Component({
    selector: 'app-logout',
    template : '',
    styles : [''],
})
export class LogoutComponent implements OnInit
{
    constructor(private menuService : MenuService, private router : Router, private eService : EventService)
    {
        this.menuService.logout().subscribe(
            (data : Observable<any>) => {
                this.eService.logged(false);
                this.router.navigate(['/backend/login']);
            }
        )
    }
    ngOnInit() {}
}