/**
 * Created by hernan on 20/11/2017.
 */



import {Component, OnInit} from "@angular/core";
import {LortomComponent} from "@Lortom/plugins/Hardel/Website/Services/website.interfaces";
import {WebsiteService} from "@Lortom/plugins/Hardel/Website/Services/website.service";
import {NavigationEnd, Router} from "@angular/router";
import {ListComponent} from "@Lortom/model/list.component";
@Component({
    selector : 'wb-components',
    templateUrl : './components.component.html',
    styles : ['']
})


export class ComponentsComponent extends ListComponent implements OnInit
{
    listOfComponents : LortomComponent [] = [];
    myRoot = '/backend/website/components';
    isRoot = false;
    listaComponentsDelete : LortomComponent[];

    constructor(private ccService : WebsiteService, private router : Router) {

        super();
        if(!this.ccService.hasPermissions("Hardel.Website.Component"))
        {
            this.router.navigate(['/backend/dashboard']);
        }

        this.listaComponentsDelete = [];
        this.listOfComponents = [];

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

        this.retrieveListOfComponents();
        this.ccService.updateComponents$.subscribe(
            () => {
                this.retrieveListOfComponents();
            }
        );
    }
    ngOnInit(){}

    retrieveListOfComponents()
    {
        if(!this.ccService.checkComponentsExist())
        {
            this.ccService.getComponentsFrom().subscribe(
                (components: LortomComponent[]) => {

                    this.listOfComponents = components;
                    this.listOfData = this.listOfComponents;
                    this.listOfComponents.forEach((el : LortomComponent) => {
                        el.check = false;
                    });
                    this.ccService.setComponents(this.listOfComponents);
                    this.updateListaShow();
                }
            );
        }
        else {
            this.listOfComponents = this.ccService.getComponents();
            this.listOfData = this.listOfComponents;
            this.listOfComponents.forEach((item : any) => {
                if(!item.hasOwnProperty('check'))
                {
                    item.check = false;
                }
            });
            this.updateListaShow();
        }
    }

    eventChange(ev,data : LortomComponent) : void
    {
        if(ev.target.checked)
        {
            this.listaComponentsDelete.push(data);
        }
        else
        {
            let index = this.listaComponentsDelete.indexOf(data);

            if(index > -1)
            {
                this.listaComponentsDelete.splice(index,1);
            }
        }
    }

    deleteComponents()
    {
        if(this.listaComponentsDelete.length > 0)
        {
            if(confirm('Do you really want delete this Roles?'))
            {
                this.ccService.deleteComponents(this.listaComponentsDelete).subscribe(
                    (data : any) => {
                        this.listaComponentsDelete = [];
                        this.listOfComponents = data;
                        this.listOfData = this.listOfComponents;
                        this.ccService.setComponents(this.listOfComponents);
                        this.updateListaShow();
                    }
                );
            }
        }
    }
}
