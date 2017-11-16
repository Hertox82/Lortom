/**
 * Created by hernan on 14/11/2017.
 */


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