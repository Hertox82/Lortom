import { ViewChild, EventEmitter, Component } from '@angular/core';
import { IComponentManager } from '@Lortom/app/build-editor/abstract.component';
import { BuildEditorComponent } from '@Lortom/app/build-editor/buildeditor.component';
import { IBuildEditObject } from '@Lortom/app/build-editor/be.interface';
import { TinyMceComponent } from '@Lortom/app/build-editor/field';

@Component({
    template: ''
})
export class ViewEditComponent implements  IComponentManager {
    notFound = true;
    isEdit = false;
    listOfSubscription = [];
    id: number;
    dataStructured: IBuildEditObject[];
    varNameService: string;
    keyPath: string;
    varNameRouter: string;
    varNameUtilService: string;
    varUrlBack: string;
    isSave = true;
    finishToBuild = new EventEmitter<any>();
    @ViewChild(BuildEditorComponent, {static: false}) beComp: BuildEditorComponent;

    callServer(id?: number): void {
        if (id != undefined || id != null ) {
           this[this.varNameService].edit(this.keyPath, id)
             .subscribe(
                (data) => {
                    this.buildEdit(data);
                }
            );
        } else {
            this[this.varNameService].create(this.keyPath)
             .subscribe(
                (data) => {
                    this.buildEdit(data);
                }
             );
        }
    }

    buildEdit(data: any): void {
        this.dataStructured = data.blocks;
        if (this.checkForRestriction(data)) {
            this[this.varNameRouter].navigate([this.varUrlBack]);
        } else {
            this.beComp.bldEdit(this, this.dataStructured);
            this.listOfSubscription.push(this.beComp.eventSave.subscribe(this.save));
            this.listOfSubscription.push(this.beComp.eventSL.subscribe(this.save));
            this.listOfSubscription.push(this.beComp.eventReset.subscribe(this.reset));
            this.finishToBuild.emit(true);
        }
    }

    destroySub(): void {
        this.listOfSubscription.forEach(
            (x) => {
                x.unsubscribe();
            });
        this.listOfSubscription = [];
    }

    checkForRestriction(data: any): any {
        // tslint:disable-next-line:no-string-literal
        if (typeof this['isRestriction'] === 'function') {
            // tslint:disable-next-line:no-string-literal
            return this['isRestriction'](data);
        }

        return false;
    }

    /**
     * This function is called when User click on Button Edit.
     * @param event
     */
    cmpEdit(event: any): void {
        this.beComp.listOfBlock.forEach(
            (block) => {
                block.instance.listOfComponents.forEach((component) => {
                    if (component.instance.isEdit != undefined) {
                        const obj = component.instance;
                        if ('available' in obj) {
                            // tslint:disable-next-line:no-string-literal
                            if ( component.instance['available'] === true ) {
                                if (component.instance instanceof TinyMceComponent) {
                                    component.instance.isEdit = !this.isEdit;
                                } else {
                                    // tslint:disable-next-line:no-string-literal
                                    component.instance['isEdit'] = ! this.isEdit;
                                }
                            }
                        } else {
                            component.instance.isEdit = ! this.isEdit;
                        }
                    }
                  });
            }
        );
        this.isEdit = !this.isEdit;
    }

    /**
     * This function is fired when User click on Button Save
     * @param cm
     */
    save(obj): void {
        const cm = obj.cm;
        const lv = obj.lv;
        if (cm.isSave) {
            let rawData = [];
            // iterate over all Blocks in order to get the data
            cm.beComp.listOfBlock.forEach((b) => {
                rawData = rawData.concat(b.instance.getData());
            });
            const object = {};
            // this sanitize the data in order to pass to Server
            rawData.forEach((it) => {
                object[it.id] = it.data;
            });

            cm.sendToServer(object, lv);
        } else {
            console.log('non salvo');
        }
    }

    /**
     * This function send to Api the data Object to Update
     * @param object
     */
    sendToServer(object: any, leave: boolean): void {
        if (this.id != null) {
            this[this.varNameService].update(this.keyPath, this.id, object).subscribe(
                (response: any) => {
                     this.destroySub();
                     this.isEdit = false;
                     alert('all data has been updated');
                     if (leave === true) {
                        if (typeof(this.varNameRouter) != 'undefined') {
                            this[this.varNameRouter].navigate([this.varUrlBack]);
                        } else {
                            alert('This feature has yet to be implemented');
                            this.buildEdit(response);
                        }
                     } else {
                        this.buildEdit(response);
                     }
                }
            );
            } else {
            this[this.varNameService].store(this.keyPath, object).subscribe(
                (response: any) => {
                     this.destroySub();
                     this.buildEdit(response);
                     if (leave === true) {
                            this[this.varNameRouter].navigate([this.varUrlBack]);
                    } else {
                        if (response.id === 0) {
                            this[this.varNameRouter].navigate([this.varUrlBack]);
                        } else {
                            alert('all data has been stored');
                            this[this.varNameRouter].navigate([this.varUrlBack + '/', response.id]);
                        }
                    }
                }
            );
            }
    }

    reset(): void {
        console.log('reset');
    }
}
