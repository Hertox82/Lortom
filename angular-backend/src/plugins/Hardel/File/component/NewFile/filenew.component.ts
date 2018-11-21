/**
 * Hernan
 * 15-11-2018
 */


import { Component, OnInit } from '@angular/core';
import { LtFile } from 'lt-drag-and-drop';
import { FilesServices } from '../../Services/files.services';

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
        console.log('update file');
        console.log(file);
        this.srvFile.saveFile(file[0].file).subscribe(
            (response: any) => {
                console.log(response);
            }
        );

    }
    deletedFile(files)  {
        console.log('delete file');
        console.log(files);
    }
}
