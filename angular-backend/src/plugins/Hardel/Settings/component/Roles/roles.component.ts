/**
 * Created by hernan on 30/10/2017.
 */


import {Component, OnInit} from "@angular/core";
import {SettingsService} from "../../Services/settings.service";
import {Role} from "../../Services/settings.interfaces";
import {NavigationEnd, Router} from "@angular/router";
import {hasOwnProperty} from "tslint/lib/utils";
import {PaginationService} from "../../../../../services/pagination.service";

@Component({
    selector : 'app-roles-component',
    templateUrl : './roles.component.html',
    styles : ['']
})

export class RolesComponent implements OnInit
{
    listaRole : Role[] = [];
    listaShowRole : Role[];
    myRoot = '/backend/settings/roles';
    isRoot = false;
    actualPage : number;
    perPage : number;
    pagServ : PaginationService;

    listaRoleDelete : Role[];

    constructor(private c_Service : SettingsService, private router :Router) {

        if(!this.c_Service.hasPermissions("Hardel.Settings.Roles"))
        {
            this.router.navigate(['/backend/dashboard']);
        }
        //This is to manage the Pagination
        this.pagServ = new PaginationService();
        this.actualPage = 1;
        this.perPage = 3;

        this.listaRoleDelete = [];

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
            this.retrieveListOfRoles();
            this.c_Service.updateRoles$.subscribe(
                () => {
                    this.retrieveListOfRoles();
                }
            );

    }

    ngOnInit() {
    }

    retrieveListOfRoles() : void
    {
        if(!this.c_Service.checkRolesExist())
        {
            this.c_Service.getRolesFrom().subscribe(
                (roles: Role[]) => {

                    this.listaRole = roles;
                    this.listaRole.forEach((role : Role) => {
                        role.state = false;
                    });
                    this.c_Service.setRoles(this.listaRole);
                    this.updateListaShow();
                }
            );
        }
        else {
            this.listaRole = this.c_Service.getRoles();
            this.listaRole.forEach((item : any) => {
                if(!item.hasOwnProperty('state'))
                {
                    item.state = false;
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
        this.listaShowRole = this.pagServ.getShowList({
            entry : this.perPage,
            list : this.listaRole,
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

    /**
     * function to push or splice item into Deleted List of Roles
     * @param ev
     * @param data
     */
    eventChange(ev,data : Role) : void
    {
        if(ev.target.checked)
        {
            this.listaRoleDelete.push(data);
        }
        else
        {
            let index = this.listaRoleDelete.indexOf(data);

            if(index > -1)
            {
                this.listaRoleDelete.splice(index,1);
            }
        }
    }

    deleteRoles()
    {
        if(this.listaRoleDelete.length > 0)
        {
            if(confirm('Do you really want delete this Roles?'))
            {
                this.c_Service.deleteRoles(this.listaRoleDelete).subscribe(
                    (data : any) => {
                        this.listaRoleDelete = [];
                        this.listaRole = data;
                        this.c_Service.setRoles(this.listaRole);
                        this.updateListaShow();
                    }
                );
            }
        }
    }
}