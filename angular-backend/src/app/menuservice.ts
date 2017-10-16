/**
 * Created by hernan on 16/10/2017.
 */
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import 'rxjs/Rx';

/**
 * Created by hernan on 16/10/2017.
 */

@Injectable()
export class MenuService {
    constructor(private http: Http)
    {

    }

    getMenu(){
        return this.http.get('http://lortom.dev/api/populate-slidebar')
            .map(
                (response: Response) => {
                    return response.json().menulista;
                }
            );
    }
}