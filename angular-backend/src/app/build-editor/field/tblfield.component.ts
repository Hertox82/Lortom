import { OnInit, EventEmitter, Component } from '@angular/core';
import { LTComponent } from '../abstract.component';
import { GenericField } from './genericField.component';


@Component({
    selector: 'table-field',
    template: `
    <div class="box">
        <div class="box-header">

        </div>
        <div class="box-body">
            <div class="wrapper">
                <div class="row">
                    <div class="col-sm-12">
                        <table class="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th style="width: 50px;"></th>
                                    <th *ngFor="let th of tHeader">
                                        <a>{{th}}</a>
                                    </th>
                                    <th style="width: 50px;"></th>
                                    <th style="width: 50px;"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr *ngFor="let item of toShow; let i = index">
                                    <td></td>
                                    <td *ngFor="let name of item | keys | keysNoParams:keyParams">
                                        {{item[name]}}
                                    </td>
                                    <td>
                                        <button class="btn btn-default" (click)="editEmit(i,item)"><i class="fa fa-edit"></i></button>
                                    </td>
                                    <td>
                                        <button class="btn btn-default" (click)="deleteEmit(i, item)"><i class="fa fa-times"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
})
export class TableFieldComponent extends GenericField implements OnInit, LTComponent {
    tHeader: any[];
    tBody: any[];
    rulesPrint: any[];
    toShow: any[];
    index: number;
    send: EventEmitter<any> = new EventEmitter<any>();
    keyParams: any[];
    uniqueKeys: any[];
    name: string;
    constructor() {
        super();
        this.keyParams = [];
        this.uniqueKeys = [];
    }
    ngOnInit() {}

    setData(data: any) {
        this.tHeader = data.table.theader;
        this.tBody = data.table.tbody;
        this.rulesPrint = data.table.rulesPrint;
        this.keyParams = data.keyParams;
        this.uniqueKeys = data.uniqueKeys;
        this.setGenericData(data);
        this.manipulateData();
    }

    getData() {
        if (this.tBody != undefined) {
            return {
                id: this.name,
                data: this.tBody
            };
        } else {
            return null;
        }
    }

    resetData() {}

    addRow(data: any) {
        this.tBody.push(data);
        this.manipulateData();
    }

    checkIfExistsAndUpdate(data: any) {
        const keys = this.uniqueKeys;
        let response = false;
        let ind = -1;
        for (let i = 0; i < this.tBody.length; i++) {
            const item = this.tBody[i];
            keys.some((key, index, array) => {
                // da vedere se fare un altro check per controllare se è un object
                if (typeof item[key] === 'object') {
                    if  ( JSON.stringify(item[key]) === JSON.stringify(data[key])) {
                        // do something
                        response = true;
                        ind = i;
                        return JSON.stringify(item[key]) === JSON.stringify(data[key]);
                    }

                } else {
                    if (item[key] !== undefined && item[key] === data[key]) {
                        response = true;
                        ind = i;
                        return item[key] !== undefined && item[key] === data[key];
                    }
                }
            });
        }

        if (ind !== -1) {
            this.tBody[ind] = data;
        }

        return response;
    }

    manipulateData() {
        // here do something
        this.toShow = [];
        this.tBody.forEach((row) => {
            const Keys = Object.keys(row);
            let object = {};
            Keys.forEach((key) => {
                if (key in this.rulesPrint) {
                    const valueKeys = this.rulesPrint[key].split('|');
                    if ( valueKeys.length === 1) {
                        const newKey = key + '-' + valueKeys[0];
                        object[newKey] = row[key][valueKeys[0]];
                    }else {
                        for (let i = 0; i < valueKeys.length; i++) {
                        const newKey = key + '-' + valueKeys[i];
                        object[newKey] = row[key][valueKeys[i]];
                        }
                    }
                } else {
                    object[key] = row[key];
                }
            });
            this.toShow.push(object);
        });
    }

    editEmit(index: any, item: any) {
        const config = {
            id: index,
            type: 'edit'
        };
        const data = Object.assign({}, config, item);
        this.send.next(data);
    }

    deleteEmit(index: any, item: any) {
        const config = {
            id: index,
            type: 'delete'
        };
        const data = Object.assign({}, config, item);
        this.send.next(data);
    }

    eraseRow(id: number): void {
        this.tBody.splice(id, 1);
        this.manipulateData();
    }

    getRow(id: number): any {
        return this.tBody[id];
    }
}
