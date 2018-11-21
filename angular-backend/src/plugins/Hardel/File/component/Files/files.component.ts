import {
    AfterViewInit, Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild,
    ViewContainerRef,
    TemplateRef,
    AfterViewChecked
} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router,Event as NavigationEvent} from '@angular/router';
import {FilesServices} from '@Lortom/plugins/Hardel/File/Services/files.services';
import {LortomFile} from '@Lortom/plugins/Hardel/File/Services/files.interfaces';
import {BreadCrumbsComponent} from '@Lortom-Backend/breadcrumbs';

@Component({
    selector: 'app-files',
    templateUrl: './files.component.html',
    styleUrls: ['./files.component.css']
})

export class FilesComponent implements OnInit, OnDestroy, AfterViewInit {
    isRoot: boolean;
    myRoot = '/backend/file';
    sub;
    navEnd: NavigationEnd;

    @ViewChild('bread', {read: ViewContainerRef}) breadCmp: ViewContainerRef;


    public listOfFile: LortomFile[] = [];

    constructor (public fserv: FilesServices,
                 private actRoute: ActivatedRoute,
                 public rt: Router,
                 private resolv: ComponentFactoryResolver) {
        this.isRoot = true;
        this.rt.events.forEach((event: NavigationEvent) => {
            if (event instanceof NavigationEnd) {
               this.navEnd = event;
            }
        });
        this.sub = this.rt.events.subscribe(
            (val) => {
                if (val instanceof NavigationEnd) {
                    // this.br.setBreadCrumbs(val,this.actRoute.root);

                    if (this.myRoot === val.url) {
                        this.isRoot = true;
                    } else {
                        this.isRoot = false;
                    }

                    this.loadComponent();
                }
            }
        );

      // console.log(this.br);

    }

    ngAfterViewInit() {
       this.loadComponent();
    }

    /**
     * This function load dynamically the Breadcrumb component
     */
    loadComponent() {
        setTimeout(() => {
            if (this.breadCmp !== undefined) {
                const breadComp = this.resolv.resolveComponentFactory(BreadCrumbsComponent);
                this.breadCmp.clear();
                const breadRef = <BreadCrumbsComponent> this.breadCmp.createComponent(breadComp).instance;
                breadRef.setBreadCrumbs(this.navEnd, this.actRoute.root);
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }


    ngOnInit() {
        this.fserv.getFilesFrom().subscribe(
            (res: LortomFile []) => {
                this.listOfFile = res;
                this.fserv.setFiles(res);
            }
        );
    }

    editFile(file: {name: string, src: string}) {
        console.log(file);
    }

    deleteFile(file: LortomFile) {
        // todo
        console.log(file);

        // call Api in order to delete references from Database and Server
        // when response come, delete file from listOfArray
    }
}
