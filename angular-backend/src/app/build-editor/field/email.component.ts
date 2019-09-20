import { OnInit, Input, Component, EventEmitter } from '@angular/core';
import { LTComponent } from '../abstract.component';
import { GenericField } from './genericField.component';

@Component({
    selector: 'emailfield',
    template: `
    <div class="col-12">
        <div class="form-group flex-group">
            <label for="nome" class="col-md-2 control-label">{{label}}</label>
            <div class="col-md-8">
                <input type="email" class="form-control" name="{{name}}" [ngModel] = "data"
                placeholder="{{placeholder}}" id="{{name}}" *ngIf="isEdit === false; else editEmail" readonly>
            <ng-template #editEmail>
                <input type="email" class="form-control" name="{{name}}"
                placeholder="{{placeholder}}" id="{{name}}" [(ngModel)] = "data" (keyup)= "bindData()">
            </ng-template>
            </div>
        </div>
    </div>`,
    styleUrls: []
})
export class EmailComponent extends GenericField implements OnInit, LTComponent {
    @Input() data: string;
    copyData: string;
    index: number;
    send: EventEmitter<any> = new EventEmitter<any>();

    ngOnInit() {}

    setData(data: any) {
        this.data = data.data;
        this.copyData = data.data;
        this.setGenericData(data);
    }

    getData() {
        const obj = {
            id: this.name,
            data: this.data
        };
        return obj;
    }

    resetData() {
        this.data = this.copyData;
    }

    bindData() {
        this.send.next(this.data);
    }

    eraseData() {
        this.data = '';
    }
}
