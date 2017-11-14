/**
 * Created by hernan on 14/11/2017.
 */


export interface Page {
    id : number,
    title : string,
    slug : string,
    content : string,
    meta_tag : string,
    meta_desc : string,
    state : boolean,
}