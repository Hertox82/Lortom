import { MasterService } from '@Lortom/services/master.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class UIService extends MasterService {

    constructor(uihttp: HttpClient) {
        super(uihttp);
    }

    public post(path: string, data: any): Observable<any[]> {
        return this.storeItem<any>(data, this.apiManager.getUrl(path));
    }
}
