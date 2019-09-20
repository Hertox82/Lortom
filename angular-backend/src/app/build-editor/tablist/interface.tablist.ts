import { EventEmitter } from '@angular/core';


export interface IActionTabList {
    action?: EventEmitter<any>;
    routing?: string;
    styleButton: string;
    styleIcon: string;
    label: string;
    setData(data: any);
}


export interface ITabListField {
    label: string;
    value: string;
    type: string;
}


export interface ITabListObject {
    fields: ITabListField[];
}
