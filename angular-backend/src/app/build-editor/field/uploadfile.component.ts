import { GenericField } from './genericField.component';
import { OnInit, Input, EventEmitter, Component } from '@angular/core';
import { LTComponent } from '../abstract.component';


@Component({
    selector: 'upload-file',
    templateUrl: './uploadfile.component.html',
    styleUrls: []
})
export class UploadFileComponent extends GenericField implements OnInit, LTComponent {
    @Input() data: string;
    copyData: string;
    index: number;
    send: EventEmitter<any> = new EventEmitter<any>();
    saveButton: string;
    urlToSave: string;
    dataFile: File;

    ngOnInit() {}

    setData(data: any) {
        this.setGenericData(data);
        this.saveButton = data.saveButton;
        this.urlToSave = data.urlToSave;
    }

    onFileChanged(event) {
        event.preventDefault();
        this.dataFile = event.target.files[0];
        this.label = this.dataFile.name;
    }

    load() {
        const service = this.cManager['varNameService'];
        this.cManager[service].loadOnServer(this.urlToSave, {id: this.name, data: this.dataFile });
    }

    getData() {
        if (this.dataFile != undefined) {
            return {
                id: this.name,
                data: this.dataFile
            };
        } else {
            return null;
        }
    }

    resetData() {}

    bindData() {}

    eraseData() {}
}
