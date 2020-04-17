import { OnInit, Input, EventEmitter, Component } from '@angular/core';
import { LTComponent } from '../abstract.component';
import { UIService } from '../service/ui.service';
import { Subject } from 'rxjs/Subject';
import { GenericField } from './genericField.component';


@Component({
    selector: 'search-field',
    template: `
    <div class="col-12">
        <div class="form-group flex-group">
            <label for="state" class="col-md-2 control-label">{{label}}</label>
            <div class="col-md-8">
                <input type="text" class="form-control input-sm" [(ngModel)]="query" (keyup)="writing()" autocomplete="off">
                <div class="suggestions" *ngIf="filteredList.length > 0">
                    <ul>
                        <li class="suggestion-li" *ngFor="let item of filteredList">
                            <a (click)="addData(item)">{{item.label}}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    `
})
export class SearchFieldComponent extends GenericField implements OnInit, LTComponent {
    @Input() keys: any[];
    _querySub = new Subject();
    queryObj = this._querySub.asObservable();
    copyData: any;
    index: number;
    query = '';
    route: string;
    filteredList: any[];
    print: any[];
    idModel: number;
    send: EventEmitter<any> = new EventEmitter<any>();

    constructor(private seUIServ: UIService) {
        super();
        this.idModel = 0;
    }

    setData(data: any) {
        this.setGenericData(data);
        this.keys = data.keys;
        this.route = data.route;
        this.filteredList = [];
        this.print = data.print;
    }

    setIdObject(id: number) {
        this.idModel = id;
        console.log(this.idModel);
    }
    getData() {}
    resetData() {}
    ngOnInit() {
        this.queryObj
        .debounceTime(200)
        .distinctUntilChanged()
        .switchMap((query: any) => this.seUIServ.post(this.route, {search: query, idObject: this.idModel})
        ).subscribe(
            (result) => {
                this.filteredList = result;
            }
        );
    }

    writing() {
        if (this.query.length > 0) {
            this._querySub.next(this.query);
        } else {
            this.filteredList = [];
        }
    }

    addData(item: any) {
        this.filteredList = [];
        this.query = '';
        this.send.next(item);
    }
}
