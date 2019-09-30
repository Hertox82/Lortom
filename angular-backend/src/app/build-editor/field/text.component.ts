import { OnInit, Input, Component, EventEmitter } from '@angular/core';
import { LTComponent } from '../abstract.component';
import { GenericField } from './genericField.component';

@Component({
    selector: 'textfield',
    template: `
    <div class="col-12">
        <div class="form-group flex-group">
            <label for="nome" class="col-md-2 control-label">{{label}}</label>
            <div class="col-md-8">
                <input type="text" class="form-control" name="{{name}}" [ngModel] = "data"
                placeholder="{{placeholder}}" id="{{name}}" *ngIf="isEdit === false; else editText" readonly>
            <ng-template #editText>
                <input type="text" class="form-control" name="{{name}}"
                placeholder="{{placeholder}}" id="{{name}}" [(ngModel)] = "data" (keyup)= "bindData()">
            </ng-template>
            </div>
        </div>
    </div>`,
    styleUrls: []
})
export class TextComponent extends GenericField implements OnInit, LTComponent {
    @Input() data: string;
    copyData: string;
    index: number;
    send: EventEmitter<any> = new EventEmitter<any>();

    ngOnInit() {}

    setData(data: any) {
        this.setGenericData(data);
        this.data = data.data;
        this.copyData = data.data;
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

    resetData() {
        this.data = this.copyData;
    }

    bindData() {
        this.send.next(this.data);
    }

    editData(data) {
        this.data = data;
    }
    
    eraseData() {
        this.data = '';
    }
}
