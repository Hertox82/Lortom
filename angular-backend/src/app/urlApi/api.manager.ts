/**
 * Created by hernan on 23/10/2017.
 */



 export class ApiManager {

    basePath: string;
    apiUrl: any;
    constructor() {
        this.basePath = '/api/';
        this.apiUrl = [
            { namePath: 'getMenu', path: this.basePath + 'populate-slidebar'},
            { namePath: 'login', path: this.basePath + 'login'},
            { namePath: 'logout', path: this.basePath + 'logout'},
            { namePath: 'editMyProfile', path: this.basePath + 'edit-my-profile'}
        ];
    }

    getPathByName(name: string) {
        for (let i = 0; i < this.apiUrl.length; i++) {
            if (this.apiUrl[i].namePath === name) {
                return this.apiUrl[i].path;
            }
        }
    }

    addUrlApi(url: {namePath: string , path: string}) {
        url.path = this.getUrl(url.path);
        this.apiUrl.push(url);
    }

    hasUrlByName(name: string): boolean {
        for (let i = 0; i < this.apiUrl.length; i++) {
            if (this.apiUrl[i].namePath === name) {
                return true;
            }
        }
        return false;
    }

    addListUrlApi(urls: {namePath: string , path: string} []) {
        urls.forEach((item) => {
           this.addUrlApi(item);
        });
    }

    getUrl(path: string) {
        return this.basePath + path;
    }

    consolePrint() {
        console.log(this.apiUrl);
    }
}
