import {Injectable } from '@angular/core';
import {ApiManager} from '@Lortom/app/urlApi/api.manager';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class FileManagerService {

    urlManager: ApiManager;

    constructor(private hp:  HttpClient) {

        this.urlManager = new ApiManager();
    }

    getFiles(): Observable<any> {
       return null;
    }
}
