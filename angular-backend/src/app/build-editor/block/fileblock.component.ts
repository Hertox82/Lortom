import { OnInit, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver, Injector, Component } from '@angular/core';
import { AbstractBlock } from './abstractblock.component';
import { SC } from '../sc';
import { IComponentManager } from '../abstract.component';
import { UtilService } from '@Lortom/app/utilModule/util-service';


@Component({
    selector: 'fileblock',
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
export class FileBlockComponent extends AbstractBlock implements OnInit {
    @Input() label: string;
    @Input() icons: string;
    type: string;
    @ViewChild('vC', {read: ViewContainerRef}) container: ViewContainerRef;
    @ViewChild('actionC', {read: ViewContainerRef}) actionContainer: ViewContainerRef;
    isEdit: boolean;

    constructor(fbService: SC, fbResolver: ComponentFactoryResolver, fbInj: Injector, fbUtSer: UtilService) {
        super(fbService, fbResolver, fbInj, fbUtSer);
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
