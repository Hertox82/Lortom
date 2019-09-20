import { OnInit, Input, Component } from '@angular/core';


@Component({
    selector: 'nav-tab-list',
    template: `
    <ul class="nav nav-tabs">
        <ng-container *ngFor="let link of liLink">
            <ng-container [ngTemplateOutlet]="link.active == true ? activeLi : deactiveLi"
            [ngTemplateOutletContext]="{link:link}"></ng-container>
        </ng-container>
        <ng-template #activeLi let-link='link'>
            <li class="active">
                <a href="#tab_1" data-toggle="tab"> {{link.label}}</a>
            </li>
        </ng-template>
        <ng-template #deactiveLi let-link="link">
            <li>
                <a [routerLink]="[link.routing]" data-toggle="tab"> {{link.label}}</a>
            </li>
         </ng-template>
    </ul>
    `
})
export class NavTabListComponent implements OnInit {
    @Input() liLink: {routing?: string; label: string; active: boolean}[];
    constructor() {}
    ngOnInit() {}
}
