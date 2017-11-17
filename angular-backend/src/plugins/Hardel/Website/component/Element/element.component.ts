/**
 * Created by hernan on 17/11/2017.
 */


import {Component, Input, OnInit} from "@angular/core";
import {LortomElement} from "../../Services/website.interfaces";
import {WebsiteService} from "../../Services/website.service";
import {ActivatedRoute, Router} from "@angular/router";
@Component({
    selector : 'wb-element',
    templateUrl : './element.component.html',
    styles : ['']
})

export class ElementComponent implements OnInit
{

    @Input() element : LortomElement;
    copyElement : LortomElement;
    id : number;
    private sub : any;
    isEdit : boolean;
    notFound : boolean;

    constructor(private ueService : WebsiteService,private router : ActivatedRoute, private nav : Router) {
        this.isEdit = false;
        this.notFound = false;
        this.element = {
            id : -2,
            name: '',
            Object : '',
            functions : '',
            appearance : '',
            check : false
        };

        this.sub = this.router.params.subscribe(
            (params) => {
                this.id = +params['id'];
                this.element = this.ueService.getElementByProperty('id',this.id);
                if(this.element != null)
                {
                    this.notFound = true;
                }
                else
                {
                    this.nav.navigate(['/backend/not-found']);
                }
                this.cloneElement();
            }
        );
    }
    ngOnInit() {}

    editMode(){
        //passa in modalità edit
        this.isEdit = !this.isEdit;
    }

    saveMode() : void
    {
        if(!this.isEqual(this.element,this.copyElement))
        {
            this.ueService.saveElement(this.element).subscribe(
                (element : LortomElement) => {
                    this.element = element;
                    this.cloneElement();
                    this.ueService.updateListOfElements();
                    this.editMode();
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