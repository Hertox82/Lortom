/**
 * Created by hernan on 07/11/2018.
 */


import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LortomFile} from '@Lortom/plugins/Hardel/File/Services/files.interfaces';
import {FilesServices} from '@Lortom/plugins/Hardel/File/Services/files.services';

@Component({
    selector: 'app-file-edit',
    templateUrl: './file.component.html',
    styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

    private sub: any;
    id: number;
    cFile: LortomFile;
    notFound = false;
    public isEdit = false;
    cFileClone: LortomFile;

    constructor(private sFileSer: FilesServices, private router: ActivatedRoute, private nav: Router) {
        this.sub = this.router.params.subscribe(
            (params) => {
                this.id = +params['id'];
                this.cFile = this.sFileSer.getFilesById(this.id);
                this.cloneFile();
            }
        );
    }
    ngOnInit() {}

    /**
     * This function clone the file
     */
    cloneFile(): void {
        this.cFileClone = Object.assign({}, this.cFile);
        this.cFileClone.file = Object.assign({}, this.cFile.file);
        if (this.cFile.ListObj !== undefined) {
            this.cFileClone.ListObj = [];
            for ( let i = 0; i < this.cFile.ListObj.length; i++) {
                this.cFileClone.ListObj.push(this.cFile.ListObj[i]);
            }
        }
    }

    /**
     * This function clone the copyFile
     */
    cloneCopyFile(): void {
        this.cFile = Object.assign({}, this.cFileClone);
        this.cFile.file = Object.assign({}, this.cFileClone.file);
        if (this.cFileClone.ListObj !== undefined) {
            this.cFile.ListObj = [];
            for (let i = 0; i < this.cFileClone.ListObj.length; i++) {
                this.cFile.ListObj.push(this.cFileClone.ListObj[i]);
            }
        }
    }

    editMode() {
        this.isEdit = !this.isEdit;
    }

    /**
     * this function edit the File
     */
    saveEdit() {
        if (this.cFile.file.name !== this.cFileClone.file.name) {
            // send via API the modification
            if (this.cFile.file.name.length === 0) {
                alert('You must write a File Name, please!');
                this.cloneCopyFile();
                return;
            }

            this.sFileSer.editFile(this.cFile).subscribe(
                (file: LortomFile) => {
                    this.cFile = file;
                   this.cloneFile();
                   this.sFileSer.updateFileInList(this.cFile);
                }
            );
        }
    }
}
