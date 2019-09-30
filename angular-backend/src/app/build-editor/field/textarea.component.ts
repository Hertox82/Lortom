import { OnInit, EventEmitter, Input, Component } from '@angular/core';
import { LTComponent } from '../abstract.component';
import { GenericField } from './genericField.component';


@Component({
    selector: 'textareafield',
    template: `
        <div class="col-12">
            <div class="form-group flex-group">
            <label for="nome" class="col-md-2 control-label">{{label}}</label>
            <div class="col-md-10">
                <textarea [(ngModel)] = "data" (keyup)="bindData()"
                class="form-control" name="{{name}}" id="{{name}}" style="height: 342px;"
                *ngIf="isEdit === false; else editTextArea" readonly >
                </textarea>
            <ng-template #editTextArea>
                <textarea [(ngModel)] = "data" (keyup)="bindData()"
                class="form-control" name="{{name}}" id="{{name}}" style="height: 342px;">
                </textarea>
            </ng-template>
            </div>
        </div>
    `,
    styleUrls: []
})
export class TextAreaComponent extends GenericField implements OnInit, LTComponent {
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
}
