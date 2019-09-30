import { LTComponent } from '../abstract.component';
import { OnInit, EventEmitter, Input, Component } from '@angular/core';
import { GenericField } from './genericField.component';


@Component({
    selector: 'numberfield',
    template: `
    <div class="col-12">
        <div class="form-group flex-group">
            <label for="nome" class="col-md-2 control-label">{{label}}</label>
            <div class="col-md-8">
                <input type="number" class="form-control" name="{{name}}" [ngModel] = "data" step="0.01"
                placeholder="{{placeholder}}" id="{{name}}" *ngIf="isEdit === false; else editEmail" readonly>
            <ng-template #editEmail>
                <input type="number" class="form-control" name="{{name}}" step ="{{step}}"
                placeholder="{{placeholder}}" id="{{name}}" [(ngModel)] = "data" (keyup)= "bindData()">
            </ng-template>
            </div>
        </div>
    </div>
    `,
    styleUrls: []
})
export class NumberComponent extends GenericField implements OnInit, LTComponent {
    @Input() data: string;
    @Input() step: number;
    copyData: string;

    index: number;
    send: EventEmitter<any> = new EventEmitter<any>();
    ngOnInit() {}

    setData(data: any) {
        this.data = data.data;
        this.copyData = data.data;
        this.step = data.step;
        this.setGenericData(data);
    }

    getData() {
        if (this.data != undefined) {
            return {
                id: this.name,
                data: this.data
            };
        } else {
            return null;
        }
    }

    resetData() {}

    bindData() {}

    editData(data: any) {
        this.data = data;
        this.copyData = data;
    }

    eraseData() {
        this.data = '';
    }
}
