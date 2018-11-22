/**
 * Hernan
 * 15-11-2018
 */


import { Component, OnInit } from '@angular/core';
import { LtFile } from 'lt-drag-and-drop';
import { FilesServices } from '../../Services/files.services';
import { LortomFile } from '../../Services/files.interfaces';

@Component({
    selector: 'app-file-new',
    templateUrl: './filenew.component.html',
    styleUrls: ['./filenew.component.css']
})
export class FileNewComponent implements OnInit {

    listOfFile: LtFile[] = [];

    constructor(private srvFile: FilesServices) {}

    ngOnInit() {}

    updateFile(file: LtFile[]) {
        this.srvFile.saveFile(file[0].file).subscribe(
            (response: LortomFile) => {
                console.log(response);
                this.srvFile.setFile(response);
            }
        );

    }
    deletedFile(files)  {
        console.log('delete file');
        console.log(files);
    }
}
