/**
 * Created by hernan on 07/11/2018.
 */
import {Injectable} from '@angular/core';
import {MasterService} from '../../../services/master.service';
import {FileFromApi, LortomFile} from './files.interfaces';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LtFile } from 'lt-drag-and-drop';



@Injectable()
export class FilesServices extends MasterService {

    private arrayOfFiles: LortomFile[];

    constructor(private https: HttpClient) {
        super(https);

        const urls = [
            { namePath: 'getFiles', path: 'old/files'},
            { namePath: 'saveFile', path: 'file'},
            { namePath: 'deleteFile', path: 'files'},
            { namePath: 'editFiles', path: 'file/{id}/edit'},
            { namePath: 'updateFiles', path: 'file/{id}'},
            { namePath: 'indexFiles', path: 'files'},
            { namePath: 'deleteFiles', path: 'files'},
            { namePath: 'deleteFileObject', path: 'media/delete/file/object'},
            { namePath: 'storeFileObject', path: 'media/link/file/object'}
        ];
        // Add the Api to the ApiManager
        this.apiManager.addListUrlApi(urls);
    }


    /**
     * This function retrieve the List of File from API
     */
    public getFilesFrom(params?: HttpParams): Observable<LortomFile[]> {
        return this.http.get(this.apiManager.getPathByName('getFiles'), {
            params: params
        }).pipe(
        map((response: FileFromApi []) => {
                  return this.convertListFromApiToLortomFile(response);
            }));
    }

    protected convertListFromApiToLortomFile(arrFile: FileFromApi[]): LortomFile[] {
        const nArrayOfFiles: LortomFile[] = [];

        for (let i = 0; i < arrFile.length; i++) {
            const file: FileFromApi = arrFile[i];

            nArrayOfFiles.push(this.convertFileApiToLortomFile(file));
        }
        return nArrayOfFiles;
    }

    public convertLortomFileToLtFile(file: LortomFile): LtFile {
        return {
            img: file.file.img,
            name: file.file.name,
            id: file.file.id
        };
    }


    /**
     * This function convert a file From API into a LortomFile
     * @param fTApi
     * @returns LortomFile
     */
    protected convertFileApiToLortomFile(fTApi: FileFromApi): LortomFile {
            return {
                file: {
                    id: fTApi.id,
                    img: fTApi.src,
                    name: fTApi.fileName
                },
                ListObj: fTApi.ListObj
        };
    }

    /**
     * this function convert a LortomFile into a FileFromApi
     * @param file
     */
    protected convertLortomFileToFileApi(file: LortomFile) {
            return {
                ListObj: file.ListObj,
                id: file.file.id,
                src: file.file.img,
                fileName: file.file.name
            };
    }

    /**
     * This function set the File into a localStorage
     * @param array
     */
    public setFiles(array: LortomFile []): void {

        this.setItem('files', array);
        this.arrayOfFiles = array;
    }


    /**
     * This function add file into List of File stored in localStorage
     * @param file
     */
    public setFile(file: LortomFile): void {
        let files: LortomFile[] = this.getFiles();
        if (!files) {
            files = [] as LortomFile [];
        }
        files.push(file);
        this.deleteFileFromCache();
        this.setFiles(files);
    }

    /**
     * This function return a list Of LortomFile
     */
    public getFiles() {
        return this.getItem('files', 'arrayOfFiles') as LortomFile[];
    }

    public deleteFileFromCache() {
        this.deleteItem('files', 'arrayOfFiles');
    }

    /**
     * This function return Lortom File by Id
     * @param id
     */
    public getFilesById(id: number): LortomFile {

        if (this.arrayOfFiles === undefined || this.arrayOfFiles === null) {
            this.arrayOfFiles = this.getFiles();
        }

        for (let i = 0; i < this.arrayOfFiles.length; i++) {
            const file = this.arrayOfFiles[i];

            if (file.file.id === id) {
                return file;
            }
        }

        return null;
    }

    /**
     * This function update the file in list
     * @param file
     */
    public updateFileInList(file: LortomFile) {
        if (this.arrayOfFiles === undefined) {
            this.arrayOfFiles = this.getFiles();
        }

        for (let i = 0; i < this.arrayOfFiles.length; i++) {
            if (this.arrayOfFiles[i].file.id === file.file.id) {
                this.arrayOfFiles[i] = file;
            }
        }

        // this.deleteFileFromCache();
        this.setFiles(this.arrayOfFiles);
    }


    /**
     * this function save file into db
     * @param file
     */
    public saveFile(file: File, idObject?: number, nameObject?: string): Observable<LortomFile> {

        const formData = new FormData();
        formData.append('file', file, file.name);
        if ((idObject !== undefined) && (nameObject !== undefined)) {
            formData.append('idObject', idObject.toString());
            formData.append('nameObject', nameObject);
        }
        return this.http.post(this.apiManager.getPathByName('saveFile'), formData, this.getOptions([]))
        .pipe(
            map((response: FileFromApi) => {
             return this.convertFileApiToLortomFile(response);
            })
        );
    }

    /**
     * this function edit file into db
     * @param file
     */
    public editFile(file: LortomFile): Observable<LortomFile> {
        return this.http.put(this.apiManager.getPathByName('saveFile'), file, this.getOptions())
        .pipe(
            map((response: FileFromApi) => {
                return this.convertFileApiToLortomFile(response);
            })
        );
    }


    public deleteFile(file: LortomFile) {
        return this.http.put(this.apiManager.getPathByName('deleteFile'), {id: file.file.id}, this.getOptions())
        .pipe(
            map((response: FileFromApi []) => {
                return this.convertListFromApiToLortomFile(response);
            })
        );
    }

    /**
     * this function delete relationship between file and object
     * @param file
     * @param idObject
     * @param nameObject
     */
    public deleteFileObject(file: LortomFile, idObject: number, nameObject: string) {
        return this.http.post(this.apiManager.getPathByName('deleteFileObject'), {id: file.file.id, sObj: nameObject, nIdObj: idObject})
        .pipe(
            map((response: FileFromApi []) => {
                return this.convertListFromApiToLortomFile(response);
            })
        );
    }

    /**
     * This function save relationshio between file and object
     * @param idFile
     * @param idObject
     * @param nameObject
     */
    public saveFileObject(idFile: any, idObject?: number, nameObject?: string): Observable<LortomFile> {
        return this.http.post(this.apiManager.getPathByName('storeFileObject'), {id: idFile, sObj: nameObject, nIdObj: idObject})
        .pipe(
            map((response: FileFromApi) => {
                return this.convertFileApiToLortomFile(response);
            })
        );
    }
}
