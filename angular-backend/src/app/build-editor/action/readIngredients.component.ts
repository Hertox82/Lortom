import { Component, EventEmitter, OnInit } from '@angular/core';
import { IActionComponent } from '../abstract.component';


@Component({
    selector: 'read-ingredients',
    template: `
    <button class="btn red" (click)="action.emit()">
        <i class="fa fa-file-pdf-o"></i>
        Read
    </button>`,
    styleUrls: []
})
export class ReadIngredientsComponent implements OnInit, IActionComponent {
    action = new EventEmitter<any>();
    constructor() {}
    ngOnInit() {}
}
