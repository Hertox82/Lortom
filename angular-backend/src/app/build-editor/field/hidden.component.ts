import { OnInit, Input, Component, EventEmitter } from '@angular/core';
import { LTComponent } from '../abstract.component';
import { GenericField } from './genericField.component';

@Component({
    selector: 'hiddenfield',
    template: `
    <input type="hidden" name="{{name}}" [ngModel] = "data"
                placeholder="{{placeholder}}" id="{{name}}" readonly>`,
    styleUrls: []
})
export class HiddenComponent extends GenericField implements OnInit, LTComponent {
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

    editData(data: any) {
        this.data = data;
    }

    eraseData() {
        this.data = '';
    }
}
