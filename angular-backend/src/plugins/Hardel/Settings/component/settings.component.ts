/**
 * Created by hernan on 17/10/2017.
 */



import {Component, OnInit} from "@angular/core";
import {SettingsService} from "../Services/settings.service";
import {NavigationEnd, Router} from "@angular/router";
@Component({
    selector:'app-settings',
    templateUrl:'./settings.component.html'
})

export class SettingsComponent implements OnInit
{
    isRoot : boolean;
    myRoot = '/backend/settings';
    constructor(private eService : SettingsService, private router : Router) {
        this.isRoot = true;
        //trigger the event for the overview
        this.eService.oc$.subscribe(
            (data : boolean) => {
                this.isRoot = data;
            }
        );

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

    ngOnInit() {

    }
}