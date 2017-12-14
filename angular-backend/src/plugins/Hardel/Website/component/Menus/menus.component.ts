/**
 * Created by hernan on 05/12/2017.
 */



import {Component, OnInit} from "@angular/core";
import {LortomMenu} from "@Lortom/plugins/Hardel/Website/Services/website.interfaces";
import {WebsiteService} from "@Lortom/plugins/Hardel/Website/Services/website.service";
import {NavigationEnd, Router} from "@angular/router";
import {ListComponent} from "@Lortom/model/list.component";
@Component({
    selector: 'wb-menus',
    templateUrl: './menus.component.html',
    styles: ['']
})

export class MenusComponent extends ListComponent implements OnInit {
    listOfMenus : LortomMenu [] = [];
    myRoot = '/backend/website/menu';
    isRoot = false;

    listaMenusDelete : LortomMenu[];

    constructor(private mcService : WebsiteService, private router : Router) {

        super();

        if(!this.mcService.hasPermissions("Hardel.Website.Menu"))
        {
            this.router.navigate(['/backend/dashboard']);
        }

        this.listaMenusDelete = [];
        this.listOfMenus = [];


        this.router.events.subscribe(
            (val) => {
                if(val instanceof NavigationEnd)
                {
                    if(this.myRoot === val.url)
                    {
                        this.isRoot = true;
                    }
                    else
                    {
                        this.isRoot = false;
                    }
                }
            }
        );

        this.retrieveListOfMenus();
        this.mcService.updateMenus$.subscribe(
            () => {
                this.retrieveListOfMenus();
            }
        );
    }
    ngOnInit(){}

    retrieveListOfMenus()
    {
        if(!this.mcService.checkMenusExist())
        {
            this.mcService.getMenusFrom().subscribe(
                (menus: LortomMenu[]) => {

                    this.listOfMenus = menus;
                    this.listOfData = this.listOfMenus;
                    this.listOfMenus.forEach((el : LortomMenu) => {
                        el.check = false;
                    });
                    this.mcService.setMenus(this.listOfMenus);
                    this.updateListaShow();
                }
            );
        }
        else {
            this.listOfMenus = this.mcService.getMenus();
            this.listOfData = this.listOfMenus;
            this.listOfMenus.forEach((item : any) => {
                if(!item.hasOwnProperty('check'))
                {
                    item.check = false;
                }
            });
            this.updateListaShow();
        }
    }

    eventChange(ev,data : LortomMenu) : void
    {
        if(ev.target.checked)
        {
            this.listaMenusDelete.push(data);
        }
        else
        {
            let index = this.listaMenusDelete.indexOf(data);

            if(index > -1)
            {
                this.listaMenusDelete.splice(index,1);
            }
        }
    }

    deleteMenus()
    {
        if(this.listaMenusDelete.length > 0)
        {
            if(confirm('Do you really want delete this Roles?'))
            {
                this.mcService.deleteMenus(this.listaMenusDelete).subscribe(
                    (data : any) => {
                        this.listaMenusDelete = [];
                        this.listOfMenus = data;
                        this.listOfData = this.listOfMenus;
                        this.mcService.setMenus(this.listOfMenus);
                        this.updateListaShow();
                    }
                );
            }
        }
    }
}
