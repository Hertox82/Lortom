import { LTComponent } from '../abstract.component';
import { EventEmitter, Component } from '@angular/core';
import { GenericField } from './genericField.component';




@Component({
    selector: 'chbxlist-field',
    template: `
    <ul class="lt-checklist">
        <li *ngFor="let it of items">
        <div class="form-check">
            <label class="form-check-label" for="{{it.name}}">
                <input [(ngModel)]="it.check"
                type="checkbox" class="form-check-input"
                name="{{it.name}}" id="{{it.name}}"
                *ngIf="isEdit === false; else editCheck" disabled
                >
                <ng-template #editCheck>
                <input [(ngModel)]="it.check"
                type="checkbox" class="form-check-input"
                name="{{it.name}}" id="{{it.name}}"
                >
                </ng-template>
            {{it.name}}
            </label>
            </div>
        </li>
    </ul>
    `,
    styleUrls: ['./chbxlist.component.css']
})
export class ChbxListComponent extends GenericField implements LTComponent {
    index: number;
    send: EventEmitter<any> = new EventEmitter<any>();
    isEdit = false;
    items: any[];
    copyItems: any[];
    name: string;
    setData(data: any): void {
        this.items = data.items;
        this.copyItems = data.items;
        this.setGenericData(data);
    }
    getData(): any {
        const listOfItem = [];

        this.items.forEach((x) => {
            if (x.check === true) {
                listOfItem.push(x);
            }
        });

        return {
            id: this.name,
            data: listOfItem
        };
     }
    resetData(): void {
        this.items = this.copyItems;
    }
}
