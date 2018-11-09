import {Component, OnInit} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";
import {FilesServices} from "@Lortom/plugins/Hardel/File/Services/files.services";
import {LortomFile} from "@Lortom/plugins/Hardel/File/Services/files.interfaces";

@Component({
    selector: 'app-files',
    templateUrl: './files.component.html',
    styleUrls: ['./files.component.css']
})

export class FilesComponent implements OnInit {
    isRoot: boolean;
    myRoot = '/backend/file';


    public listOfFile: LortomFile[] = [];

    constructor (private rout: Router,  public fserv: FilesServices)
    {
        this.isRoot = true;

        this.fserv.getFilesFrom().subscribe(
            (res: LortomFile []) => {
                this.listOfFile = res;
                this.fserv.setFiles(res);
            }
        );

        this.rout.events.subscribe(
            (val) => {
                if (val instanceof NavigationEnd) {
                    if (this.myRoot === val.url) {
                        this.isRoot = true;
                    } else {
                        this.isRoot = false;
                    }
                }
            }
        );

    }


    ngOnInit() {}

    editFile(file: {name: string, src: string}) {
        console.log(file);
    }
}