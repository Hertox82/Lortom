

import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import 'tinymce';
import 'tinymce/themes/modern';
import 'tinymce/plugins/table';
import 'tinymce/plugins/link';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/code';
import 'tinymce/plugins/image';
import 'tinymce/plugins/imagetools';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/textcolor';
import 'tinymce/plugins/media';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/colorpicker';

declare var tinymce: any;

@Component({
    selector : 'app-editor',
    template : '<textarea id="{{elementId}}" style="display: none;"></textarea>'
})
export class EditorComponent implements AfterViewInit, OnDestroy {
    @Input() elementId: string;
    @Input() content: string;
    @Input() isEditable: boolean;
    @Output() onEditorKeyup = new EventEmitter<any>();

    editor;

    ngAfterViewInit() {
        tinymce.init({
            selector: '#' + this.elementId,
            plugins : ['link', 'paste', 'table', 'code', 'image', 'imagetools',
            'advlist', 'lists', 'visualblocks', 'textcolor', 'media', 'colorpicker'],
            skin_url: '../../../js/assets/skins/lightgray',
            toolbar1: 'formatselect | bold italic strikethrough forecolor backcolor | link  image | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
            height: 650,
            setup : editor => {
                this.editor = editor;
                /*editor.on('keyup', () => {
                    const content = editor.getContent();
                    this.onEditorKeyup.emit(content);
                });*/
            },
            init_instance_callback : inst => {
                if (this.content != null || this.content !== undefined) {
                    if (this.content.length > 0) {
                        inst.setContent(this.content);
                        this.editor.getBody().setAttribute('contenteditable', this.isEditable);
                    }
                }
            },
        });
    }

    ngOnDestroy() {
        tinymce.remove(this.editor);
    }

    public getContent() {
        return this.editor.getContent();
    }

    public readOnly(isWriteable: boolean) {
        this.editor.getBody().setAttribute('contenteditable', isWriteable);
    }
}
