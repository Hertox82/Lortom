/**
 * Created by hernan on 07/11/2018.
 */
import {Injectable} from '@angular/core';
import {MasterService} from '@Lortom/services/master.service';
import {FileFromApi, LortomFile} from '@Lortom/plugins/Hardel/File/Services/files.interfaces';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class FilesServices extends MasterService {

    private arrayOfFiles: LortomFile[];

    constructor(private http: HttpClient) {
        super();

        const urls = [
            { namePath: 'getFiles', path: 'files'},
            { namePath: 'saveFile', path: 'file'}
        ];
        // Add the Api to the ApiManager
        this.apiManager.addListUrlApi(urls);
    }


    /**
     * This function retrieve the List of File from API
     */
    public getFilesFrom(): Observable<LortomFile[]> {
        return this.http.get(this.apiManager.getPathByName('getFiles'))
            .map((response: FileFromApi []) => {
                    const nArrayOfFiles: LortomFile[] = [];

                    for (let i = 0; i < response.length; i++) {
                        const file: FileFromApi = response[i];

                        nArrayOfFiles.push(this.convertFileApiToLortomFile(file));
                    }
                    return nArrayOfFiles;
            });
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
        this.updateItemInList(file, 'arrayOfFiles');
    }

    /**
     * This function return a list Of LortomFile
     */
    public getFiles() {
        return this.getItem('files', 'arrayOfFiles') as LortomFile[];
    }

    /**
     * This function return Lortom File by Id
     * @param id
     */
    public getFilesById(id: number): LortomFile {

        if (this.arrayOfFiles === undefined) {
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


    public saveFile(file: File): Observable<LortomFile> {

        const formData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post(this.apiManager.getPathByName('saveFile'), formData, this.getOptions([]))
        .map((response: FileFromApi) => {
             return this.convertFileApiToLortomFile(response);
        });
    }


    public deleteFile(file: LortomFile) {

    }
}
