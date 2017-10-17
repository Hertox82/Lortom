/**
 * Created by hernan on 16/10/2017.
 */
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import 'rxjs/Rx';
import {Route} from "@angular/router";
import {Subject} from "rxjs/Subject";

@Injectable()
export class MenuService {

    private helpRoute = new Subject<Route>();

    helpRoute$ = this.helpRoute.asObservable();

    constructor(private http: Http)
    {

    }

    getMenu(){
        return this.http.get('http://lortom.dev/api/populate-slidebar')
            .map(
                (response: Response) => {
                    return response.json();
                }
            );
    }

    sendData(routes :Route[])
    {
        this.helpRoute.next(routes);
    }
}