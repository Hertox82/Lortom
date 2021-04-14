import { NavTabListComponent } from './tablist/component/navlist.component';
import { RoutingActionComponent } from './tablist/actions/routing.action.component';
import { EventActionComponent } from './tablist/actions/event.action.component';
import { TabListComponent } from './tablist/component/tablist.component';
import { BuildEditorComponent } from './buildeditor.component';
import * as UIField from './field';
import * as UIBlock from './block';
import * as UIAction from './action';


export const uiComponent = [
    UIField.TextComponent,
    UIField.HiddenComponent,
    UIField.EmailComponent,
    UIBlock.BlockComponent,
    UIAction.EditButtonComponent,
    NavTabListComponent,
    RoutingActionComponent,
    EventActionComponent,
    TabListComponent,
    BuildEditorComponent,
    UIField.SelectComponent,
    UIField.TinyMceComponent,
    UIBlock.CbListComponent,
    UIField.ChbxListComponent,
    UIField.NumberComponent,
    UIField.TextAreaComponent,
    UIBlock.TableBlockComponent,
    UIField.SearchFieldComponent,
    UIBlock.ModalBlockComponent,
    UIField.TableFieldComponent,
    UIAction.AddModalComponent,
    UIAction.SaveModalComponent,
    UIField.DateComponent,
    UIAction.CleanBlockComponent,
    UIBlock.FileBlockComponent,
    UIField.FileFieldComponent,
    UIField.UploadFileComponent,
    UIField.CodeMirrorComponent,
    UIAction.ReadIngredientsComponent,
    UIField.MediaComponent,
    UIField.MediaSearchComponent
];
