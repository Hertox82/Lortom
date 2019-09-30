import { Input } from '@angular/core';
import { IComponentManager } from '../abstract.component';



export class GenericField {

    @Input() label: string;
    @Input() isEdit = false;
    @Input() placeholder: string;
    @Input() name: string;
    @Input() available = true;
    cManager: IComponentManager;

    public setGenericData(data: any) {

        ['label', 'isEdit', 'placeholder', 'name', 'available'].forEach(item => {
            if (item in data) {
                this[item] = data[item];
            }
        });
    }

    public setManager(manager: IComponentManager) {
        this.cManager = manager;
    }
}
