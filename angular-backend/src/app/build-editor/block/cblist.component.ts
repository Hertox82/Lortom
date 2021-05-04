import { AbstractBlock } from './abstractblock.component';
import { Input, ViewChild, ViewContainerRef, Component, ComponentFactoryResolver, Injector } from '@angular/core';
import { SC } from '../sc';
import { IComponentManager } from '../abstract.component';
import { UtilService } from '@Lortom/app/utilModule/util-service';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'cblist-block',
    template: `
    <div class="portlet">
        <div class="portlet-title">
            <div class="caption">
                <i class="{{icons}}"></i>
                <span>{{label}}</span>
            </div>
            <div class="actions">
            </div>
         </div>
        <div class="portlet-body">
            <div class="portlet-form-body">
                <div class="container">
                    <div class="row" #vCcb>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    styleUrls: []
})
export class CbListComponent extends AbstractBlock {
    @Input() label: string;
    @Input() icons: string;
    type: string;
    @ViewChild('vCcb', {static: true, read: ViewContainerRef}) container: ViewContainerRef;
    isEdit: boolean;

    constructor(bsService: SC, bResolver: ComponentFactoryResolver, bInj: Injector, cbUtSer: UtilService) {
        super(bsService, bResolver, bInj, cbUtSer);
     }

    editMode() {}

    setData(data: any, type: string) {
        this.label = data.label;
        this.icons = data.icons;
        this.type = type;
    }

    buildEdit(data: any[], cmManager: IComponentManager) {
        super.buildEdit(data, cmManager, this.container);
    }
}
