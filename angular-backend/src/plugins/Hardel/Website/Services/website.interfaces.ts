/**
 * Created by hernan on 14/11/2017.
 */

import { Node } from 'lt-treeview';

export interface Page {
    id : number,
    title : string,
    slug : string,
    content : string,
    metaTag : string,
    metaDesc : string,
    fileName : string,
    check : boolean,
    state : { id? : number , label? : string },
}


export interface LortomElement {
    id : number,
    name : string,
    Object : string,
    functions : string,
    appearance : string,
    check : boolean
}


export interface LortomComponent {
    id : number,
    name : string,
    appearance : string,
    elements : LtElementComp[],
    check : boolean
}

export interface LtElementComp {
    id: number,
    idElement : number,
    name : string,
    Object : string,
    functions : string,
    appearance : string,
    check : boolean
    children? : LtElementComp[]
}


export function convertToLtElementComp(item : LortomElement) : LtElementComp
{
    return {
        id: -1,
        idElement : item.id,
        name : item.name,
        Object : item.Object,
        functions : item.functions,
        appearance : item. appearance,
        check: false
    } as LtElementComp
}

export function convertToNodeArray(items : LtElementComp[]) : Node[]
{
    let listOfNode: Node[] = [];

    if(items != undefined) {
        items.forEach(
            (el: LtElementComp) => {
                let node = {
                    label: el.name,
                    obj: {el},
                    children: [],
                    adding: false,
                    expand: false
                } as Node;

                node.children = convertToNodeArray(el.children);

                listOfNode.push(node);
            }
        );
    }

    return listOfNode;
}

export function convertToNodeList(items : LtElementComp[]):Node []{
    let listOfNode : Node[] = [];

    items.forEach(
        (el : LtElementComp) => {
            listOfNode.push({
                label: el.name,
                obj: {el},
                children: [],
                adding: false,
                expand: false
            });
        }
    );

    return listOfNode;
}