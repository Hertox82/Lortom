/**
 * Created by hernan on 17/10/2017.
 */

import {Component, OnInit} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";
@Component({
    selector: 'app-plugin',
    templateUrl: './plugin.component.html'
})


export class PluginComponent implements OnInit
{
    isRoot : boolean;
    myRoot = '/backend/plugin';
    constructor(private pr: Router) {
        this.isRoot = true;

        this.pr.events.subscribe(
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

    ngOnInit(){

    }
}