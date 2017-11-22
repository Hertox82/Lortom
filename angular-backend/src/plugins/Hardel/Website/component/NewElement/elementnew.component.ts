/**
 * Created by hernan on 17/11/2017.
 */


import {Component, OnInit} from "@angular/core";
import {LortomElement} from "../../Services/website.interfaces";
import {WebsiteService} from "../../Services/website.service";
import {Router} from "@angular/router";
@Component({
    selector : 'wb-new-element',
    templateUrl : './elementnew.component.html',
    styles : ['']
})

export class ElementNewComponent implements OnInit
{
    element : LortomElement;
    copyElement : LortomElement;
    config : any;

    constructor(private neService : WebsiteService, private router : Router) {
        this.element = {
            id : -1,
            name: '',
            Object : '',
            functions : '',
            appearance : '',
            check : false
        };


        this.config = {
            lineNumbers: true,
            mode : 'htmlmixed',
            styleActiveLine: true,
            matchBrackets: true,
            theme:'dracula'
        };
        this.cloneElement();

    }
    ngOnInit() {}

    saveMode() : void
    {
        if(!this.isEqual(this.element,this.copyElement))
        {
            this.neService.createElement(this.element).subscribe(
                (element: LortomElement) => {
                    this.neService.setElement(element);
                    this.neService.updateListOfElements();
                    this.router.navigate(['/backend/website/elements']);
                }
            );
        }
    }

    resetMode() : void
    {
        if(confirm("Do you really want reset all fields?"))
        {
            this.cloneCopyElement();
        }
    }

    cloneElement() : void
    {
        this.copyElement = Object.assign({},this.element);
    }

    cloneCopyElement() : void
    {
        this.element = Object.assign({},this.copyElement);
    }

    isEqual(v1,v2)
    {
        return (v1.name == v2.name)
    }
}