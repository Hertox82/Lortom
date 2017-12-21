/**
 * Created by hernan on 13/12/2017.
 */


export interface LtPlugin
{
    vendor: string,
    name: string,
    version: string,
    short_desc: string,
    long_desc: string,
    check: boolean,
    packed?:boolean,
}