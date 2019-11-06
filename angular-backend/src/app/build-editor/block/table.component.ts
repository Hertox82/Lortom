import { AbstractBlock } from './abstractblock.component';
import { OnInit, ComponentFactoryResolver, Injector, Input, ViewChild, ViewContainerRef, Component, ComponentRef } from '@angular/core';
import { SC } from '../sc';
import { IComponentManager } from '../abstract.component';
import { TableFieldComponent } from '../field';
import { UtilService } from '@Lortom/app/utilModule/util-service';


@Component({
    selector: 'table-block',
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
            <div class="" #vC>
            </div>
        </div>
    </div>
    `,
    styleUrls: []
})
export class TableBlockComponent extends AbstractBlock implements OnInit {
    @Input() label: string;
    @Input() icons: string;
    type: string;
    @ViewChild('vC', {read: ViewContainerRef}) container: ViewContainerRef;
    @ViewChild('actionC', {read: ViewContainerRef}) actionContainer: ViewContainerRef;
    isEdit: boolean;
    constructor(tbService: SC, tbResolver: ComponentFactoryResolver, tbInj: Injector, tbUtSer: UtilService) {
        super(tbService, tbResolver, tbInj, tbUtSer);
    }
    ngOnInit() {}

    setData(data: any, type: string) {
        this.label = data.label;
        this.icons = data.icons;
        this.type = type;
    }

    buildEdit(data: any[], cmMan: IComponentManager) {
        super.buildEdit(data, cmMan, this.container);
    }

    buildAction(data: any[], cmMana: IComponentManager) {
        super.buildAction(data, cmMana, this.actionContainer);
    }

    printData(data: any) {
        this.listOfComponents.forEach((comp) => {
            if (comp.instance instanceof TableFieldComponent) {
                if (comp.instance.checkIfExistsAndUpdate(data)) {
                    comp.instance.manipulateData();
                } else {
                comp.instance.addRow(data);
                }
            }
        });
    }

    hasIdName(name: string): boolean {
        let response = false;
        this.listOfComponents.forEach((cmp) => {
            if (cmp.instance.name === name) {
                response = true;
            }
        });
        return response;
    }

}
