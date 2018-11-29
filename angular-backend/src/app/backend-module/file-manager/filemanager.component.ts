

import {OnInit, Component, Input} from '@angular/core';
import { LortomFile } from '@Lortom/plugins/Hardel/File/Services/files.interfaces';
import { LtFile } from 'lt-drag-and-drop';
import { FilesServices } from '@Lortom/plugins/Hardel/File/Services/files.services';
import { HttpParams } from '@angular/common/http';


@Component({
    selector: 'app-filemanager',
    templateUrl: './filemanager.component.html',
    styles: ['']
})

export class FileManagerComponent implements OnInit {

    listOfFile: LortomFile[];
    arrayOfFile: LtFile[];
    @Input() sObj: string;
    @Input() nIdObj: number;
    constructor(private fiServ: FilesServices) {}
    ngOnInit() {
        const params = new HttpParams()
        .set('sObj', this.sObj)
        .set('nIdObj', this.nIdObj.toString());
        this.fiServ.getFilesFrom(params).subscribe(
            (res: LortomFile []) => {
                this.listOfFile = res;
                this.arrayOfFile = [];
                for (let i = 0; i < this.listOfFile.length; i++) {
                    const file = this.fiServ.convertLortomFileToLtFile(this.listOfFile[i]);
                    this.arrayOfFile.push(file);
                }
                this.fiServ.setFiles(res);
            }
        );
    }

    /**
     * This function save File into DB
     * @param file
     */
    updateFile(file: LtFile[]) {
        this.fiServ.saveFile(file[0].file, this.nIdObj, this.sObj).subscribe(
            (response: LortomFile) => {
                this.fiServ.setFile(response);
            }
        );
    }

    /**
     * this function delete file from list and DB
     * @param file
     */
    deletedFile(file: LtFile[]) {
        const singleFile = this.convertIntoLortomFile(file[0]);

        if (singleFile !== null) {
            this.fiServ.deleteFile(singleFile).subscribe(
                (response: any) => {
                    this.listOfFile = response;
                    this.fiServ.deleteFileFromCache();
                    this.fiServ.setFiles(response);
                }
            );
        }
    }

    /**
     * this function get lortomfile from listOfFile
     * @param file
     */
    private convertIntoLortomFile(file: LtFile): LortomFile {
        let retFile: LortomFile = null;

        for (let i = 0; i < this.listOfFile.length; i++) {
                const f = this.listOfFile[i];
                if ( f.file.id === file.id) {
                    retFile = f;
                }
        }
        return retFile;
    }
}
