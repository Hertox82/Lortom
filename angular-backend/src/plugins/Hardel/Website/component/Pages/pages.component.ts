


import {Component, OnInit} from "@angular/core";
import {Page} from "../../Services/website.interfaces";
import {WebsiteService} from "../../Services/website.service";
import {NavigationEnd, Router} from "@angular/router";
@Component({
    selector : 'wb-pages',
    templateUrl : './pages.component.html',
    styles : ['']
})

export class PagesComponent implements OnInit
{
    listaPages : Page[];
    myRoot = '/backend/website/pages';
    isRoot = false;

    listaPageDelete : Page[];

    constructor(private wb_Service : WebsiteService, private router :Router) {

        if(!this.wb_Service.hasPermissions("Hardel.Website.Pages"))
        {
            this.router.navigate(['/backend/dashboard']);
        }
        this.listaPageDelete = [];

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
        this.retrieveListOfPages();
        this.wb_Service.updatePages$.subscribe(
            () => {
                this.retrieveListOfPages();
            }
        );

        console.log(this.listaPages);

    }

    ngOnInit() {
    }

    retrieveListOfPages() : void
    {
        if(!this.wb_Service.checkPagesExist())
        {
            this.wb_Service.getPagesFrom().subscribe(
                (pages: Page[]) => {

                    this.listaPages = pages;
                    this.listaPages.forEach((page : Page) => {
                        page.check = false;
                    });
                    this.wb_Service.setPages(this.listaPages);
                }
            );
        }
        else {
            this.listaPages = this.wb_Service.getPages();
            this.listaPages.forEach((item : any) => {
                if(!item.hasOwnProperty('check'))
                {
                    item.check = false;
                }
            });
        }
    }

    /**
     * function to push or splice item into Deleted List of Roles
     * @param ev
     * @param data
     */
    eventChange(ev,data : Page) : void
    {
        if(ev.target.checked)
        {
            this.listaPageDelete.push(data);
        }
        else
        {
            let index = this.listaPageDelete.indexOf(data);

            if(index > -1)
            {
                this.listaPageDelete.splice(index,1);
            }
        }
    }

    deletePages()
    {
        if(this.listaPageDelete.length > 0)
        {
            if(confirm('Do you really want delete this Roles?'))
            {
                this.wb_Service.deletePages(this.listaPageDelete).subscribe(
                    (data : any) => {
                        this.listaPageDelete = [];
                        this.listaPages = data;
                        this.wb_Service.setPages(this.listaPages);
                    }
                );
            }
        }
    }
}
