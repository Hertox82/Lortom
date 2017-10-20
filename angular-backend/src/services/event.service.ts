/**
 * Created by hernan on 20/10/2017.
 */

import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";

@Injectable()
export class EventService {

    private _clicked = new Subject();
    clicked$ = this._clicked.asObservable();

    clicked(object) {
        this._clicked.next(object);
    }
}