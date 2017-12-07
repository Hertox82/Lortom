/**
 * Created by hernan on 20/11/2017.
 */

import {Component, OnInit} from "@angular/core";
import { LortomComponent } from "@Lortom/plugins/Hardel/Website/Services/website.interfaces";
import {WebsiteService} from "@Lortom/plugins/Hardel/Website/Services/website.service";
import {Router} from "@angular/router";
@Component({
    selector : 'wb-new-component',
    templateUrl : './componentnew.component.html',
    styles : ['']
})

export class NewComponent implements OnInit
{
    component : LortomComponent;
    copyComponent : LortomComponent;
    id : number;
    private sub : any;
    isEdit : boolean;
    query : string;
    config : any;

    constructor(private ncsService : WebsiteService, private router : Router){
        this.isEdit = false;
        this.query = '';
        this.config = {
            lineNumbers: true,
            mode : 'htmlmixed',
            styleActiveLine: true,
            matchBrackets: true,
            theme:'dracula'
        };

        this.component = {
            id: -1,
            name : '',
            check : false,
            appearance : '',
        }
    }
    ngOnInit(){
        this.retriveElement();
    }

    private retriveElement() {
        this.cloneComponent();
    }

    /**
     * This function go to save Mode
     */
    saveMode() {
        //salva i cambiamenti

        if(!this.isEqual(this.component,this.copyComponent))
        {
            if(this.component.name.length == 0)
            {
                alert('You must write a name of Role, please!');
                this.cloneCopyComponent();
                return;
            }

            this.ncsService.createComponent(this.component).subscribe(
                (data : any) => {
                    if(!data.hasOwnProperty('check'))
                    {
                        data.check = false;
                    }
                    //push the item into roles
                    this.ncsService.setComponent(data);
                    this.ncsService.updateListOfComponents();
                    //navigate to Settings Roles
                    this.router.navigate(['/backend/website/components']);
                }
            );

        }
    }

    resetMode(){
        if (confirm('Do you want to reset all data?')) {
            this.cloneCopyComponent();
        }
    }

    isEqual(v,v2) : boolean
    {
        return (v.name == v2.name) && (v.appearance == v2.appearance)
    }

    /**
     * This function clone the Role
     */
    cloneComponent(){
        this.copyComponent = Object.assign({},this.component);
    }

    /**
     * This function clone the CopyRole
     */
    cloneCopyComponent()
    {
        this.component = Object.assign({},this.copyComponent);
    }
}
