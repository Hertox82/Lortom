/**
 * Created by hernan on 07/12/2017.
 */


import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {WebsiteService} from "@Lortom/plugins/Hardel/Website/Services/website.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LortomMenu} from "@Lortom/plugins/Hardel/Website/Services/website.interfaces";
import {hasOwnProperty} from "tslint/lib/utils";
@Component({
    selector: 'wb-menu-edit',
    templateUrl: './menu.component.html',
    styles: ['']
})

export class MenuComponent implements OnInit,OnDestroy {

    @Input() menu: LortomMenu;
    copyMenu: LortomMenu;
    id: number;
    isEdit: boolean;
    notFound: boolean;
    private sub: any;

    listOfParent: {id: number, label: string} [];
    listOfPages: {id: any, label: string} [];

    constructor(private nnService: WebsiteService, private router: ActivatedRoute, private nav: Router) {
        this.isEdit = false;
        this.sub = this.router.params.subscribe(
            (params) => {
                this.id = +params['id'];
                this.menu = this.nnService.getMenuByProperty('id', this.id);
                if (this.menu != null) {
                    this.notFound = true;
                } else {
                    this.nav.navigate(['/backend/not-found']);
                }
                this.cloneMenu();
            }
        );

        this.nnService.getMenuAtt().subscribe(
            (data : any) => {
                this.listOfPages = data.pageList;
                this.listOfParent = data.parentList;
            }
        );
    }
    ngOnInit() {}

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    comparePage(c1:{id:any, label:string}, c2:{id:any, label:string}) {
        return c1 && c2 ? c1.id == c2.id : c1 == c2;
    }

    compareParent(c1: {id:number, label:string}, c2:{id:number, label:string}) {
        return c1 && c2 ? c1.id == c2.id : c1 == c2;
    }

    cloneMenu() {
        const idPage = Object.assign({},this.menu.idPage);
        this.copyMenu = Object.assign({},this.menu);
        this.copyMenu.idPage = idPage;
        if(hasOwnProperty(this.menu,'parentList')){
            const parentList = Object.assign({},this.menu.parentList);
            this.copyMenu.parentList = parentList;
        }
    }

    editMode() {
        this.isEdit = !this.isEdit;
    }

    saveMode() {

        if (!this.isEqual(this.menu,this.copyMenu) && this.isEdit == true) {
            const objToSend = {
                id: this.menu.id,
                name: this.menu.name,
                idParent: this.menu.parentList.id,
                idPage: this.menu.idPage.id
            };
            this.nnService.saveMenu(objToSend).subscribe(
                (menu : LortomMenu) => {
                    this.menu = menu;
                    this.cloneMenu();
                    this.nnService.updateMenuInList(this.menu);
                    this.nnService.updateListOfMenus();
                    this.editMode();
                }
            );
        }
    }

    resetMode(){
        if (confirm('Do you want to reset all data?')) {
            this.cloneCopyMenu();
        }
    }

    isEqual(v1,v2)
    {
        return ((v1.name == v2.name) && (v1.parentList == v2.parentList) && (v1.idPage == v2.idPage))
    }

    cloneCopyMenu() {
        const idPage = Object.assign({},this.copyMenu.idPage);
        this.menu = Object.assign({},this.copyMenu);
        this.menu.idPage = idPage;
        if(hasOwnProperty(this.copyMenu,'parentList')){
            const parentList = Object.assign({},this.copyMenu.parentList);
            this.menu.parentList = parentList;
        }
    }
}