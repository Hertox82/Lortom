

import {Component, OnInit} from "@angular/core";
import {Page} from "../../Services/website.interfaces";
import {WebsiteService} from "../../Services/website.service";
@Component({
    selector : 'wb-new-page',
    templateUrl : './pagenew.component.html',
    styles : ['']
})

export class PageNewComponent implements OnInit
{
    page : Page;
    copyPage : Page;
    listOfState : {id? : number, label? : string}[];

    constructor(private pn_Service : WebsiteService){
        this.page =  {
            id : -1,
            title : '',
            slug : '',
            metaTag : '',
            metaDesc : '',
            check : false,
            state : {},
            content: '',
            fileName : '',
        }

        this.clonePage();

        this.pn_Service.getPageAtt().subscribe(
            (data : any) => {
               this.listOfState = data.states;
            }
        );
    }
    ngOnInit() {}

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
        if(this.isEqual(this.page,this.copyPage))
        {
            this.pn_Service.createPage(this.page).subscribe(
                (page : Page) => {
                    this.pn_Service.setPage(page);
                }
            );
        }
    }

    isEqual(v1,v2)
    {
        return (v1.title != v2.title && v1.slug != v2.slug);
    }

    keyupHandlerFunction(event)
    {
        this.page.content = event;
    }
}