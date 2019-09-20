import { OnInit, EventEmitter, Component } from '@angular/core';
import { IActionComponent } from '../abstract.component';

@Component({
    selector: 'add-modal',
    template: `
    <button class="{{styleButton}}"  [attr.data-target]="id" (click)="clicked()">
        <i class="{{styleIcon}}"></i>
        {{label}}
    </button>
    `
})
export class AddModalComponent implements OnInit, IActionComponent {
    action = new EventEmitter<any>();
    id: string;
    label: string;
    styleIcon: string;
    styleButton: string;
    constructor() {
        this.styleIcon = '';
        this.label = '';
        this.id = '';
        this.styleButton = '';
    }
    ngOnInit() {}

    setData(data: any) {
        this.id = '#' + data.id;
        this.label = data.label;
        this.styleIcon = data.styleIcon;
        this.styleButton = data.styleButton;
    }

    clicked() {
        this.action.next();
    }
}
