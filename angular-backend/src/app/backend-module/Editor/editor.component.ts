

import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output} from "@angular/core";
import 'tinymce';
import 'tinymce/themes/modern';
import 'tinymce/plugins/table';
import 'tinymce/plugins/link';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/code';
import 'tinymce/plugins/image';
import 'tinymce/plugins/imagetools';

@Component({
    selector : 'app-editor',
    template : '<textarea id="{{elementId}}" style="display: none;"></textarea>'
})
export class EditorComponent implements AfterViewInit, OnDestroy
{
    @Input() elementId: string;
    @Input() content : string;
    @Output() onEditorKeyup = new EventEmitter<any>();

    editor;

    ngAfterViewInit()
    {
        tinymce.init({
            selector: '#'+this.elementId,
            plugins : ['link','paste','table', 'code','image','imagetools'],
            skin_url: '../../../js/assets/skins/lightgray',
            setup : editor => {
                this.editor = editor;

                editor.on('keyup', ()=> {
                    const content = editor.getContent();
                    this.onEditorKeyup.emit(content);
                });
            },
            init_instance_callback : inst => {
              inst.setContent(this.content);
            },
        });
    }

    ngOnDestroy(){
        tinymce.remove(this.editor);
    }
}