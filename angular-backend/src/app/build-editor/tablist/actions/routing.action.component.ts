import { IActionTabList } from '../interface.tablist';
import { OnInit, Component } from '@angular/core';



@Component({
    selector: 'routing-action',
    template: `
        <a class="{{styleButton}}" [routerLink] = "[routing]"><i class="{{styleIcon}}"></i> {{label}}</a>
    `,
    styleUrls: []
})
export class RoutingActionComponent implements IActionTabList, OnInit {
    routing: string;
    styleIcon: string;
    styleButton: string;
    label: string;
    constructor() {
        this.routing = '';
        this.styleIcon = '';
        this.styleButton = '';
        this.label = '';
    }
    ngOnInit() {}

    setData(data: any) {
        this.routing = data.routing;
        this.styleIcon = data.styleIcon;
        this.styleButton = data.styleButton;
        this.label = data.label;
    }
}

