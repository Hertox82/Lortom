import { NgModule } from '@angular/core';


import { SC } from './sc';
import { uiComponent } from './ui.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UIElementModule } from '../backend-module/UIElement/uielement.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { UIService } from './service/ui.service';
import { KeysPipe, KeysNoParamsPipe } from './service/pipe/keys.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LtCodemirrorModule } from 'lt-codemirror';
import { FileManagerModule } from '../backend-module/file-manager/filemanager.module';

@NgModule({
  imports:      [ CommonModule, FormsModule, FileManagerModule ,
    RouterModule, UIElementModule, EditorModule,
    LtCodemirrorModule , ReactiveFormsModule, NgbModule ],
  declarations: [ uiComponent, KeysPipe, KeysNoParamsPipe ],
  exports: [ uiComponent, KeysPipe, KeysNoParamsPipe ],
  providers: [ SC, UIService ]
})
export class BuildEditorModule { }
