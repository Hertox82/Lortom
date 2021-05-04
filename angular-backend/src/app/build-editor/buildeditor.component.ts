import { Component, AfterContentInit, Injector, ComponentFactoryResolver,
    Input, ViewChild, ViewContainerRef, EventEmitter } from '@angular/core';
import { AbstractComponentManager } from './manager/abstractmanager.component';
import { SC } from './sc';
import { IComponentManager } from './abstract.component';
import { IBuildEditObject } from './be.interface';


@Component({
    selector: 'build-editor',
    templateUrl: './buildeditor.component.html',
    styleUrls: []
})
export class BuildEditorComponent extends AbstractComponentManager implements AfterContentInit {
    @Input() cmManager: IComponentManager;
    @ViewChild('viewContainer', {static: true, read: ViewContainerRef}) container: ViewContainerRef;
    eventSave = new EventEmitter<any>();
    eventReset = new EventEmitter<any>();
    eventSL = new EventEmitter<any>();
    isSaved = true;

    constructor(injector: Injector, resolver: ComponentFactoryResolver, storeManager: SC) {
        super(storeManager, resolver, injector);
    }
    ngAfterContentInit() {}

    bldEdit(manager: IComponentManager, data: IBuildEditObject[] ) {
        this.cmManager = manager;
        this.buildEdit(this.container, data, manager);
    }

    saveButton() {
        this.eventSave.emit({cm: this.cmManager, lv: false});
    }

    resetButton() {
        this.eventReset.emit();
    }

    saveAndLeaveButton() {
        this.eventSL.emit({cm: this.cmManager, lv: true});
    }
}
