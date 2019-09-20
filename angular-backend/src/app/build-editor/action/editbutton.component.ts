import { OnInit, Component, EventEmitter } from '@angular/core';
import { IActionComponent } from '../abstract.component';


@Component({
    selector: 'edit-button',
    template: `
    <button class="btn darkorange" (click)="action.emit()">
        <i class="fa fa-edit"></i>
        Edit
    </button>`,
    styleUrls: []
})
export class EditButtonComponent implements OnInit, IActionComponent {
    action = new EventEmitter<any>();
    constructor() {}
    ngOnInit() {}
}
