/**
 * Created by hernan on 20/11/2017.
 */

import {Component, OnInit} from "@angular/core";
import {LortomComponent, LortomElement} from "@Lortom/plugins/Hardel/Website/Services/website.interfaces";
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
    listElements = [];
    filteredList : LortomElement[];
    query : string;

    constructor(private ncsService : WebsiteService, private router : Router){
        this.isEdit = false;
        this.filteredList = [];
        this.query = '';

        this.component = {
            id: -1,
            name : '',
            check : false,
            appearance : '',
            elements : []
        }
    }
    ngOnInit(){
        this.retriveElement();
    }

    private retriveElement()
    {
        this.ncsService.getElementsFrom().subscribe(
            (elements : LortomElement []) => {
                this.listElements = elements;
                this.component.elements.forEach((item : LortomElement)=>{
                    let index = -1;
                    for(let i = 0; i<this.listElements.length; i++)
                    {
                        let m = this.listElements[i];

                        if(m.id === item.id && m.name === item.name)
                        {
                            index = i;
                            break;
                        }
                    }
                    if(index > -1){
                        this.listElements.splice(index,1);
                    }
                });
            }
        );
        this.cloneComponent();
    }

    /**
     * This function filter permission for research
     */
    filter(){
        if (this.query !== "") {
            this.filteredList = this.listElements.filter(function(el){
                return el.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        }
    }

    /**
     * This function delete Permission from role.permissions
     * @param item
     */
    eraseElement(item) {
        // cancella il permesso
        let index = this.component.elements.indexOf(item);

        if(index > -1)
        {
            this.component.elements.splice(index,1);
        }

    }

    /**
     * This Function add Permission at the moment to role.permissions
     * @param item
     */
    addElement(item : LortomElement) {
        //aggiunge un permesso
        this.filteredList = [];
        this.query = item.name;
        this.component.elements.push(item);
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
                    if(!data.hasOwnProperty('state'))
                    {
                        data.state = false;
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

    isEqual(v,v2) : boolean
    {
        return (v.name == v2.name) && (v.state == v2.state) && (v.elements.length == v2.elements.length)
    }

    /**
     * This function clone the Role
     */
    cloneComponent(){
        let elements: LortomElement[] = [];

        for(let perm of this.component.elements)
        {
            elements.push(perm);
        }

        this.copyComponent = Object.assign({},this.component);
        this.copyComponent.elements = elements;
    }

    /**
     * This function clone the CopyRole
     */
    cloneCopyComponent()
    {
        let elements: LortomElement[] = [];

        for(let perm of this.copyComponent.elements)
        {
            elements.push(perm);
        }

        this.component = Object.assign({},this.copyComponent);
        this.component.elements = elements;
    }
}