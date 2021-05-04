import { OnInit, Component, Input, ComponentFactoryResolver, Injector, ViewChild, ViewContainerRef } from '@angular/core';
import { AbstractBlock } from './abstractblock.component';
import { SC } from '../sc';
import { IComponentManager } from '../abstract.component';
import { UtilService } from '@Lortom/app/utilModule/util-service';



@Component({
    // tslint:disable-next-line:component-selector
    selector: 'block',
    template: `
    <div class="portlet">
        <div class="portlet-title">
            <div class="caption">
                <i class="{{icons}}"></i>
                <span>{{label}}</span>
            </div>
            <div class="actions">
                <template #actionC></template>
            </div>
         </div>
        <div class="portlet-body">
            <div class="portlet-form-body">
                <div class="container">
                    <div class="row" #vC>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    styleUrls: []
})
export class BlockComponent extends AbstractBlock implements OnInit {
@Input() label: string;
@Input() icons: string;
type: string;
@ViewChild('vC', {static: true, read: ViewContainerRef}) container: ViewContainerRef;
@ViewChild('actionC', {static: true, read: ViewContainerRef}) actionContainer: ViewContainerRef;
isEdit: boolean;

constructor(bsService: SC, bResolver: ComponentFactoryResolver, bInj: Injector, bUtSer: UtilService) {
        super(bsService, bResolver, bInj, bUtSer);
    }
    ngOnInit() {}

    editMode() {}

    setData(data: any, type: string) {
        this.label = data.label;
        this.icons = data.icons;
        this.type = type;
    }

    buildEdit(data: any[], cmManager: IComponentManager) {
        super.buildEdit(data, cmManager, this.container);
    }

    buildAction(data: any[], cmManager: IComponentManager) {
        super.buildAction(data, cmManager, this.actionContainer);
    }
}
