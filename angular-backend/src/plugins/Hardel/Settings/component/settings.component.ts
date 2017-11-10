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
    constructor(private router : Router, private service : SettingsService) {
        if(!this.service.hasPermissions('Hardel.Settings'))
        {
            this.router.navigate(['/backend/dashboard']);
        }

        this.isRoot = true;
        //trigger the event for the overview
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