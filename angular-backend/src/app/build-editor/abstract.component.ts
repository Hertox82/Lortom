import { EventEmitter, ViewContainerRef, ComponentRef } from '@angular/core';


export class AbstractComponent {
  data: any;
}


export interface LTComponent {
  index: number;
  send: EventEmitter<any>;
  isEdit?: boolean;
  name?: string;
  type: string;
  setData(data: any): void;
  getData(): any;
  resetData(): void;
  setManager(manager: IComponentManager): void;
  build?(data: any): void;
  editData?(data: any): void;
  eraseData?(): void;
}

export interface IActionComponent {
  action: EventEmitter<any>;
  setData?(data: any): void;
}

export interface IBlock {
  listOfComponents: ComponentRef<LTComponent>[];
  listOfActions: IActionComponent[];
  type: string;
  buildEdit(data: any[], compManager: IComponentManager, container?: ViewContainerRef): void;
  buildAction(data: any[], compManager: IComponentManager, container?: ViewContainerRef): void;
  setData(data: any, type: string);
  getData(): any;
}

export interface IComponentManager {
  listOfSubscription: any[];
}
