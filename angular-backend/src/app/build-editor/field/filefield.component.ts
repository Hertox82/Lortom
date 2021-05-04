import { GenericField } from './genericField.component';
import { OnInit, Input, EventEmitter, Component, ViewChild } from '@angular/core';
import { LTComponent } from '../abstract.component';
import { FileManagerComponent } from '@Lortom/app/backend-module/file-manager/filemanager.component';



@Component({
    // tslint:disable-next-line:component-selector
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
    @ViewChild(FileManagerComponent, {static: false}) fileMan: FileManagerComponent;

    ngOnInit() {}

    setData(data: any) {
        this.setGenericData(data);
        this.idObj = data.idObj;
        this.obj = data.obj;
    }

    getData() {}

    resetData() {}

    bindData() {}

    eraseData() {}

    saveFileObject(idFile: any) {
        this.fileMan.saveFileObject(idFile);
    }
}
