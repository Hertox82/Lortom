import { IActionTabList } from '../interface.tablist';
import { OnInit, Component, EventEmitter } from '@angular/core';



@Component({
    selector: 'event-action',
    template: `
        <a class="{{styleButton}}" (click)="action.emit($event)"><i class="{{styleIcon}}"></i> {{label}}</a>
    `,
    styleUrls: []
})
export class EventActionComponent implements IActionTabList, OnInit {
    styleIcon: string;
    styleButton: string;
    label: string;
    action: EventEmitter<any> = new EventEmitter<any>();
    constructor() {
        this.styleIcon = '';
        this.styleButton = '';
        this.label = '';
    }
    ngOnInit() {}

    setData(data: any) {
        this.label = data.label;
        this.styleIcon = data.styleIcon;
        this.styleButton = data.styleButton;
    }
}
