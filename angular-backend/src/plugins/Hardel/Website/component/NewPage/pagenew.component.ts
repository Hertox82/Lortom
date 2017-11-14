

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
    constructor(private pn_Service : WebsiteService){
        this.page =  {
            id : -1,
            title : '',
            slug : '',
            metaTag : '',
            metaDesc : '',
            state : false,
            content: '',
            nomeFile : '',
        }
    }
    ngOnInit() {}

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
