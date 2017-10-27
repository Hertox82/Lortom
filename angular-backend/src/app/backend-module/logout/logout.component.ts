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
                if(localStorage.getItem('user'))
                {
                    localStorage.removeItem('user');
                }
                this.eService.logged(false);
                this.eService.clicked({
                    object: null,
                    close: false
                })
                this.router.navigate(['/backend/login']);
            }
        )
    }
    ngOnInit() {}
}