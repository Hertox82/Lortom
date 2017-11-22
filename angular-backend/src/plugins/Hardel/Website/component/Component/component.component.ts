/**
 * Created by hernan on 21/11/2017.
 */


import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {LortomComponent, LortomElement} from "@Lortom/plugins/Hardel/Website/Services/website.interfaces";
import {WebsiteService} from "@Lortom/plugins/Hardel/Website/Services/website.service";
import {ActivatedRoute, Router} from "@angular/router";
import {isEmbeddedView} from "@angular/core/src/view/util";
@Component({
    selector : 'wb-component',
    templateUrl : './component.component.html',
    styles : ['']
})

export class ComponentComponent implements OnInit, OnDestroy
{
    @Input() component : LortomComponent;
    copyComponent : LortomComponent;
    id : number;
    private sub : any;
    isEdit : boolean;
    listElements = [];
    filteredList : LortomElement[];
    query : string;
    notFound : boolean;

    constructor(private ecService : WebsiteService, private router : ActivatedRoute,private nav : Router){
        this.isEdit = false;
        this.notFound = false;
        this.filteredList = [];
        this.query = '';
        this.component = {
            id : -2,
            name : '',
            check : false,
            elements : [],
            appearance : ''
        };
        this.sub = this.router.params.subscribe(
            (params) => {
                this.id = +params['id'];
                this.component = this.ecService.getComponentByProperty('id',this.id);
                if(this.component != null)
                {
                    this.notFound = true;
                }
                else
                {
                    this.nav.navigate(['/backend/not-found']);
                }
                this.cloneComponent();
            }
        );
    }

    ngOnInit(){
        this.retriveElements();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    /**
     * This function pass into edit Mode
     */
    editMode(){
        //passa in modalità edit
        this.isEdit = !this.isEdit;
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
                alert('You must write a name of Component, please!');
                this.cloneCopyComponent();
                return;
            }

            this.ecService.saveComponent(this.component).subscribe(
                (component : LortomComponent) => {
                    this.component = component;
                    this.retriveElements();
                    this.ecService.updateComponentInList(this.component);
                    this.editMode();
                }
            );
        }
    }

    /**
     * This function is to get Permission from API
     */
    private retriveElements()
    {
        this.ecService.getElementsFrom().subscribe(
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
     * This function reset the Information of Role
     */
    resetMode() {

        if(!this.isEqual(this.component,this.copyComponent)) {
            if (confirm('Are you sure you don\'t want to save this changement and restore it?')) {
                this.cloneCopyComponent();
            }
        }
    }

    isEqual(v,v2) : boolean
    {
        return (v.name == v2.name) && (v.elements.length == v2.elements.length)
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
     * This function filter permission for research
     */
    filter(){
        if (this.query !== "") {
            this.filteredList = this.listElements.filter(function(el){
                return el.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        }
        else {

        }
    }

    /**
     * This function clone the Role
     */
    cloneComponent(){
        if(this.component != null) {
            let elements: LortomElement[] = [];

            for(let perm of this.component.elements)
            {
                elements.push(perm);
            }

            this.copyComponent = Object.assign({},this.component);
            this.copyComponent.elements = elements;
        }
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