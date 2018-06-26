


import {Component, Input, OnInit} from "@angular/core";
import {LortomComponent, LtPageComponent, Page, createLtPageComponentFrom} from "../../Services/website.interfaces";
import {WebsiteService} from "../../Services/website.service";
import {ActivatedRoute, Router} from "@angular/router";
import {hasOwnProperty} from "tslint/lib/utils";
import {NgbModal, ModalDismissReasons} from "@ng-bootstrap/ng-bootstrap";
@Component({
    selector : 'wb-page',
    templateUrl : './page.component.html',
    styles : ['']
})

export class PageComponent implements OnInit
{
    @Input() page : Page;
    copyPage : Page;
    id : number;
    private sub : any;
    isEdit : boolean;
    query : string;
    notFound : boolean;
    listOfState : {id? : number, label? : string}[];
    listOfComponent =[];
    filteredList : LortomComponent[];
    listOfModels: any;
    Model: {label: string, functions: any[]};
    listOfModelIndex: {label: string, functions: any[]} [] = [];
    listOfFunctions: string [] = [];
    Function: string;

    constructor(private pService : WebsiteService, private router : ActivatedRoute,private nav : Router, private sModal: NgbModal) {
        this.isEdit = false;
        this.notFound = false;
        this.query = '';
        this.filteredList = [];
        this.page = {
            id : -2,
            title : '',
            check : false,
            state : {},
            metaDesc : '',
            metaTag : '',
            slug : '',
            fileName : '',
            content : '',
            components: []
        };
        this.pService.getPageAtt().subscribe(
            (data : any) => {
                this.listOfState = data.states;
            }
        );

        this.pService.getComponentsFrom().subscribe(
            (data: LortomComponent[]) => {
                this.listOfComponent = data;
            }
        );

        this.pService.getModelsFrom().subscribe(
            (data: any) => {
                this.listOfModels = data;
            }
        );

        this.sub = this.router.params.subscribe(
            (params) => {
                this.id = +params['id'];
                this.page = this.pService.getPageByProperty('id',this.id);
                if(this.page != null)
                {
                    this.notFound = true;
                    if(! hasOwnProperty(this.page,'components')) {
                        this.page['components'] = [];
                    }
                }
                else
                {
                    this.nav.navigate(['/backend/not-found']);
                }
                this.clonePage();
            }
        );
    }
    ngOnInit() {}

    /**
     * This function pass into edit Mode
     */
    editMode(){
        //passa in modalità edit
        this.isEdit = !this.isEdit;
    }

    resetMode(){
        if (confirm('Do you want to reset all data?')) {
            this.cloneCopyPage();
        }
    }

    openModal(event, modal, item) {
        //Stop bubbling
        event.target.blur();
        event.preventDefault();
        //assign to ModelObject the item
        this.Function = item.functions;

        this.Model = {label: '', functions: []};

        //transform List of Object in array
        for(let obj in this.listOfModels) {

            this.listOfModelIndex.push(this.listOfModels[obj]);
        }

        //Check if Model is present
        if(item.Object in this.listOfModels)
        {
            this.Model = this.listOfModels[item.Object];
        }

        //intialize listOfFunction, and if Model is not empty, assign it list of functions
        this.objectChange();

        //open a Bootstrap Modal.
        const mod = this.sModal.open(modal);

        //check action on Modal (save and close)
        mod.result.then((result) => {

            if(result === 'SAVE_DATA') {
                for (let obj in this.listOfModels) {
                    let Modello = this.listOfModels[obj];

                    if (Modello.label === this.Model.label) {
                        item.Object = obj;
                    }
                }

                item.functions = this.Function;
            }
            else {
                item.Object = null;
                item.functions = null;
            }
        },(reason) => {
            //reason is fired when modal is closed
           let result = console.log(this.getDismissReason(reason));

           this.Model = {label: '', functions: []};
           //this.ModelObject = null;
           this.Function = '';
        })

    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

    objectChange() {

        this.listOfFunctions = this.Model.functions;
    }

    eraseComponent(item: LtPageComponent) {
        const index = this.page.components.indexOf(item);

        if(index > -1) {
            this.page.components.splice(index,1);
        }
    }

    addComponent(item: LortomComponent) {
        const el = createLtPageComponentFrom(item);

        this.page.components.push(el);
    }

    /**
     * This function filter permission for research
     */
    filter(){
        if (this.query !== "") {
            this.filteredList = this.listOfComponent.filter(function(el){
                return el.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        } else {
            this.filteredList = [];
        }
    }

    clonePage()
    {
        this.copyPage = Object.assign({},this.page);
    }

    cloneCopyPage()
    {
        this.page = Object.assign({},this.copyPage);
    }

    saveMode()
    {
        if(this.page.slug.length>0)
        {
            this.pService.savePage(this.page).subscribe(
                (page : Page) => {
                    this.page = page;
                    this.clonePage();
                    this.pService.updatePageInList(this.page);
                    this.pService.updateListOfPages();
                    this.editMode();
                }
            );
        }
        else
        {
            alert('The slug cannot be empty, please!');
            this.cloneCopyPage();
            return;
        }
    }

    keyupHandlerFunction(event)
    {
        this.page.content = event;
    }
}
