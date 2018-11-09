/**
 * Created by hernan on 07/11/2018.
 */


import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {LortomFile} from "@Lortom/plugins/Hardel/File/Services/files.interfaces";
import {FilesServices} from "@Lortom/plugins/Hardel/File/Services/files.services";

@Component({
    selector: 'app-file-edit',
    templateUrl: './file.component.html',
    styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

    private sub: any;
    id: number;
    cFile: LortomFile;
    notFound: boolean = false;
    public isEdit:boolean = false;
    cFileClone: LortomFile;

    constructor(private sFileSer: FilesServices,private router: ActivatedRoute, private nav: Router){
        this.sub = this.router.params.subscribe(
            (params) => {
                this.id = +params['id'];
                this.cFile = this.sFileSer.getFilesById(this.id);
                this.cloneFile();

                console.log(this.cFileClone);
            }
        );
    }
    ngOnInit(){}


    cloneFile() {
        this.cFileClone = Object.assign({},this.cFile);
        this.cFileClone.file = Object.assign({},this.cFile.file);
        if(this.cFile.ListObj !== undefined) {
            this.cFileClone.ListObj = [];
            for(let i=0; i<this.cFile.ListObj.length; i++) {
                this.cFileClone.ListObj.push(this.cFile.ListObj[i]);
            }
        }
    }

    editMode() {
        this.isEdit = !this.isEdit;
    }
}