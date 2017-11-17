/**
 * Created by hernan on 06/11/2017.
 */

import {Component, OnInit} from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from "@angular/router";
import "rxjs/add/operator/filter";

interface IBreadcrumb {
    label: string;
    params: Params;
    url: string;
    active : boolean;
}

@Component({
    selector : 'breadcrumbs',
    templateUrl : './breadcrumbs.component.html',
    styles : ['']
})

export class BreadCrumbsComponent implements OnInit{

    public breadcrumbs: IBreadcrumb[];

    private basePath : string;


    constructor( private activatedRoute: ActivatedRoute,private router: Router) {
        this.breadcrumbs = [];
        const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";

        //subscribe to the NavigationEnd event
        this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event : NavigationEnd) => {
            //set breadcrumbs
            let root: ActivatedRoute = this.activatedRoute.root;
            this.breadcrumbs = this.sanitizeBreadcrumbs(event,this.getBreadcrumbs(root));
        });
    }
    ngOnInit() {

    }

    private sanitizeBreadcrumbs (route : NavigationEnd, breadcrumbs : IBreadcrumb[]) : IBreadcrumb[]
    {
        for(let b of breadcrumbs)
        {
            if(b.url == route.url)
            {
                b.active = true;
            }
        }
        //console.log(breadcrumbs);
        return breadcrumbs;
    }

    private getBreadcrumbs(route: ActivatedRoute, url: string="", breadcrumbs: IBreadcrumb[]=[]): IBreadcrumb[] {
        const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";

        //get the child routes
        let children: ActivatedRoute[] = route.children;

        //return if there are no more children
        if (children.length === 0) {
            return breadcrumbs;
        }

        //iterate over each children
        for (let child of children) {
            if(child.routeConfig.hasOwnProperty('loadChildren'))
            {
                this.basePath = child.routeConfig.path;
            }
            //verify primary route
            if (child.outlet !== PRIMARY_OUTLET) {
                continue;
            }

            //verify the custom data property "breadcrumb" is specified on the route
            if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
                return this.getBreadcrumbs(child, url, breadcrumbs);
            }
            //get the route's URL segment

            if(child.snapshot.url.length > 0) {
                let routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");

                //append route URL to URL
                url += `/${routeURL}`;
            }
            else
            {
                url = `/${this.basePath}`;
            }

            //add breadcrumb
            let breadcrumb: IBreadcrumb = {
                label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
                params: child.snapshot.params,
                url: url,
                active: false
            };
            breadcrumbs.push(breadcrumb);

            //recursive
            return this.getBreadcrumbs(child, url, breadcrumbs);
        }
    }
}