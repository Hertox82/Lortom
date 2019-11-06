import { Injectable } from '@angular/core';
import { IFunctionAction } from './util-interface';

@Injectable()
export class UtilService {

    _repo: Map<string, IFunctionAction>;
    constructor() {
        this._repo = new Map();
        this.initialize();
    }

    initialize() {
        /* this.addItem('artprodOpenMod', {
            name: 'openModalProductRelative',
            path: async function(){
                const mod = await import('@Lortom/plugins/Hardel/Shop/service-action/shop-service-action');
                return mod[this.name];
            }
        })
        .addItem('artprodSearch', {
            name: 'searchProductRelative',
            path: async function(){
                const mod = await import('@Lortom/plugins/Hardel/Shop/service-action/shop-service-action');
                return mod[this.name];
            }
        })
        .addItem('artprodSaveMod', {
            name: 'saveProductRelative',
            path:  async function(){
                const mod = await import('@Lortom/plugins/Hardel/Shop/service-action/shop-service-action');
                return mod[this.name];
            }
        })
        .addItem('artprodTblfield', {
            name: 'artprodTblField',
            path:  async function(){
                const mod = await import('@Lortom/plugins/Hardel/Shop/service-action/shop-service-action');
                return mod[this.name];
            }
        }); */
    }
    addItem(key: string, value: any) {
        this._repo.set(key, value);
        return this;
    }

    hasItem(key: string): boolean {
        return this._repo.has(key);
    }

    async getClassFunction(key: string) {
        if (this.hasItem(key)) {
            const val: IFunctionAction = this._repo.get(key);
            return val.path();
        } else {
            console.warn('%s is not a valid function', key);
            return null;
        }
    }
}
