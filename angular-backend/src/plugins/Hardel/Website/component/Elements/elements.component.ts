/**
 * Created by hernan on 16/11/2017.
 */


import {Component, OnInit} from "@angular/core";
import {WebsiteService} from "../../Services/website.service";
import {NavigationEnd, Router} from "@angular/router";
import {LortomElement} from "../../Services/website.interfaces";
import {PaginationService} from "../../../../../services/pagination.service";
@Component({
    selector : 'wb-elements',
    templateUrl : './elements.component.html',
    styles : ['']
})

export class ElementsComponent implements OnInit
{
    listOfElements : LortomElement [] = [];
    listShowElements : LortomElement [];
    myRoot = '/backend/website/elements';
    isRoot = false;
    actualPage : number;
    perPage : number;
    pagServ : PaginationService;

    listaElementsDelete : LortomElement[];

    constructor(private ecService : WebsiteService, private router : Router) {

        if(!this.ecService.hasPermissions("Hardel.Website.Element"))
        {
            this.router.navigate(['/backend/dashboard']);
        }

        this.listaElementsDelete = [];
        this.listOfElements = [];

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

        this.retrieveListOfElements();
        this.ecService.updateElements$.subscribe(
            () => {
                this.retrieveListOfElements();
            }
        );
    }
    ngOnInit(){}

    retrieveListOfElements()
    {
        if(!this.ecService.checkElementsExist())
        {
            this.ecService.getElementsFrom().subscribe(
                (elements: LortomElement[]) => {

                    this.listOfElements = elements;
                    this.listOfElements.forEach((el : LortomElement) => {
                        el.check = false;
                    });
                    this.ecService.setElements(this.listOfElements);
                    this.updateListaShow();
                }
            );
        }
        else {
            this.listOfElements = this.ecService.getElements();

            this.listOfElements.forEach((item : any) => {
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
    }

    private updateListaShow()
    {
        this.listShowElements = this.pagServ.getShowList({
            entry : this.perPage,
            list : this.listOfElements,
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

    eventChange(ev,data : LortomElement) : void
    {
        if(ev.target.checked)
        {
            this.listaElementsDelete.push(data);
        }
        else
        {
            let index = this.listaElementsDelete.indexOf(data);

            if(index > -1)
            {
                this.listaElementsDelete.splice(index,1);
            }
        }
    }

    deleteElements()
    {
        if(this.listaElementsDelete.length > 0)
        {
            if(confirm('Do you really want delete this Roles?'))
            {
                console.log(this.listaElementsDelete);
                this.ecService.deleteElements(this.listaElementsDelete).subscribe(
                    (data : any) => {
                        this.listaElementsDelete = [];
                        this.listOfElements = data;
                        this.ecService.setElements(this.listOfElements);
                        this.updateListaShow();
                    }
                );
            }
        }
    }
}
