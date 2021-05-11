import { IBlock, IActionComponent, LTComponent, IComponentManager } from '../abstract.component';
import * as UIField from '../field';
import { ViewContainerRef, ComponentFactoryResolver, Injector, ComponentRef } from '@angular/core';
import { SC } from '../sc';
import * as UIAction from '../action';
import { UtilService } from '@Lortom/app/utilModule/util-service';




export class AbstractBlock implements IBlock {
listOfActions: IActionComponent[] = [];
listOfComponents: ComponentRef<LTComponent>[] = [];
listOfRawData: any[] = [];
type;

    constructor(protected stService: SC, protected abResolver: ComponentFactoryResolver, protected abInjector: Injector,
                protected abUtServ: UtilService) {
        this.stService
        .addComponent('text', UIField.TextComponent)
        .addComponent('email', UIField.EmailComponent)
        .addComponent('hidden', UIField.HiddenComponent)
        .addComponent('select', UIField.SelectComponent)
        .addComponent('tinymce', UIField.TinyMceComponent)
        .addComponent('chbxList', UIField.ChbxListComponent)
        .addComponent('number', UIField.NumberComponent)
        .addComponent('textarea', UIField.TextAreaComponent)
        .addComponent('search', UIField.SearchFieldComponent)
        .addComponent('tblfield', UIField.TableFieldComponent)
        .addComponent('date', UIField.DateComponent)
        .addComponent('filefld', UIField.FileFieldComponent)
        .addComponent('uplfile', UIField.UploadFileComponent)
        .addComponent('cdmirror', UIField.CodeMirrorComponent)
        .addComponent('media', UIField.MediaComponent)
        .addComponent('mediaSearch', UIField.MediaSearchComponent);

        this.stService
        .addAction('edit', UIAction.EditButtonComponent)
        .addAction('openMod', UIAction.AddModalComponent)
        .addAction('saveMod', UIAction.SaveModalComponent)
        .addAction('cleanBlock', UIAction.CleanBlockComponent)
        .addAction('readIng', UIAction.ReadIngredientsComponent);
    }

    /**
     * This function build the Field Component into the Block
     * @param data
     * @param cmManager
     */
    buildEdit(data: any[], cmManager: IComponentManager, container: ViewContainerRef): void {
        let i = 0;
        data.forEach((item) => {
            if (this.stService.hasComponent(item.type)) {
                if (item.data.initialized) {
                   this.initComponent(container, item, cmManager, i);
                   i++;
                }
            }
        });
        this.listOfRawData = data;
    }

    initComponent(container: ViewContainerRef, item: any, cmManager: IComponentManager, index = -1) {
        const component = this.createField(container, item, index);
        this.instantiateComponent(component, item, index, cmManager);
    }

    createField(container: ViewContainerRef, item: any, index: number) {
        const factory = this.abResolver.resolveComponentFactory(this.stService.getComponent(item.type));
        const componentRef = container.createComponent(factory, index, this.abInjector);
        return componentRef;
    }

    /**
     * This function add Component into the list of Component
     * @param component
     */
    addComponent(component: ComponentRef<LTComponent>) {
        this.listOfComponents.push(component);
    }

    /**
     * This function add Action into the list of Action
     * @param action
     */
    addAction(action: IActionComponent) {
        this.listOfActions.push(action);
    }

    /**
     * This component Init the Components inside the Block
     * @param component
     * @param item
     * @param i
     * @param cmManager
     */
    instantiateComponent(component: ComponentRef<LTComponent>, item: any, i: number, cmManager: IComponentManager) {
        const cmpin = component.instance;
        cmpin.index = i;
        cmpin.setData(item.data);
        cmpin.type = item.type;
        cmpin.setManager(cmManager);
        this.addComponent(component);
        const nameF = item.data.name + item.type.charAt(0).toUpperCase() + item.type.slice(1);
        if ((typeof cmManager[nameF] === 'function' && item.type === 'text') ||
        (typeof cmManager[nameF] === 'function' && item.type === 'search') ||
        (typeof cmManager[nameF] === 'function' && item.type === 'mediaSearch') ||
        (typeof cmManager[nameF] === 'function' && item.type === 'tblfield') ||
        (typeof cmManager[nameF] === 'function' && item.type === 'select')
        ) {
            cmManager.listOfSubscription.push(cmpin.send.subscribe((data) => {
            cmManager[nameF](data);
          }));
        } else {
            if ((item.type === 'search') || (item.type === 'tblfield')) {
                if (this.abUtServ.hasItem(nameF)) {
                    cmManager.listOfSubscription.push(cmpin.send.subscribe((data) => {
                        (async () => {
                            const m = await this.abUtServ.getClassFunction(nameF);
                            if (m !== null) {
                                m(cmManager, data);
                            }
                        })();
                    }));
                }
            }
        }
    }

    /**
     * This function set Data (now isn't implemented)
     * @param data
     */
    setData(data: any, type: string) {}

    getData(): any {
        const listOfData = [];

        this.listOfComponents.forEach((x) => {
            if (x.instance.getData() != null) {
                listOfData.push(x.instance.getData());
            }
        });

        return listOfData;
    }

    /**
     * This function build the Actions inside the Block
     * @param data
     * @param cmManager
     */
    buildAction(data: any[], cmManager: IComponentManager, actionContainer: ViewContainerRef) {
        let i = 0;
        data.forEach((item) => {
            if (this.stService.hasAction(item.type)) {
                const factory = this.abResolver.resolveComponentFactory(this.stService.getAction(item.type));
                const componentRef = actionContainer.createComponent(factory, i, this.abInjector);
                this.instantiateAction(componentRef.instance, item, cmManager);
                if (typeof componentRef.instance['setData'] === 'function') {
                    componentRef.instance.setData(item);
                }
                i++;
            }
        });
    }

    /**
     * This function instantiate the Actions (button) inside the Block
     * @param action
     * @param item
     * @param cmManager
     */
    instantiateAction(action: IActionComponent, item: any, cmManager: IComponentManager) {
        this.addAction(action);
        const nameF = item.name + item.type.charAt(0).toUpperCase() + item.type.slice(1);
        if (typeof cmManager[nameF] === 'function') {
            cmManager.listOfSubscription.push(
            action.action.subscribe(() => {
                cmManager[nameF]();
            }));
        } else {
            cmManager.listOfSubscription.push(
                action.action.subscribe(
                    () => {
                        (async () => {
                            const m = await this.abUtServ.getClassFunction(nameF);
                            if (m !== null) {
                                m(cmManager);
                            }
                })();
            }));
        }
    }
}
