import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {BreadCrumbsComponent} from './breadcrumbs.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations : [
        BreadCrumbsComponent
    ],
    providers : [
    ],
    exports: [
        BreadCrumbsComponent
    ]
})

export class BreadCrumbModule {}
