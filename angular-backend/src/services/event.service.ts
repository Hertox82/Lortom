/**
 * Created by hernan on 20/10/2017.
 */

import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EventService {

    private _clicked = new Subject();
    clicked$ = this._clicked.asObservable();

    private _logged = new Subject();
    logged$ = this._logged.asObservable();

    private _user = new Subject();
    user$ = this._user.asObservable();

    private _subMenu = new Subject();
    _subMenu$ = this._subMenu.asObservable();

    clicked(object) {
        this._clicked.next(object);
    }

    logged(object) {
        this._logged.next(object);
    }

    userCreated(object) {
        this._user.next(object);
    }

    emitEventSubMenu(object) {
        this._subMenu.next(object);
    }

    getAuthenticate(): Observable<any> {
        return this._logged.asObservable();
    }

    retriveUser(): Observable<any> {
        return this._user.asObservable();
    }
}
