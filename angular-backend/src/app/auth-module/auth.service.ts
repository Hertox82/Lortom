import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user.interface';
import { ApiManager } from '../urlApi/api.manager';
import { Encrypter } from '@Lortom/services/encrypter.service';

@Injectable()
export class AuthService {

    _currentUser: User;
    _urlManager: ApiManager;
    constructor(protected httpC: HttpClient) {
        this._currentUser = null;
        this._urlManager = new ApiManager();
    }

    attemptLogin(credentials: {username: string; password: string}): Observable<any> {
        const headers = new HttpHeaders({'Content-Type' : 'application/json' });
        const options = {headers: headers};
        return this.httpC.post(this._urlManager.getPathByName('login'), credentials, options)
        .pipe(
            map(
                response => {
                    this.createUser();
                    return response;
                }
            )
        );
    }

    logout(): Observable<any> {
        return this.httpC.get(this._urlManager.getPathByName('logout'))
        .pipe(
            map(
                response  => {
                    return response;
                }
            )
        );
    }

    /**
     * This function get the User from the Payload
     * @param list
     * @returns User
     */
    getUserFromPayload(list: string[]): User {
        if (this.checkIfJson(list[1])) {
            const payload = JSON.parse(list[1]);
            const user: User = {
                username: payload.sub,
                name: payload.name,
                permissions: payload.perm
            };

            return user;
        }

        return null;
    }

    checkIfJson(text: any) {
        try {
            JSON.parse(text);
        } catch (e) {
            return false;
        }

        return true;
    }

    /**
     * this function create the currentUser
     */
    createUser() {
        this._currentUser = this.getUserFromPayload(Encrypter.decode(this.getCookie('l_at')));
    }

    setUser(user: User) {
        this._currentUser = user;
    }

    /**
     * This function delete the currentUser
     */
    deleteUser() {
        this._currentUser = null;
    }

    /**
     * This function check if User has a permission
     * @param name
     * @returns boolean
     */
    hasPermission(name: string): boolean {
        if (this._currentUser == null) {
            this._currentUser = this.getUserFromPayload(Encrypter.decode(this.getCookie('l_at')));
        }
        if (this._currentUser) {
            for (let i = 0; i < this._currentUser.permissions.length; i++) {
                if (this._currentUser.permissions[i].name === name) {
                    return true;
                }
            }
        }
        return false;
    }

    getCookie(name: string) {
        const ca: Array<string> = document.cookie.split(';');
        const caLen: number = ca.length;
        const cookieName = `${name}=`;
        let c: string;

        for (let i = 0; i < caLen; i += 1) {
          c = ca[i].replace(/^\s+/g, '');
          if (c.indexOf(cookieName) == 0) {
            return c.substring(cookieName.length, c.length);
          }
        }
        return '';
    }

    isAuthenticated(): boolean {
        return (this.getCookie('l_at')) ? true : false;
    }
}
