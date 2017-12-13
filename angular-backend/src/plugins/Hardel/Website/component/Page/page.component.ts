


import {Component, Input, OnInit} from "@angular/core";
import {LortomComponent, LtPageComponent, Page, createLtPageComponentFrom} from "../../Services/website.interfaces";
import {WebsiteService} from "../../Services/website.service";
import {ActivatedRoute, Router} from "@angular/router";
import {hasOwnProperty} from "tslint/lib/utils";
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

    constructor(private pService : WebsiteService, private router : ActivatedRoute,private nav : Router) {
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
