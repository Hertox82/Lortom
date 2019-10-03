import { OnInit, EventEmitter, Input, Component, ViewChild } from '@angular/core';
import { LTComponent } from '../abstract.component';
import { EditorComponent } from '@Lortom/app/backend-module';
import { GenericField } from './genericField.component';

@Component({
    selector: 'cdmirror-field',
    template: `
    <div class="col-12">
        <div class="form-group flex-group">
            <label for="appearance" class="col-md-2 control-label">{{label}}</label>
            <div class="col-md-10">
                <codemirror
                class="" name="appearance" id="appearance"
                    [(ngModel)] = "data"
                    [config]="config"
                    [size]="size"
                ></codemirror>
            </div>
        </div>
    </div>
    `,
    styleUrls: []
})
export class CodeMirrorComponent extends GenericField implements OnInit, LTComponent {
    index: number;
    send: EventEmitter<any> = new EventEmitter();
    config: any;
    size: {w: string|number, h: string|number };
    @ViewChild(EditorComponent) editor: EditorComponent;
    @Input() data: any;
    copyData: any;
    ngOnInit() {}
    setData(data: any): void {
        this.setGenericData(data);
        this.data = data.data;
        this.copyData = data.data;
        this.config = {
            lineNumbers: true,
            mode : 'htmlmixed',
            styleActiveLine: true,
            matchBrackets: true,
            theme: 'dracula'
        };
        this.size = {
            w: '100%',
            h: 477
        };
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
