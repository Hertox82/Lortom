/**
 * Created by hernan on 23/10/2017.
 */



export class ApiManager{

    basePath : string;
    apiUrl : any;
    constructor() {
        this.basePath = 'http://lortom.local/api/';
        this.apiUrl = [
            { namePath: 'getMenu', path:this.basePath+'populate-slidebar'},
            { namePath: 'login', path:this.basePath+'login'},
            { namePath: 'logout', path:this.basePath+'logout'},
            { namePath: 'editMyProfile', path:this.basePath+'edit-my-profile'}
        ];
    }

    getPathByName(name:string)
    {
        for(let i = 0; i< this.apiUrl.length; i++)
        {
            if(this.apiUrl[i].namePath === name)
                return this.apiUrl[i].path;
        }
    }

    addUrlApi(url : {namePath : string , path:string})
    {
        url.path = this.basePath+url.path;
        this.apiUrl.push(url);
    }

    addListUrlApi(urls : {namePath : string , path:string} [])
    {
        urls.forEach((item) => {
           this.addUrlApi(item);
        });
    }

    consolePrint()
    {
        console.log(this.apiUrl);
    }

}