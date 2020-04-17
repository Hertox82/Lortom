import { OnInit, EventEmitter, Input, Component, ViewChild } from '@angular/core';
import { LTComponent } from '../abstract.component';
import { EditorComponent } from '@Lortom/app/backend-module';
import { GenericField } from './genericField.component';

@Component({
    selector: 'tinymcefield',
    template: `
    <div class="col-12">
        <div class="form-group flex-group">
            <label for="{{appEditorId}}" class="col-md-2 control-label">{{label}}</label>
            <div class="col-md-10">
                <app-editor [elementId]="appEditorId" id="{{appEditorId}}" [content]="data"  [isEditable]="isEdit"></app-editor>
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
    @ViewChild(EditorComponent) editor: EditorComponent;
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
        this.data = this.editor.getContent();
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
