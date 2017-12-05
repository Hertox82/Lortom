/**
 * Created by hernan on 05/12/2017.
 */



import {Component, OnInit} from "@angular/core";
import {LortomMenu} from "@Lortom/plugins/Hardel/Website/Services/website.interfaces";
import {PaginationService} from "@Lortom/services/pagination.service";
import {WebsiteService} from "@Lortom/plugins/Hardel/Website/Services/website.service";
import {NavigationEnd, Router} from "@angular/router";
@Component({
    selector: 'wb-menus',
    templateUrl: './menus.component.html',
    styles: ['']
})

export class MenusComponent implements OnInit {
    listOfMenus : LortomMenu [] = [];
    listShowMenus : LortomMenu [];
    myRoot = '/backend/website/menu';
    isRoot = false;
    actualPage : number;
    perPage : number;
    pagServ : PaginationService;

    listaMenusDelete : LortomMenu[];

    constructor(private mcService : WebsiteService, private router : Router) {

        if(!this.mcService.hasPermissions("Hardel.Website.Menu"))
        {
            this.router.navigate(['/backend/dashboard']);
        }

        this.listaMenusDelete = [];
        this.listOfMenus = [];

        //This is to manage the Pagination
        this.pagServ = new PaginationService();
        this.actualPage = 1;
        this.perPage = 3;

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

            this.listOfMenus.forEach((item : any) => {
                if(!item.hasOwnProperty('check'))
                {
                    item.check = false;
                }
            });
            this.updateListaShow();
        }
    }

    onPerPage(n : number)
    {
        this.perPage = n;
        this.updateListaShow();
    }

    private updateListaShow()
    {
        this.listShowMenus = this.pagServ.getShowList({
            entry : this.perPage,
            list : this.listOfMenus,
            pageToShow : this.actualPage
        });
    }

    onPrev()
    {
        this.actualPage--;
        this.updateListaShow();
    }

    onNext(ev)
    {
        this.actualPage++;
        this.updateListaShow();
    }

    onPage(page)
    {
        this.actualPage = page;
        this.updateListaShow();
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
                console.log(this.listaMenusDelete);
                this.mcService.deleteMenus(this.listaMenusDelete).subscribe(
                    (data : any) => {
                        this.listaMenusDelete = [];
                        this.listOfMenus = data;
                        this.mcService.setMenus(this.listOfMenus);
                        this.updateListaShow();
                    }
                );
            }
        }
    }
}
