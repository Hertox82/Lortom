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
    nomeFile : string,
    state : boolean,
}