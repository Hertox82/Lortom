import { LTComponent, IActionComponent, IBlock } from './abstract.component';
import {Type} from '@angular/core';
import { IActionTabList } from './tablist/interface.tablist';

export abstract class StoreComponent {
  stComponents: Map<string, Type<LTComponent> >;
  stActions: Map<string, Type<IActionComponent>>;
  stAbBlock: Map<string, Type<IBlock>>;
  stTabListActions: Map<string, Type<IActionTabList>>;

  constructor() {
    this.stComponents = new Map();
    this.stActions = new Map();
    this.stAbBlock = new Map();
    this.stTabListActions = new Map();
  }


  /**
   * This function return if Component is in stComponents list
   * @param type
   * @returns boolean
   */
  hasComponent(type: string): boolean {
    return this.stComponents.has(type);
  }

  /**
   * This function return if the Action is in stActions list
   * @param type
   * @returns boolean
   */
  hasAction(type: string): boolean {
    return this.stActions.has(type);
  }

  /**
   * This function return if the Block is in stAbBlock list
   * @param type
   * @returns boolean
   */
  hasBlock(type: string): boolean {
    return this.stAbBlock.has(type);
  }

  /**
   * This function return if the Tablist Action is in list
   * @param type
   */
  hasTabListAction(type: string): boolean {
    return this.stTabListActions.has(type);
  }

  /**
   * This function add Component into the stComponents list
   * @param type
   * @param component
   */
  addComponent(type: string, component: Type<LTComponent>) {
    this.stComponents.set(type, component);
    return this;
  }

  /**
   * This function add Action into the stActions list
   * @param type
   * @param action
   */
  addAction(type: string, action: Type<IActionComponent>) {
    this.stActions.set(type, action);
    return this;
  }

  /**
   * This function add Block into the stBlock list
   * @param type
   * @param block
   */
  addBlock(type: string, block: Type<IBlock>) {
    this.stAbBlock.set(type, block);
    return this;
  }

  /**
   * This function add Action into the tablist action
   * @param type
   * @param action
   */
  addTabListAction(type: string, action: Type<IActionTabList>) {
    this.stTabListActions.set(type, action);
    return this;
  }

  /**
   * This function get the Component from the stComponents list
   * @param type
   */
  getComponent(type: string) {
    return this.stComponents.get(type);
  }

  /**
   * This function get the Action from the stActions list
   * @param type
   */
  getAction(type: string) {
    return this.stActions.get(type);
  }

  /**
   * This function get the Block from the stAbBlock list
   * @param type
   */
  getBlock(type: string) {
    return this.stAbBlock.get(type);
  }

  getTabListAction(type: string) {
    return this.stTabListActions.get(type);
  }
}
