


import {Component, Input, OnInit} from "@angular/core";
import {Page} from "../../Services/website.interfaces";
import {WebsiteService} from "../../Services/website.service";
import {ActivatedRoute, Router} from "@angular/router";
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

    constructor(private pService : WebsiteService, private router : ActivatedRoute,private nav : Router) {
        this.isEdit = false;
        this.notFound = false;
        this.query = '';
        this.page = {
            id : -2,
            title : '',
            check : false,
            state : {},
            metaDesc : '',
            metaTag : '',
            slug : '',
            fileName : '',
            content : ''
        };
        this.pService.getPageAtt().subscribe(
            (data : any) => {
                this.listOfState = data.states;
            }
        );
        this.sub = this.router.params.subscribe(
            (params) => {
                this.id = +params['id'];
                this.page = this.pService.getPageByProperty('id',this.id);
                if(this.page != null)
                {
                    this.notFound = true;
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
