import {Component, OnInit} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";
@Component({
    selector: 'app-website',
    templateUrl: './website.component.html',
})

export class WebsiteComponent implements OnInit {
    isRoot : boolean;
    myRoot = '/backend/website';
    constructor(private router: Router){
        this.isRoot = true;

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
    }
    ngOnInit() {}
}