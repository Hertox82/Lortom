/**
 * Created by hernan on 16/11/2017.
 */



export class PaginationService{

    entry : number;
    list : any;
    length: number;
    perPage : number;
    private min : number;
    private max : number;
    pageToShow : number;

    constructor(){}

    getShowList(obj : ObjPagination)
    {
        this.entry = obj.entry;
        this.list = obj.list;
        this.length = obj.list.length;
        this.perPage = Math.ceil(this.length/this.entry);
        this.min = 1;
        this.max = Object.assign({},this.perPage);
        this.pageToShow = obj.pageToShow;

        let iTO = (this.pageToShow*this.entry) - this.entry;

        let counter = (this.pageToShow == this.max) ? this.length : this.entry;
        let show = [];

        for(let i=0; i<counter; i++)
        {
            let showI = i+iTO;

            if(showI in this.list)
                show.push(this.list[showI]);
        }

        return show;
    }
}


export interface ObjPagination
{
    entry : number;
    list : any;
    pageToShow : number;
}


