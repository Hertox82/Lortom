/**
 * Created by hernan on 17/11/2017.
 */



import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
@Component({
    selector : 'lt-entry-pagination',
    templateUrl : './show-entry.component.html',
    styles : ['']
})

export class ShowEntryComponent implements OnInit
{
    @Input() entry : string;
    listEntry : number [] = [];

    @Output() onEntry = new EventEmitter<number>();

    constructor() {

    }
    ngOnInit() {
        let entries = this.entry.split('-');

        let maxNumber = parseInt(entries[0]);
        let grouping = parseInt(entries[1]);

        let iterator = maxNumber/grouping;

        for(let i = 0 ; i<iterator; i++)
        {
            let number = (i +1) * grouping;
            this.listEntry.push(number);
        }

        this.onEntry.emit(this.listEntry[0]);
    }


    passVal(event)
    {
        this.onEntry.emit(parseInt(event));
    }
}