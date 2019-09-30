/**
 * Created by hernan on 17/11/2017.
 */



import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
@Component({
    selector : 'lt-entry-pagination',
    templateUrl : './show-entry.component.html',
    styles : ['']
})

export class ShowEntryComponent implements OnInit {
    @Input() entry: string;
    listEntry: number [] = [];

    @Output() onEntry = new EventEmitter<number>();

    constructor() {

    }
    ngOnInit() {
        const entries = this.entry.split('-');

        const maxNumber = parseInt(entries[0], 10);
        const grouping = parseInt(entries[1], 10);

        const iterator = maxNumber / grouping;

        for (let i = 0 ; i < iterator; i++) {
            const number = (i + 1) * grouping;
            this.listEntry.push(number);
        }

        this.onEntry.emit(this.listEntry[0]);
    }


    passVal(event) {
        this.onEntry.emit(parseInt(event, 10));
    }
}
