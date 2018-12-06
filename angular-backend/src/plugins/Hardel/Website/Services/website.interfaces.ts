/**
 * Created by hernan on 14/11/2017.
 */


export interface Page {
    id: number;
    title: string;
    slug: string;
    content: string;
    metaTag: string;
    metaDesc: string;
    fileName: string;
    check: boolean;
    state: { id?: number , label?: string };
    components?: LtPageComponent[];
}

export interface LortomComponent {
    id: number;
    name: string;
    appearance: string;
    check: boolean;
}

export interface LtPageComponent {
    id: number;
    idComponent?: number;
    name?: string;
    Object?: string;
    functions?: string;
}

export interface LortomMenu {
    id: number;
    idPage: {id: any, label: string};
    name: string;
    check: boolean;
    parentList?: {id: number, label: string};
    idParent: number;
}


export function createLtPageComponentFrom(el: LortomComponent): LtPageComponent {
    const obj = {
        id: -1,
        idComponent: el.id,
        name: el.name,
    };

    return obj as LtPageComponent;
}

