import { GenericField } from './genericField.component';
import { OnInit, Input, EventEmitter, Component } from '@angular/core';
import { LTComponent } from '../abstract.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'mediafield',
    template: `
    <div class="col-12">
    <div class="form-group flex-group">
        <label for="nome" class="col-md-2 control-label">Source</label>
        <div class="col-md-4 file-dnd">
            <img  [src]= "url" alt="{{fileName}}" title="{{fileName}}" *ngIf="isPdf === false; else pdfT">
        </div>
        <ng-template #pdfT>
            <iframe [src]="url" width="700" height="500"></iframe>
        </ng-template>
    </div>
</div>
    `
})
export class MediaComponent extends GenericField implements OnInit, LTComponent {
    @Input() data: string;
    @Input() step: number;
    @Input() isPdf: boolean;
    @Input() url: any;
    @Input() fileName: string;
    copyData: string;
    index: number;
    send: EventEmitter<any> = new EventEmitter<any>();
    ngOnInit() {}

    constructor(private sanitizer: DomSanitizer) {
        super();
    }

    setData(data: any) {
        this.data = data.data;
        this.copyData = data.data;
        this.setGenericData(data);
        this.isPdf = data.isPdf;
        if (this.isPdf) {
            this.url = this.sanitizer.bypassSecurityTrustResourceUrl(data.src);
            // console.log(this.url);
        } else {
            this.url = this.sanitizer.bypassSecurityTrustUrl(data.src);
        }
        this.fileName = data.fileName;
    }

    getData() {
        return null;
    }

    resetData() {}

    bindData() {}

    eraseData() {}
}
