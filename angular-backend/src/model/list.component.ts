
import {PaginationService} from "@Lortom/services/pagination.service";
import {hasOwnProperty} from "tslint/lib/utils";
import {NavigationEnd} from "@angular/router";

export class ListComponent {

    listToShow: any;
    listOfData: any = [];
    listOfDataToDelete: any = [];
    actualPage : number;
    perPage : number;
    pagServ : PaginationService;

    constructor() {
        //This is to manage the Pagination
        this.pagServ = new PaginationService();
        this.actualPage = 1;
        this.perPage = 3;
        this.listToShow = [];
        this.listOfData = [];
    }

    public onComponentInit(
        service: {name: string, permission: string, upd: string},
        router: string,
        getList: string) : void {
            if(this[service.name] != null || this[service.name] != undefined) {
                if(!this[service.name].hasPermissions(service.permission))
                {
                    if(this[router] != null || this[router] != undefined) {
                        this[router].navigate(['/backend/dashboard']);
                    }
                }
            }
        if(this[router] != null || this[router] != undefined) {
           this[router].events.subscribe(
               (val) => {
                   if(val instanceof NavigationEnd)
                   {
                       if(this['myRoot'] === val.url)
                       {
                           this['isRoot'] = true;
                       }
                       else
                       {
                           this['isRoot'] = false;
                       }
                   }
               }
           );
        }

        if( typeof this[getList] === 'function') {
                this[getList]();
            if(this[service.name] != null || this[service.name] != undefined) {

                this[service.name][service.upd].subscribe(
                    () => {
                        this[getList]();
                    }
                );
            }
        }
    }

    /**
     * This function is
     */
    protected updateListaShow() : void
    {
        this.listToShow = this.pagServ.getShowList({
            entry : this.perPage,
            list : this.listOfData,
            pageToShow : this.actualPage
        });
    }

    /**
     * This function is to Catch Event of Pagination
     */
    onPrev()
    {
        this.actualPage--;
        this.updateListaShow();
    }

    /**
     * This function is to Catch Event of Pagination
     * @param ev
     */
    onNext(ev)
    {
        this.actualPage++;
        this.updateListaShow();
    }

    /**
     * This function is to Catch Event of Pagination
     * @param act
     */
    onPage(act)
    {
        this.actualPage = act;
        this.updateListaShow();
    }

    /**
     * This function is to Catch Event of Pagination
     * @param n
     */
    onPerPage(n : number)
    {
        this.perPage = n;
        this.updateListaShow();
    }


    /**
     * This function retrieveListOfData that passed into singular Component
     * @param service
     * @param nameList
     */
    public retrieveListOfData(service:
        {name: string, check: string, callApi: string, setData: string, getData: string}, nameList: string): void {
        if (this[service.name] != null || this[service.name] != undefined) {
            const fnCheck = service.check;
            if (typeof this[service.name][fnCheck] === 'function') {
                if (!this[service.name][fnCheck]()) {
                    const fnCallApi = service.callApi;
                    if ( typeof this[service.name][fnCallApi] === 'function') {
                        this[service.name][fnCallApi]().subscribe(
                            (plugins: any) => {
                                this.listOfData = plugins;
                                this[nameList] = plugins;
                                    for (var i = 0; i < this[nameList].length; i++) {
                                       if (!hasOwnProperty(this[nameList][i], 'check')) {
                                           this[nameList][i].check = false;
                                       }
                                    }

                                const fnSetData = service.setData;
                                if(typeof this[service.name][fnSetData] === 'function') {
                                    this[service.name][fnSetData](plugins);
                                    this.updateListaShow();
                                }
                            }
                        );

                    }
                } else {
                    this[nameList] = this[service.name][service.getData]();
                    this.listOfData = this[nameList];
                    this.listOfData.forEach((item: any) => {
                        if (!item.hasOwnProperty('check')) {
                            item.check = false;
                        }
                    });
                    this.updateListaShow();
                }
            }
        }
    }

    /**
     * This function hold the Event from other Component
     * @param ev
     * @param data
     */
    public  eventChangeData(ev,data : any) : void
    {
        if(ev.target.checked)
        {
            this.listOfDataToDelete.push(data);
        }
        else
        {
            let index = this.listOfDataToDelete.indexOf(data);

            if(index > -1)
            {
                this.listOfDataToDelete.splice(index,1);
            }
        }
    }

    /**
     * This Function is to Delete Data from Component
     * @param service
     * @param nameList
     * @param message
     */
    public  deleteData(service: {name: string, delFn: string, setData: string}, nameList: string, message: string) {
        if (this.listOfDataToDelete.length > 0) {
            if (confirm(message)) {
                if (this[service.name] != null || this[service.name] != undefined) {
                    const fnDel = service.delFn;
                    if (typeof this[service.name][fnDel] === 'function') {
                        this[service.name][fnDel](this.listOfDataToDelete).subscribe(
                            (data: any) => {
                                this.listOfDataToDelete = [];
                                this.listOfData = data;
                                this[nameList] = data;
                                const fnSet = service.setData;
                                if (typeof this[service.name][fnSet] === 'function') {
                                    this[service.name][fnSet](this[nameList]);
                                    this.updateListaShow();
                                }
                            }
                        );
                    }
                }
            }
        }
    }
}