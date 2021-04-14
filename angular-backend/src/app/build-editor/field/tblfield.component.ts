import { OnInit, EventEmitter, Component, ViewChildren, ElementRef, Renderer2, AfterViewInit, QueryList } from '@angular/core';
import { LTComponent } from '../abstract.component';
import { GenericField } from './genericField.component';


@Component({
    selector: 'table-field',
    templateUrl: './tblfield.component.html',
})
export class TableFieldComponent extends GenericField implements OnInit, AfterViewInit, LTComponent {
    tHeader: any[];
    tBody: any[];
    rulesPrint: any[];
    toShow: any[];
    index: number;
    send: EventEmitter<any> = new EventEmitter<any>();
    keyParams: any[];
    uniqueKeys: any[];
    name: string;
    btnEdit: boolean;
    btnDelete: boolean;
    searching = '';
    @ViewChildren('sourceTh')
        sourceTh: QueryList<ElementRef>;

    @ViewChildren('targetTh')
        targetTh: QueryList<ElementRef>;

    constructor(private renderer: Renderer2) {
        super();
        this.keyParams = [];
        this.uniqueKeys = [];
        this.btnEdit = true;
        this.btnDelete = true;
    }
    ngOnInit() {}

    setData(data: any) {
        this.tHeader = data.table.theader;
        this.tBody = data.table.tbody;
        this.rulesPrint = data.table.rulesPrint;
        this.keyParams = data.keyParams;
        this.uniqueKeys = data.uniqueKeys;
        const propEd = 'btnEdit';
        const propDel = 'btnDelete';
        if (propEd in data) {
            this.btnEdit = data.btnEdit;
        }
        if (propDel in data) {
            this.btnDelete = data.btnDelete;
        }
        this.setGenericData(data);
        this.manipulateData();
    }

    ngAfterViewInit() {
        this.resizeColumns();
      }

      resizeColumns() {
        let widths = this.sourceTh.map(th => th.nativeElement.offsetWidth);

        this.targetTh.forEach((th, index) => {
          this.renderer.setStyle(
            th.nativeElement,
            'width',
            `${widths[index]}px`
          );
        });
        this.sourceTh.forEach((th, index) => {
            this.renderer.setStyle(
                th.nativeElement,
                'width',
                `${widths[index]}px`
              );
        });
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
        let isResize = false;
        if (this.tBody.length == 0) {
            isResize = true;
        }
        this.tBody.push(data);
        this.manipulateData();
        this.resizeColumns();
    }

    hasProp(o, name) {
        if (o == null) { return false; }
        return o.hasOwnProperty(name);
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

        this.toShow = this.getDataToPrintOnTable();
    }

    getDataToPrintOnTable() {
        const listOfData = [];
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
            listOfData.push(object);
        });

        return listOfData;
    }

    editEmit(index: any, item: any) {
        const config = {
            id: this.containsObj(item),
            type: 'edit'
        };
        const data = Object.assign({}, config, item);
        this.searching = '';
        this.searchOn();
        this.send.next(data);
    }

    containsObj(item: any) {
        const listItem = this.getDataToPrintOnTable();
        let index = -1;
        for (let i = 0; i < listItem.length; i++) {
            const obj = listItem[i];
            let isThisObj = false;
            for (let prop in obj) {
                if (item.hasOwnProperty(prop)) {
                    if (item[prop] === obj[prop]) {
                        isThisObj = true;
                    } else {
                        isThisObj = false;
                    }
                } else {
                    isThisObj = false;
                }
            }
            if (isThisObj === true) {
                index = i;
            }
        }
        return index;
    }

    deleteEmit(index: any, item: any) {
        const config = {
            id: this.containsObj(item),
            type: 'delete'
        };
        const data = Object.assign({}, config, item);
        this.searching = '';
        this.searchOn();
        this.send.next(data);
    }

    eraseRow(id: number): void {
        this.tBody.splice(id, 1);
        this.manipulateData();
    }

    getRow(id: number): any {
        return this.tBody[id];
    }

    searchOn() {
        const searchText = this.searching.toLocaleLowerCase();
        const data = this.getDataToPrintOnTable();
        if (searchText.length == 0) {
            this.toShow = data;
        } else {
            const rval = data.filter((it) => {
                // console.log(it);
                let check = false;
                for (let prop in it) {
                    if (it[prop].toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase())) {
                        check = true;
                    }
                }

                return check;
            });
            this.toShow = rval;
        }
    }
}
