import { OnInit, EventEmitter, Component } from '@angular/core';
import { IActionComponent } from '../abstract.component';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
    selector: 'save-modal',
    template: `
    <button type="button" class="{{styleButton}}"  (click)="action.emit()" [style]="styleCSS" >{{label}}</button>
    `
})
export class SaveModalComponent implements OnInit, IActionComponent {
    action = new EventEmitter<any>();
    label: string;
    styleButton: string;
    styleCSS: SafeStyle;
    name: string;
    constructor(private sanitizer: DomSanitizer) {
        this.label = '';
        this.styleButton = '';
        this.name = '';
        this.styleCSS = '';
    }

    ngOnInit() {}

    setData(data: any) {
        this.label = data.label;
        this.styleButton = data.styleButton;
        this.name = data.name;
        this.styleCSS = this.sanitizer.bypassSecurityTrustStyle(data.styleCSS);
    }

    clicked() {
        this.action.next();
    }
}
