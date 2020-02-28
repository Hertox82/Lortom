import { ViewChild } from '@angular/core';
import { IComponentManager } from '@Lortom/app/build-editor/abstract.component';
import { BuildEditorComponent } from '@Lortom/app/build-editor/buildeditor.component';
import { IBuildEditObject } from '@Lortom/app/build-editor/be.interface';
import { TinyMceComponent } from '@Lortom/app/build-editor/field';


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
    @ViewChild(BuildEditorComponent) beComp: BuildEditorComponent;

    callServer(id?: number) {
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

    buildEdit(data: any) {
        this.dataStructured = data;
        if (this.checkForRestriction(data)) {
            this[this.varNameRouter].navigate([this.varUrlBack]);
        } else {
            this.beComp.bldEdit(this, this.dataStructured);
            this.listOfSubscription.push(this.beComp.eventSave.subscribe(this.save));
            this.listOfSubscription.push(this.beComp.eventReset.subscribe(this.reset));
        }
    }

    destroySub() {
        this.listOfSubscription.forEach(
            (x) => {
                x.unsubscribe();
            });
    }

    checkForRestriction(data: any) {
        if (typeof this['isRestriction'] === 'function') {
            return this['isRestriction'](data);
        }

        return false;
    }

     /**
     * This function is called when User click on Button Edit.
     * @param event
     */
    cmpEdit(event: any) {
        this.beComp.listOfBlock.forEach(
            (block) => {
                block.instance.listOfComponents.forEach((component) => {
                    if (component.instance.isEdit != undefined) {
                        const obj = component.instance;
                        if ('available' in obj) {
                            if ( component.instance['available'] === true ) {
                                if (component.instance instanceof TinyMceComponent) {
                                    component.instance.editor.readOnly(!this.isEdit);
                                } else {
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
    save(cm) {
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

            cm.sendToServer(object);
        } else {
            console.log('non salvo');
        }
    }

    /**
     * This function send to Api the data Object to Update
     * @param object
     */
    sendToServer(object: any) {
        if (this.id != null) {
            this[this.varNameService].update(this.keyPath, this.id, object).subscribe(
                (response: any) => {
                     this.destroySub();
                    this.buildEdit(response);

                }
            );
            } else {
            this[this.varNameService].store(this.keyPath, object).subscribe(
                (response: any) => {
                     this.destroySub();
                    this.buildEdit(response);
                    this[this.varNameRouter].navigate([this.varUrlBack]);
                }
            );
            }
    }

    reset() {
        console.log('reset');
    }


}


