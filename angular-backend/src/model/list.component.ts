
import {PaginationService} from "@Lortom/services/pagination.service";

export class ListComponent {

    listToShow: any;
    listOfData: any;
    actualPage : number;
    perPage : number;
    pagServ : PaginationService;

    constructor() {
        //This is to manage the Pagination
        this.pagServ = new PaginationService();
        this.actualPage = 1;
        this.perPage = 3;
    }

    protected updateListaShow() : void
    {
        this.listToShow = this.pagServ.getShowList({
            entry : this.perPage,
            list : this.listOfData,
            pageToShow : this.actualPage
        });
    }

    onPrev()
    {
        this.actualPage--;
        this.updateListaShow();
    }

    onNext(ev)
    {
        this.actualPage++;
        this.updateListaShow();
    }

    onPage(act)
    {
        this.actualPage = act;
        this.updateListaShow();
    }

    onPerPage(n : number)
    {
        this.perPage = n;
        this.updateListaShow();
    }

}