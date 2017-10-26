/**
 * Created by hernan on 20/10/2017.
 */

import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";

@Injectable()
export class EventService {

    private _clicked = new Subject();
    clicked$ = this._clicked.asObservable();

    private _logged = new Subject();
    logged$ = this._logged.asObservable();

    private _user = new Subject();
    user$ = this._user.asObservable();

    clicked(object) {
        this._clicked.next(object);
    }

    logged(object){
        this._logged.next(object);
    }

    user(object){
        this._user.next(object);
    }
}