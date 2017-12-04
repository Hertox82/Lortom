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

export interface LortomComponent {
    id : number,
    name : string,
    appearance : string,
    check : boolean
}
