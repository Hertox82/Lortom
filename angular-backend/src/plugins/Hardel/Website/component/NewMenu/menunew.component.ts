/**
 * Created by hernan on 05/12/2017.
 */


import {Component, OnInit} from "@angular/core";
import {LortomMenu} from "@Lortom/plugins/Hardel/Website/Services/website.interfaces";
import {WebsiteService} from "@Lortom/plugins/Hardel/Website/Services/website.service";
import {hasOwnProperty} from "tslint/lib/utils";
import {Router} from "@angular/router";
@Component({
    selector: 'wb-new-menu',
    templateUrl: './menunew.component.html',
    styles: ['']
})

export class MenuNewComponent implements OnInit {

    menu: LortomMenu;
    copyMenu: LortomMenu;

    listOfParent: {id: number, label: string} [];
    listOfPages: {id: any, label: string} [];

    constructor(private nmService: WebsiteService, private route: Router) {
        this.menu = {
            id: -1,
            name: '',
            idParent: 0,
            idPage: {id:null, label:''},
            check:false
        };

        this.nmService.getMenuAtt().subscribe(
            (data : any) => {
                this.listOfPages = data.pageList;
                this.listOfParent = data.parentList;
            }
        );
        this.cloneMenu();
    }
    ngOnInit() {

    }

    saveMenu(){

        if (!this.isEqual(this.menu,this.copyMenu))  {
            this.menu.idParent = this.menu.parentList.id;
            const objToSend = {
                id: -1,
                name: this.menu.name,
                idParent: this.menu.parentList.id,
                idPage: this.menu.idPage.id
            };

            this.nmService.createMenu(objToSend).subscribe(
                (menu: LortomMenu) => {
                    this.nmService.setMenu(menu);
                    this.nmService.updateListOfMenus();
                    this.route.navigate(['/backend/website/menu']);
                }
            );
        }
    }

    resetMode(){
        if (confirm('Do you want to reset all data?')) {
            this.cloneCopyMenu();
        }
    }

    cloneMenu(){
        const idPage = Object.assign({},this.menu.idPage);
        this.copyMenu = Object.assign({},this.menu);
        this.copyMenu.idPage = idPage;
        if(hasOwnProperty(this.menu,'parentList')){
            const parentList = Object.assign({},this.menu.parentList);
            this.copyMenu.parentList = parentList;
        }
    }

    isEqual(v1,v2)
    {
        return ((v1.name == v2.name) && (v1.parentList == v2.parentList) && (v1.idPage == v2.idPage))
    }

    cloneCopyMenu(){
        const idPage = Object.assign({},this.copyMenu.idPage);
        this.menu = Object.assign({},this.copyMenu);
        this.menu.idPage = idPage;
        if(hasOwnProperty(this.copyMenu,'parentList')){
            const parentList = Object.assign({},this.copyMenu.parentList);
            this.menu.parentList = parentList;
        }
    }
}