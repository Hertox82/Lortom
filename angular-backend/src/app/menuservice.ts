/**
 * Created by hernan on 16/10/2017.
 */
import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {ApiManager} from './urlApi/api.manager';
import {User} from './backend-module/user-module/user-model/user.interface';

@Injectable()
export class MenuService {

    urlManager: ApiManager;

    user: User;
    constructor(private http: HttpClient) {
        this.user = null;
        this.urlManager = new ApiManager();
    }

    getMenu(): Observable<any> {
        return this.http.get(this.urlManager.getPathByName('getMenu'));
    }

    login(credential: {username: string, password: string}): Observable<any> {
        const headers = new HttpHeaders({'Content-Type' : 'application/json'});
        const options =  { headers: headers};
        return this.http.post(this.urlManager.getPathByName('login'), credential, options);
    }

    logout(): Observable<any> {
        return this.http.get(this.urlManager.getPathByName('logout'))
            .map(
                response  => {
                    return response;
                }
            );
    }

    editMyProfile(user: User): Observable<any> {
        const headers = new HttpHeaders({'Content-Type' : 'application/json'});
        const options =  { headers: headers};
        return this.http.put(this.urlManager.getPathByName('editMyProfile'), user, options)
            .map(
                response => {
                    return response;
                }
            );
    }

    setUser(user: User): void {
        this.user = user;
        sessionStorage.setItem('user', JSON.stringify(user));
    }

    getUser(): User {
        if (this.user == null) {
            this.user = JSON.parse(sessionStorage.getItem('user'));
        }

        return this.user;
    }

    hasPermissions(name: string): boolean {
        if (this.user == null) {
            this.user = JSON.parse(sessionStorage.getItem('user'));
        }
        if (this.user) {
            for (let i = 0; i < this.user.permissions.length; i++) {
                if (this.user.permissions[i].name === name) {
                    return true;
                }
            }
        }
        return false;
    }

    deleteUser(): void {
        sessionStorage.removeItem('user');
    }
}
