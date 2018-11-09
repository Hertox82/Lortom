/**
 * Created by hernan on 07/11/2018.
 */
import {Injectable} from "@angular/core";
import {MasterService} from "@Lortom/services/master.service";
import {FileFromApi, LortomFile} from "@Lortom/plugins/Hardel/File/Services/files.interfaces";
import {HttpClient} from "@angular/common/http";



@Injectable()
export class FilesServices extends MasterService {

    private arrayOfFiles: LortomFile[];

    constructor(private http: HttpClient) {
        super();

        const urls = [
            { namePath : 'getFiles', path: 'files'}
        ];
        //Add the Api to the ApiManager
        this.apiManager.addListUrlApi(urls);
    }


    public getFilesFrom() {
        return this.http.get(this.apiManager.getPathByName('getFiles'))
            .map((response: FileFromApi [])=> {
                    let nArrayOfFiles: LortomFile[] = [];

                    for(let i=0; i<response.length; i++) {
                        const file: FileFromApi = response[i];

                        nArrayOfFiles.push({
                            file: {
                                id: file.id,
                                img: file.src,
                                name: file.fileName
                            },
                            ListObj: file.ListObj
                        });
                    }
                    return nArrayOfFiles;
            })
    }


    public setFiles(array: LortomFile []) {

        this.setItem('files',array);
        this.arrayOfFiles = array;
    }

    public getFiles() {
        return this.getItem('files','arrayOfFiles') as LortomFile[];
    }

    public getFilesById(id:number): LortomFile {

        if(this.arrayOfFiles == undefined) {
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
}