import { OnInit, EventEmitter, Input, Component } from '@angular/core';
import { LTComponent } from '../abstract.component';
import { GenericField } from './genericField.component';

@Component({
    selector: 'selectfield',
    template: `
    <div class="col-12">
        <div class="form-group flex-group">
            <label for="state" class="col-md-2 control-label">{{label}}</label>
            <div class="col-md-8">
                <select class="form-control" name="{{name}}"  id="{{name}}"
                *ngIf="isEdit === false; else editSelect"
                [ngModel] = "data" [compareWith] = "compareData" disabled>
                    <ng-container>
                        <option *ngFor="let x of options" [ngValue]="x" [attr.selected] = "x == data ? true : null"
                        [innerHTML]="x.name"></option>
                    </ng-container>
                </select>
                <ng-template #editSelect>
                    <select class="form-control" name="{{name}}" [(ngModel)] = "data"
                    (ngModelChange) = "sendChange($event)"
                    [compareWith] = "compareData">
                        <option *ngFor="let x of options" [ngValue]="x" [attr.selected] = "x == data ? true : null"
                        [innerHTML]="x.name"></option>
                    </select>
                </ng-template>
            </div>
        </div>
    </div>
    `,
    styleUrls: []
})
export class SelectComponent  extends GenericField implements OnInit, LTComponent {
    @Input() options: any[] = [];
    @Input() data: any = {id: 0, name: ''};
    copyData: any;
    index: number;
    send: EventEmitter<any> = new EventEmitter<any>();
    constructor() {
        super();
        this.data = { id: 0, name: ''};
        this.options = [];
    }
    ngOnInit() {}
    setData(data: any): void {
        this.setGenericData(data);
        this.options = data.options;
        let check = false;

        if (typeof data.data === 'number') {
            if (data.data > 0) {
                check = true;
            }
        } else if (typeof data.data === 'string') {
            if (data.data.length > 0) {
                check = true;
            }
        }

        if (check) {
            let item = {};
            for (let i = 0; i < this.options.length; i++) {
                if (this.options[i].id === data.data) {
                    item = this.options[i];
                }
            }
            this.data = item;
            this.copyData = item;
        } else {
            this.copyData = data.data;
        }
    }
    getData(): any {
        if (this.data != undefined) {
            return {
                id: this.name,
                data: this.data
            };
        } else {
            return null;
        }
    }
    resetData(): void {
        this.data = this.copyData;
    }
    compareData(a: any, b: any): boolean {
        if (a == null || b == null) {
            return false;
        }
        return a.id === b.id;
     }

     editData(data: any) {
         this.data = data;
     }

     sendChange(event) {
         this.send.emit(event);
     }
}
