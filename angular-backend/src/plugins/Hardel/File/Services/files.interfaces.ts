import {LtFile} from "lt-drag-and-drop";
/**
 * Created by hernan on 07/11/2018.
 */


export interface LortomFile {

    file: LtFile,
    ListObj?: ObjectApi []
}


export interface ObjectApi {
    id: number,
    typeObj: string,
    position: number,
    description: string
}


export interface FileFromApi {
    id: number,
    fileName: string,
    src: string,
    ListObj: ObjectApi []
}