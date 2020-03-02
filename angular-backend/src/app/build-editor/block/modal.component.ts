import { AbstractBlock } from './abstractblock.component';
import { OnInit, Component, Input, ViewChild, ViewContainerRef,
    ComponentFactoryResolver, Injector, Renderer2, ElementRef } from '@angular/core';
import { SC } from '../sc';
import { IComponentManager } from '../abstract.component';
import { SearchFieldComponent } from '../field';
import { UtilService } from '@Lortom/app/utilModule/util-service';


@Component({
    selector: 'modal-block',
    template: `
    <div class="modal-backdrop fade show" [ngStyle]="{'display':display}" ></div>
    <div id="{{idModal}}" class="modal fade" tabindex="-1" role="dialog" [attr.aria-labelledby]="idModal"  aria-hidden="true" 
    (click)="backDrop($event)" #modal>
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="modal-title">
                        {{title}}
                        <button class="close"  aria-label="hidden"
                        (click) ="closeButton()"><i class="fa fa-times"></i></button>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="row container" #vC>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="m-footer" style="padding:10px 10px 0px;">
                        <template #actionC></template>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
})
export class ModalBlockComponent extends AbstractBlock implements OnInit {
    @Input() title: string;
    @Input() idModal: string;
    @ViewChild('vC', {read: ViewContainerRef}) container: ViewContainerRef;
    @ViewChild('actionC', {read: ViewContainerRef}) actionContainer: ViewContainerRef;
    @ViewChild('modal') modal: ElementRef;
    private render: Renderer2;
    type: string;
    display: string;
    lastNumberInsert: number;
    tblKeyIndex: string;
    isInEditMode: boolean;

    constructor(modService: SC, modResolver: ComponentFactoryResolver, modInj: Injector, modUtService: UtilService) {
        super(modService, modResolver, modInj, modUtService);
        this.render = modInj.get(Renderer2);
        this.display = 'none';
        this.lastNumberInsert = 0;
        this.isInEditMode = false;
    }
    ngOnInit() {}

    setData(data: any, type: string) {
        this.title = data.title;
        this.idModal = data.idModal;
        this.type = type;
        this.tblKeyIndex = data.tblKeyIndex;
    }

    buildEdit(data: any[], cmManager: IComponentManager) {
        super.buildEdit(data, cmManager, this.container);
    }

    buildAction(data: any[], cmManager: IComponentManager) {
        super.buildAction(data, cmManager, this.actionContainer);
    }

    backDrop($event) {
        if (this.modal.nativeElement === $event.target) {
            this.dismissModal();
        }
    }

    closeButton() {
        this.dismissModal();
        this.listOfComponents.forEach((components) => {
            components.instance.resetData();
        });
    }

    openModal(notIterate = false)  {
        this.display = 'block';
        this.isInEditMode = notIterate;
        if (! notIterate) {
            this.lastNumberInsert = this.lastNumberInsert - 1;
            this.changeIdTblIndex(this.lastNumberInsert);
        }
        this.render.addClass(document.body, 'modal-open');
        this.render.setStyle(document.body, 'padding-right', '15px');
        this.render.addClass(this.modal.nativeElement, 'show');
        this.render.setStyle(this.modal.nativeElement, 'display', 'block');
        this.render.setStyle(this.modal.nativeElement, 'padding-right', '15px');
    }

    dismissModal(procedClose = false) {
        this.display = 'none';
        if (! this.isInEditMode && !procedClose) {
            this.lastNumberInsert++;
        }
        this.render.removeClass(document.body, 'modal-open');
        this.render.removeStyle(document.body, 'padding-right');
        this.render.removeClass(this.modal.nativeElement, 'show');
        this.render.removeStyle(this.modal.nativeElement, 'padding-right');
        this.render.removeStyle(this.modal.nativeElement, 'display');
    }

    getData() {
        return [];
    }

    sendDataToTable() {
        const list = [];

        this.listOfComponents.forEach((component) => {
            if (!(component.instance instanceof SearchFieldComponent)) {
                const data = component.instance.getData();
                if (data != null) {
                    list.push(data);
                }
            }
        });
        // list.shift();
        return list;
    }

    changeIdTblIndex(id: number) {
        this.listOfComponents.forEach((component) => {
            if  (component.instance.name !== undefined && component.instance.name === this.tblKeyIndex) {
                component.instance.editData(id);
            }
        });
    }

    ediData(data: any) {
        const keysName = Object.keys(data);
        this.listOfComponents.forEach((component) => {
            // da editare le singole righe
            keysName.forEach((key) => {
                if  (component.instance.name !== undefined && component.instance.name === key) {
                    if ( typeof component.instance.editData === 'function') {
                        component.instance.editData(data[key]);
                    } else {
                        console.log(component.instance.name);
                    }
                }
            });

        });
        this.openModal(true);
    }
}
