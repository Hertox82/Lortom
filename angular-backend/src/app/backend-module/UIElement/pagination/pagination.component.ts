/**
 * Created by hernan on 16/11/2017.
 */


import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
@Component({
    selector : 'lt-pagination',
    templateUrl : './pagination.component.html',
    styles : ['']
})


export class PaginationComponent implements OnInit {
    @Input() count: number;
    @Input() page: number;
    @Input() loading = false;
    @Input() perPage: number;
    @Input() pagesToShow: number;

    @Output() goPrev = new EventEmitter<boolean>();
    @Output() goNext = new EventEmitter<boolean>();
    @Output() goPage = new EventEmitter<number>();
    constructor() {}
    ngOnInit() {}


    getMin(): number {
        return ((this.perPage * this.page) - this.perPage) + 1;
    }

    getMax(): number {
        let max = this.perPage * this.page;

        if (max > this.count) {
            max = this.count;
        }
        return max;
    }

    onPrev(): void {
        this.goPrev.emit(true);
    }

    onNext(next: boolean): void {
        this.goNext.emit(next);
    }

    onPage(page: number): void {
        this.goPage.emit(page);
    }

    lastPage(): boolean {
        return this.perPage * this.page > this.count;
    }

    getPages(): number [] {
        const c = Math.ceil(this.count / this.perPage);
        const p = this.page || 1;
        const pagesToShow = this.pagesToShow || 9;
        const pages: number[] = [];
        pages.push(p);
        const times = pagesToShow - 1;
        for (let i = 0; i < times; i++) {
            if (pages.length < pagesToShow) {
                if (Math.min.apply(null, pages) > 1) {
                    pages.push(Math.min.apply(null, pages) - 1);
                }
            }
            if (pages.length < pagesToShow) {
                if (Math.max.apply(null, pages) < c) {
                    pages.push(Math.max.apply(null, pages) + 1);
                }
            }
        }
        pages.sort((a, b) => a - b);
        return pages;
    }
}
