import { GenericField } from './genericField.component';
import { OnInit, Input, EventEmitter, Component } from '@angular/core';
import { LTComponent } from '../abstract.component';



@Component({
    selector: 'filefield',
    template: `
        <div class="col-sm-12">
            <app-filemanager
            [sObj]= obj
            [nIdObj]= idObj
            >
            </app-filemanager>
        </div>
    `
})
export class FileFieldComponent extends GenericField implements OnInit, LTComponent {
    @Input() data: string;
    copyData: string;
    index: number;
    send: EventEmitter<any> = new EventEmitter<any>();
    obj: string;
    idObj: number;

    ngOnInit() {}

    setData(data: any) {
        this.setGenericData(data);
        this.idObj = data.idObj;
        this.obj = data.obj;
    }

    getData() {

    }

    resetData() {

    }

    bindData() {

    }

    eraseData() {}
}
