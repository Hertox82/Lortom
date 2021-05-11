import { OnInit, EventEmitter, Input, Component, ViewChild } from '@angular/core';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { LTComponent } from '../abstract.component';
import { GenericField } from './genericField.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'tinymcefield',
    template: `
    <div class="col-12">
        <div class="form-group flex-group">
            <label for="{{appEditorId}}" class="col-md-2 control-label">{{label}}</label>
            <div class="col-md-10">
                <editor
                [init]="{
                        height: 500,
                        menubar: true,
                        skin: 'oxide-dark',
                        content_css: 'default',
                        plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar:
                        'undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help'
                    }"
                [apiKey]= apiKey
                [(ngModel)] = "data"
                [disabled] = !isEdit
                ></editor>
            </div>
        </div>
    </div>
    `,
    styleUrls: []
})
export class TinyMceComponent extends GenericField implements OnInit, LTComponent {
    index: number;
    send: EventEmitter<any> = new EventEmitter();
    appEditorId  = 'edit-page';
    apiKey = 'no-api-key';
    @ViewChild(EditorComponent, {static: false}) editor: EditorComponent;
    @Input() data: any = '';
    copyData: any;
    ngOnInit() {}
    setData(data: any): void {
        this.setGenericData(data);
        this.data = (data.data) ? data.data : '';
        this.copyData = data.data;
        this.appEditorId = this.appEditorId + '-' + this.name;
    }
    getData(): any {
        // this.data = this.editor.getContent();
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
}
