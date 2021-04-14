import { ComponentFactoryResolver, Injector, ViewContainerRef, ComponentRef } from '@angular/core';
import { IComponentManager, IBlock } from '../abstract.component';
import { BlockComponent } from '../block/block.component';
import { SC } from '../sc';
import { CbListComponent } from '../block/cblist.component';
import { TableBlockComponent } from '../block/table.component';
import { ModalBlockComponent } from '../block/modal.component';
import { FileBlockComponent } from '../block/fileblock.component';



export class AbstractComponentManager implements IComponentManager {

    listOfSubscription = [];

    listOfBlock: ComponentRef<IBlock>[];

    listOfRawData: any[] = [];

    constructor(protected abCMService: SC, protected abCMResolver: ComponentFactoryResolver,
      protected abCMInjector: Injector ) {
        this.listOfBlock = [];
        this.abCMService.addBlock('block', BlockComponent)
        .addBlock('cbList', CbListComponent)
        .addBlock('table', TableBlockComponent)
        .addBlock('modal', ModalBlockComponent)
        .addBlock('file', FileBlockComponent);
    }

    /**
     * This function take the container and fire the method of Blocks in order to Build the Edit
     * @param container
     * @param data
     * @param cmManager
     */
    buildEdit(container: ViewContainerRef,
        data: {data: any; type: string; child?: any; actions?: any, initialized: boolean} [],
        cmManager: IComponentManager
        ) {
          container.clear();
          // nuova implementazione
          this.listOfBlock = [];
          let i = 0;
          data.forEach((item) => {
              if (this.abCMService.hasBlock(item.type)) {
                if (item.initialized) {
                  this.initBlock(item, cmManager, container, i);
                  i++;
                }
              }
            });
          this.listOfRawData = data;
    }

    initBlock(item: any, cmManager: IComponentManager, container: ViewContainerRef , i: number) {
      const component = this.createBlock(container, item, i);
      component.instance.setData(item.data, item.type);
      this.listOfBlock.push(component);
      if (item.child) {
        component.instance.buildEdit(item.child, cmManager);
      }
      if (item.actions) {
        component.instance.buildAction(item.actions, cmManager);
      }
    }

    /**
     * this function create the abstract block component
     * @param index
     * @param container
     * @param item
     */
    createBlock(container: ViewContainerRef,
      item: {data: any, type: string, child?: any, actions?: any, initialized: boolean}, index: number ): ComponentRef<IBlock> {
      const factory = this.abCMResolver.resolveComponentFactory(this.abCMService.getBlock(item.type));
      const componentRef = container.createComponent(factory, index, this.abCMInjector);
      return componentRef;
    }

    getValueFromKey(key: string) {
      let response = null;
      this.listOfBlock.forEach((block) => {
        block.instance.listOfComponents.forEach((component) => {
          if (component.instance.name === key) {
            response = component.instance.getData();
          }
        });

      });

      return response;
    }

    setValueFromKey(key: string, value: any) {
      this.listOfBlock.forEach((block) => {
        block.instance.listOfComponents.forEach((component) => {
          if (component.instance.name === key) {
           component.instance['data'] = value;
          }
        });
      });
    }
}
