import { IActionComponent } from '../abstract.component';
import { EventEmitter, Component } from '@angular/core';



@Component({
    selector: 'clean-block',
    template: `
        <button class="{{styleButton}}"  (click)="clicked()">
            <i class="{{styleIcon}}"></i>
            {{label}}
        </button>
    `,
})
export class CleanBlockComponent implements IActionComponent {
    action = new EventEmitter<any>();
    label: string;
    styleIcon: string;
    styleButton: string;

    constructor() {
        this.styleIcon = '';
        this.label = '';
        this.styleButton = '';
    }

    setData(data: any) {
        this.label = data.label;
        this.styleIcon = data.styleIcon;
        this.styleButton = data.styleButton;
    }

    clicked() {
        this.action.next();
    }
}
