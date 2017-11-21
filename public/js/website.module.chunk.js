webpackJsonp(["website.module"],{

/***/ "./src/plugins/Hardel/Website/Services/website.interfaces.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by hernan on 14/11/2017.
 */
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=website.interfaces.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Website/Services/website.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by hernan on 14/11/2017.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
var Subject_1 = __webpack_require__("./node_modules/rxjs/Subject.js");
var master_service_1 = __webpack_require__("./src/services/master.service.ts");
var WebsiteService = (function (_super) {
    __extends(WebsiteService, _super);
    function WebsiteService(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this._updatePages = new Subject_1.Subject();
        _this.updatePages$ = _this._updatePages.asObservable();
        _this._updateElements = new Subject_1.Subject();
        _this.updateElements$ = _this._updateElements.asObservable();
        _this._updateComponents = new Subject_1.Subject();
        _this.updateComponents$ = _this._updateComponents.asObservable();
        // write the api route for setting
        var urls = [
            { namePath: 'getPages', path: 'pages' },
            { namePath: 'savePage', path: 'page' },
            { namePath: 'getPageAtt', path: 'pages/attribute/list' },
            { namePath: 'getElements', path: 'elements' },
            { namePath: 'saveElement', path: 'element' },
            { namePath: 'getComponents', path: 'components' },
            { namePath: 'saveComponent', path: 'component' }
        ];
        //Add the Api to the ApiManager
        _this.apiManager.addListUrlApi(urls);
        return _this;
    }
    /**
     * This function return Page by Property
     * @param name
     * @param value
     * @returns {Page}
     */
    WebsiteService.prototype.getPageByProperty = function (name, value) {
        return this.getItemByProperty(name, value, 'pages', 'listOfPages');
    };
    /**
     * This function return Element by Property
     * @param name
     * @param value
     * @returns {LortomElement}
     */
    WebsiteService.prototype.getElementByProperty = function (name, value) {
        return this.getItemByProperty(name, value, 'elements', 'listOfElements');
    };
    /**
     * This function update Element in listOfElements
     * @param el
     */
    WebsiteService.prototype.updateElementInList = function (el) {
        if (this.listOfElements == undefined) {
            this.listOfElements = this.getElements();
        }
        var elm = this.updateItemInList(el, this.listOfElements);
        this.setElements(elm);
    };
    /**
     * This function update Page in listOfPages
     * @param page
     */
    WebsiteService.prototype.updatePageInList = function (page) {
        if (this.listOfPages == undefined) {
            this.listOfPages = this.getPages();
        }
        var p = this.updateItemInList(page, this.listOfPages);
        this.setPages(p);
    };
    /**
     * this function return if Pages Exists
     * @returns {boolean}
     */
    WebsiteService.prototype.checkPagesExist = function () {
        return this.checkItemExist('pages');
    };
    /**
     * This function check if Elements exist
     * @returns {boolean}
     */
    WebsiteService.prototype.checkElementsExist = function () {
        return this.checkItemExist('elements');
    };
    /**
     * This function check if Components exist
     * @returns {boolean}
     */
    WebsiteService.prototype.checkComponentsExist = function () {
        return this.checkItemExist('components');
    };
    /**
     * This function Call API to get List Of Pages
     * @returns {Observable<R>}
     */
    WebsiteService.prototype.getPagesFrom = function () {
        return this.http.get(this.apiManager.getPathByName('getPages'))
            .map(function (response) {
            return response.json().pages;
        });
    };
    /**
     * This function call API to get Elements
     * @returns {Observable<R>}
     */
    WebsiteService.prototype.getElementsFrom = function () {
        return this.http.get(this.apiManager.getPathByName('getElements'))
            .map(function (response) {
            return response.json().elements;
        });
    };
    WebsiteService.prototype.getComponentsFrom = function () {
        return this.http.get(this.apiManager.getPathByName('getComponents'))
            .map(function (response) {
            return response.json().components;
        });
    };
    /**
     * This function set pages and store into a Session
     * @param pages
     */
    WebsiteService.prototype.setPages = function (pages) {
        this.setItem('pages', pages);
        this.listOfPages = pages;
    };
    /**
     * This function set a list Of Elements
     * @param elements
     */
    WebsiteService.prototype.setElements = function (elements) {
        this.setItem('elements', elements);
        this.listOfElements = elements;
    };
    WebsiteService.prototype.setComponents = function (components) {
        this.setItem('components', components);
        this.listOfComponents = components;
    };
    /**
     * This function get listOfPages
     * @returns {any}
     */
    WebsiteService.prototype.getPages = function () {
        return this.getItem('pages', 'listOfPages');
    };
    /**
     * This function return a list Of Elements
     * @returns {LortomElement[]}
     */
    WebsiteService.prototype.getElements = function () {
        return this.getItem('elements', 'listOfElements');
    };
    WebsiteService.prototype.getComponents = function () {
        return this.getItem('components', 'listOfComponents');
    };
    /**
     * This Function call API in order to Delete a list of Pages
     * @param pages
     * @returns {Observable<R>}
     */
    WebsiteService.prototype.deletePages = function (pages) {
        return this.http.put(this.apiManager.getPathByName('getPages'), pages, this.getOptions())
            .map(function (response) {
            return response.json().pages;
        });
    };
    /**
     * This function call API in order to Delete an Array of Element
     * @param el
     * @returns {Observable<R>}
     */
    WebsiteService.prototype.deleteElements = function (el) {
        return this.http.put(this.apiManager.getPathByName('getElements'), el, this.getOptions())
            .map(function (response) {
            return response.json().elements;
        });
    };
    WebsiteService.prototype.deleteComponents = function (cmp) {
        return this.http.put(this.apiManager.getPathByName('getComponents'), cmp, this.getOptions())
            .map(function (response) {
            return response.json().components;
        });
    };
    /**
     *This function call API in order to create a Page.
     * @param page
     * @returns {Observable<R>}
     */
    WebsiteService.prototype.createPage = function (page) {
        return this.http.post(this.apiManager.getPathByName('savePage'), page, this.getOptions())
            .map(function (response) {
            return response.json().page;
        });
    };
    /**
     * This function call API in order to Create an Element
     * @param elem
     * @returns {Observable<R>}
     */
    WebsiteService.prototype.createElement = function (elem) {
        return this.http.post(this.apiManager.getPathByName('saveElement'), elem, this.getOptions())
            .map(function (response) {
            return response.json().element;
        });
    };
    WebsiteService.prototype.createComponent = function (comp) {
        return this.http.post(this.apiManager.getPathByName('saveComponent'), comp, this.getOptions())
            .map(function (response) {
            return response.json().component;
        });
    };
    /**
     * This function set an Element into the listOfElements
     * @param elem
     */
    WebsiteService.prototype.setElement = function (elem) {
        var el = this.getElements();
        el.push(elem);
        this.deleteElementFromCache();
        this.setElements(el);
    };
    /**
     * This function set a Page into the listOfPages
     * @param page
     */
    WebsiteService.prototype.setPage = function (page) {
        var pages = this.getPages();
        pages.push(page);
        this.deletePageFromCache();
        this.setPages(pages);
    };
    /**
     * This function set a Component into the listOfComponents
     * @param cmp
     */
    WebsiteService.prototype.setComponent = function (cmp) {
        var comp = this.getComponents();
        comp.push(cmp);
        this.deleteComponentFromCache();
        this.setComponents(comp);
    };
    /**
     * this function delete pages from cache
     */
    WebsiteService.prototype.deletePageFromCache = function () {
        this.deleteItem('pages', 'listOfPages');
    };
    /**
     * This function delete elements from cache
     */
    WebsiteService.prototype.deleteElementFromCache = function () {
        this.deleteItem('elements', 'listOfElements');
    };
    /**
     * This function delete components from cache
     */
    WebsiteService.prototype.deleteComponentFromCache = function () {
        this.deleteItem('components', 'listOfComponents');
    };
    /**
     * this function fire event
     */
    WebsiteService.prototype.updateListOfPages = function () {
        this._updatePages.next();
    };
    /**
     * this function fire event
     */
    WebsiteService.prototype.updateListOfElements = function () {
        this._updateElements.next();
    };
    WebsiteService.prototype.updateListOfComponents = function () {
        this._updateComponents.next();
    };
    WebsiteService.prototype.getPageAtt = function () {
        return this.http.get(this.apiManager.getPathByName('getPageAtt'))
            .map(function (response) {
            return response.json();
        });
    };
    /**
     * This function delete from listOfPages one page
     * @param page
     */
    WebsiteService.prototype.erasePage = function (page) {
        var index = this.listOfPages.indexOf(page);
        if (index > -1) {
            this.listOfPages.splice(index, 1);
        }
    };
    /**
     * this is HTTP request to API
     * @param page
     * @returns {Observable<R>}
     */
    WebsiteService.prototype.savePage = function (page) {
        return this.http.put(this.apiManager.getPathByName('savePage'), page, this.getOptions())
            .map(function (response) {
            return response.json().page;
        });
    };
    /**
     * This function call API in order to update an Element
     * @param element
     * @returns {Observable<R>}
     */
    WebsiteService.prototype.saveElement = function (element) {
        return this.http.put(this.apiManager.getPathByName('saveElement'), element, this.getOptions())
            .map(function (response) {
            return response.json().element;
        });
    };
    return WebsiteService;
}(master_service_1.MasterService));
WebsiteService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], WebsiteService);
exports.WebsiteService = WebsiteService;
var _a;
//# sourceMappingURL=website.service.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/Components/components.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"tabbable-custom\" *ngIf=\"isRoot === true\">\n    <ul class=\"nav nav-tabs\">\n        <li>\n            <a [routerLink]=\"['/backend/website/pages']\" data-toggle=\"tab\"> Pages</a>\n        </li>\n        <li>\n            <a [routerLink]=\"['/backend/website/menu']\" data-toggle=\"tab\"> Menu</a>\n        </li>\n        <li class=\"active\">\n            <a  href=\"#tab_1\" data-toggle=\"tab\"> Component</a>\n        </li>\n        <li>\n            <a  [routerLink]=\"['/backend/website/elements']\" data-toggle=\"tab\"> Element</a>\n        </li>\n    </ul>\n    <div class=\"tab-content\">\n        <div class=\"tab-pane active\" id=\"tab_1\">\n            <div class=\"box\">\n                <div class=\"box-header\">\n\n                </div>\n                <div class=\"box-body\">\n                    <div class=\"wrapper\">\n                        <div class=\"row\">\n                            <div class=\"col-md-8\">\n                                <lt-entry-pagination\n                                        [entry]=\"'50-5'\"\n                                        (onEntry)=\"onPerPage($event)\">\n                                </lt-entry-pagination>\n                            </div>\n                            <div class=\"col-md-4\">\n                                <div class=\"dataTables_filter\">\n                                    <label>\n                                        Search:\n                                        <input type=\"search\" class=\"form-control input-sm\">\n                                    </label>\n                                    <a class=\"btn btn-primary\" [routerLink] = \"['/backend/website/components/new']\"><i class=\"fa fa-file\"></i> New</a>\n                                    <a class=\"btn btn-danger\" (click)=\"deleteComponents()\"><i class=\"fa fa-times\"></i> Delete</a>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-sm-12\">\n                                <table class=\"table table-bordered table-striped\">\n                                    <thead>\n                                    <tr>\n                                        <th style=\"width: 30px;\"></th>\n                                        <th>\n                                            <a>Name</a>\n                                        </th>\n                                        <th style=\"width: 50px;\"></th>\n                                    </tr>\n                                    </thead>\n                                    <tbody>\n                                    <tr *ngFor=\"let el of listShowComponents\">\n                                        <td>\n                                            <input type=\"checkbox\" (change)=\"eventChange($event,el)\" [(ngModel)] = \"el.check\">\n                                        </td>\n                                        <td>\n                                            {{el.name}}\n                                        </td>\n                                        <td>\n                                            <a [routerLink] = \"['/backend/website/components',el.id]\"><i class=\"fa fa-edit\" style=\"color:orange; font-size: 16px;\"></i></a>\n                                        </td>\n                                    </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                        <lt-pagination\n                                [pagesToShow]=\"3\"\n                                [perPage]=\"perPage\"\n                                [count]=\"listOfComponents.length\"\n                                [loading]=\"false\"\n                                [page]=\"actualPage\"\n                                (goNext)=\"onNext($event)\"\n                                (goPage)=\"onPage($event)\"\n                                (goPrev)=\"onPrev()\">\n                        </lt-pagination>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/Components/components.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by hernan on 20/11/2017.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var pagination_service_1 = __webpack_require__("./src/services/pagination.service.ts");
var website_service_1 = __webpack_require__("./src/plugins/Hardel/Website/Services/website.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var ComponentsComponent = (function () {
    function ComponentsComponent(ccService, router) {
        var _this = this;
        this.ccService = ccService;
        this.router = router;
        this.listOfComponents = [];
        this.myRoot = '/backend/website/components';
        this.isRoot = false;
        if (!this.ccService.hasPermissions("Hardel.Website.Component")) {
            this.router.navigate(['/backend/dashboard']);
        }
        this.listaComponentsDelete = [];
        this.listOfComponents = [];
        //This is to manage the Pagination
        this.pagServ = new pagination_service_1.PaginationService();
        this.actualPage = 1;
        this.perPage = 3;
        this.router.events.subscribe(function (val) {
            if (val instanceof router_1.NavigationEnd) {
                if (_this.myRoot === val.url) {
                    _this.isRoot = true;
                }
                else {
                    _this.isRoot = false;
                }
            }
        });
        this.retrieveListOfComponents();
        this.ccService.updateComponents$.subscribe(function () {
            _this.retrieveListOfComponents();
        });
    }
    ComponentsComponent.prototype.ngOnInit = function () { };
    ComponentsComponent.prototype.retrieveListOfComponents = function () {
        var _this = this;
        if (!this.ccService.checkComponentsExist()) {
            this.ccService.getComponentsFrom().subscribe(function (components) {
                _this.listOfComponents = components;
                _this.listOfComponents.forEach(function (el) {
                    el.check = false;
                });
                _this.ccService.setComponents(_this.listOfComponents);
                _this.updateListaShow();
            });
        }
        else {
            this.listOfComponents = this.ccService.getComponents();
            this.listOfComponents.forEach(function (item) {
                if (!item.hasOwnProperty('check')) {
                    item.check = false;
                }
            });
            this.updateListaShow();
        }
    };
    ComponentsComponent.prototype.onPerPage = function (n) {
        this.perPage = n;
        this.updateListaShow();
    };
    ComponentsComponent.prototype.updateListaShow = function () {
        this.listShowComponents = this.pagServ.getShowList({
            entry: this.perPage,
            list: this.listOfComponents,
            pageToShow: this.actualPage
        });
    };
    ComponentsComponent.prototype.onPrev = function () {
        this.actualPage--;
        this.updateListaShow();
    };
    ComponentsComponent.prototype.onNext = function (ev) {
        this.actualPage++;
        this.updateListaShow();
    };
    ComponentsComponent.prototype.onPage = function (page) {
        this.actualPage = page;
        this.updateListaShow();
    };
    ComponentsComponent.prototype.eventChange = function (ev, data) {
        if (ev.target.checked) {
            this.listaComponentsDelete.push(data);
        }
        else {
            var index = this.listaComponentsDelete.indexOf(data);
            if (index > -1) {
                this.listaComponentsDelete.splice(index, 1);
            }
        }
    };
    ComponentsComponent.prototype.deleteComponents = function () {
        var _this = this;
        if (this.listaComponentsDelete.length > 0) {
            if (confirm('Do you really want delete this Roles?')) {
                console.log(this.listaComponentsDelete);
                this.ccService.deleteComponents(this.listaComponentsDelete).subscribe(function (data) {
                    _this.listaComponentsDelete = [];
                    _this.listOfComponents = data;
                    _this.ccService.setComponents(_this.listOfComponents);
                    _this.updateListaShow();
                });
            }
        }
    };
    return ComponentsComponent;
}());
ComponentsComponent = __decorate([
    core_1.Component({
        selector: 'wb-components',
        template: __webpack_require__("./src/plugins/Hardel/Website/component/Components/components.component.html"),
        styles: ['']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof website_service_1.WebsiteService !== "undefined" && website_service_1.WebsiteService) === "function" && _a || Object, typeof (_b = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _b || Object])
], ComponentsComponent);
exports.ComponentsComponent = ComponentsComponent;
var _a, _b;
//# sourceMappingURL=components.component.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/Element/element.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form\">\n    <div class=\"portlet\">\n        <div class=\"portlet-title\">\n            <div class=\"caption\">\n                <i class=\"fa fa-database\"></i>\n                <span>General Definitions</span>\n            </div>\n            <div class=\"actions\">\n                <button class=\"btn darkorange\" (click)=\"editMode()\">\n                    <i class=\"fa fa-edit\"></i>\n                    Edit\n                </button>\n            </div>\n        </div>\n        <div class=\"portlet-body\">\n            <div class=\"portlet-form-body\">\n                <div class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"name\" class=\"col-md-2 control-label\">Name</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"name\" placeholder=\"Name\" id=\"name\" [ngModel] = \"element.name\" *ngIf=\"isEdit === false; else editName\" readonly>\n                                    <ng-template #editName>\n                                        <input type=\"text\" class=\"form-control\" name=\"name\" placeholder=\"Name\" id=\"name\" [(ngModel)] = \"element.name\" >\n                                    </ng-template>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"object\" class=\"col-md-2 control-label\">Object</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"object\" placeholder=\"Object\" id=\"object\" [ngModel] = \"element.Object\" *ngIf=\"isEdit === false; else editObject\" readonly>\n                                    <ng-template #editObject>\n                                        <input type=\"text\" class=\"form-control\" name=\"object\" placeholder=\"Object\" id=\"object\" [(ngModel)] = \"element.Object\" >\n                                    </ng-template>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"function\" class=\"col-md-2 control-label\">Functions</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"function\" placeholder=\"Functions\" id=\"function\" [ngModel] = \"element.functions\" *ngIf=\"isEdit === false; else editFunctions\" readonly>\n                                    <ng-template #editFunctions>\n                                        <input type=\"text\" class=\"form-control\" name=\"function\" placeholder=\"Functions\" id=\"function\" [(ngModel)] = \"element.functions\" >\n                                    </ng-template>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"appearance\" class=\"col-md-2 control-label\">Appearance</label>\n                                <div class=\"col-md-4\">\n                                    <textarea type=\"text\" class=\"form-control\" name=\"appearance\" id=\"appearance\" [ngModel] = \"element.appearance\" *ngIf=\"isEdit === false; else editAppearance\" disabled></textarea>\n                                    <ng-template #editAppearance>\n                                        <textarea type=\"text\" class=\"form-control\" name=\"appearance\" id=\"appearance\" [(ngModel)] = \"element.appearance\" ></textarea>\n                                    </ng-template>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-12\">\n            <button class=\"btn orange\" (click)=\"saveMode()\">Save</button>\n            <button class=\"btn red\" (click)=\"resetMode()\">Reset</button>\n        </div>\n    </div>\n</form>"

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/Element/element.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by hernan on 17/11/2017.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var website_interfaces_1 = __webpack_require__("./src/plugins/Hardel/Website/Services/website.interfaces.ts");
var website_service_1 = __webpack_require__("./src/plugins/Hardel/Website/Services/website.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var ElementComponent = (function () {
    function ElementComponent(ueService, router, nav) {
        var _this = this;
        this.ueService = ueService;
        this.router = router;
        this.nav = nav;
        this.isEdit = false;
        this.notFound = false;
        this.element = {
            id: -2,
            name: '',
            Object: '',
            functions: '',
            appearance: '',
            check: false
        };
        this.sub = this.router.params.subscribe(function (params) {
            _this.id = +params['id'];
            _this.element = _this.ueService.getElementByProperty('id', _this.id);
            if (_this.element != null) {
                _this.notFound = true;
            }
            else {
                _this.nav.navigate(['/backend/not-found']);
            }
            _this.cloneElement();
        });
    }
    ElementComponent.prototype.ngOnInit = function () { };
    ElementComponent.prototype.editMode = function () {
        //passa in modalità edit
        this.isEdit = !this.isEdit;
    };
    ElementComponent.prototype.saveMode = function () {
        var _this = this;
        if (!this.isEqual(this.element, this.copyElement)) {
            this.ueService.saveElement(this.element).subscribe(function (element) {
                _this.element = element;
                _this.cloneElement();
                _this.ueService.updateElementInList(_this.element);
                _this.ueService.updateListOfElements();
                _this.editMode();
            });
        }
    };
    ElementComponent.prototype.resetMode = function () {
        if (confirm("Do you really want reset all fields?")) {
            this.cloneCopyElement();
        }
    };
    ElementComponent.prototype.cloneElement = function () {
        this.copyElement = Object.assign({}, this.element);
    };
    ElementComponent.prototype.cloneCopyElement = function () {
        this.element = Object.assign({}, this.copyElement);
    };
    ElementComponent.prototype.isEqual = function (v1, v2) {
        return (v1.name == v2.name);
    };
    return ElementComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", typeof (_a = typeof website_interfaces_1.LortomElement !== "undefined" && website_interfaces_1.LortomElement) === "function" && _a || Object)
], ElementComponent.prototype, "element", void 0);
ElementComponent = __decorate([
    core_1.Component({
        selector: 'wb-element',
        template: __webpack_require__("./src/plugins/Hardel/Website/component/Element/element.component.html"),
        styles: ['']
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof website_service_1.WebsiteService !== "undefined" && website_service_1.WebsiteService) === "function" && _b || Object, typeof (_c = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _c || Object, typeof (_d = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _d || Object])
], ElementComponent);
exports.ElementComponent = ElementComponent;
var _a, _b, _c, _d;
//# sourceMappingURL=element.component.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/Elements/elements.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"tabbable-custom\" *ngIf=\"isRoot === true\">\n    <ul class=\"nav nav-tabs\">\n        <li>\n            <a [routerLink]=\"['/backend/website/pages']\" data-toggle=\"tab\"> Pages</a>\n        </li>\n        <li>\n            <a [routerLink]=\"['/backend/website/menu']\" data-toggle=\"tab\"> Menu</a>\n        </li>\n        <li>\n            <a [routerLink]=\"['/backend/website/components']\" data-toggle=\"tab\"> Component</a>\n        </li>\n        <li class=\"active\">\n            <a  href=\"#tab_1\" data-toggle=\"tab\"> Element</a>\n        </li>\n    </ul>\n    <div class=\"tab-content\">\n        <div class=\"tab-pane active\" id=\"tab_1\">\n            <div class=\"box\">\n                <div class=\"box-header\">\n\n                </div>\n                <div class=\"box-body\">\n                    <div class=\"wrapper\">\n                        <div class=\"row\">\n                            <div class=\"col-md-8\">\n                                <lt-entry-pagination\n                                    [entry]=\"'50-5'\"\n                                    (onEntry)=\"onPerPage($event)\">\n                                </lt-entry-pagination>\n                            </div>\n                            <div class=\"col-md-4\">\n                                <div class=\"dataTables_filter\">\n                                    <label>\n                                        Search:\n                                        <input type=\"search\" class=\"form-control input-sm\">\n                                    </label>\n                                    <a class=\"btn btn-primary\" [routerLink] = \"['/backend/website/elements/new']\"><i class=\"fa fa-file\"></i> New</a>\n                                    <a class=\"btn btn-danger\" (click)=\"deleteElements()\"><i class=\"fa fa-times\"></i> Delete</a>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-sm-12\">\n                                <table class=\"table table-bordered table-striped\">\n                                    <thead>\n                                    <tr>\n                                        <th style=\"width: 30px;\"></th>\n                                        <th>\n                                            <a>Name</a>\n                                        </th>\n                                        <th style=\"width: 50px;\"></th>\n                                    </tr>\n                                    </thead>\n                                    <tbody>\n                                    <tr *ngFor=\"let el of listShowElements\">\n                                        <td>\n                                            <input type=\"checkbox\" (change)=\"eventChange($event,el)\" [(ngModel)] = \"el.check\">\n                                        </td>\n                                        <td>\n                                            {{el.name}}\n                                        </td>\n                                        <td>\n                                            <a [routerLink] = \"['/backend/website/elements',el.id]\"><i class=\"fa fa-edit\" style=\"color:orange; font-size: 16px;\"></i></a>\n                                        </td>\n                                    </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                        <lt-pagination\n                            [pagesToShow]=\"3\"\n                            [perPage]=\"perPage\"\n                            [count]=\"listOfElements.length\"\n                            [loading]=\"false\"\n                            [page]=\"actualPage\"\n                            (goNext)=\"onNext($event)\"\n                            (goPage)=\"onPage($event)\"\n                            (goPrev)=\"onPrev()\">\n                        </lt-pagination>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/Elements/elements.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by hernan on 16/11/2017.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var website_service_1 = __webpack_require__("./src/plugins/Hardel/Website/Services/website.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var pagination_service_1 = __webpack_require__("./src/services/pagination.service.ts");
var ElementsComponent = (function () {
    function ElementsComponent(ecService, router) {
        var _this = this;
        this.ecService = ecService;
        this.router = router;
        this.listOfElements = [];
        this.myRoot = '/backend/website/elements';
        this.isRoot = false;
        if (!this.ecService.hasPermissions("Hardel.Website.Element")) {
            this.router.navigate(['/backend/dashboard']);
        }
        this.listaElementsDelete = [];
        this.listOfElements = [];
        //This is to manage the Pagination
        this.pagServ = new pagination_service_1.PaginationService();
        this.actualPage = 1;
        this.perPage = 3;
        this.router.events.subscribe(function (val) {
            if (val instanceof router_1.NavigationEnd) {
                if (_this.myRoot === val.url) {
                    _this.isRoot = true;
                }
                else {
                    _this.isRoot = false;
                }
            }
        });
        this.retrieveListOfElements();
        this.ecService.updateElements$.subscribe(function () {
            _this.retrieveListOfElements();
        });
    }
    ElementsComponent.prototype.ngOnInit = function () { };
    ElementsComponent.prototype.retrieveListOfElements = function () {
        var _this = this;
        if (!this.ecService.checkElementsExist()) {
            this.ecService.getElementsFrom().subscribe(function (elements) {
                _this.listOfElements = elements;
                _this.listOfElements.forEach(function (el) {
                    el.check = false;
                });
                _this.ecService.setElements(_this.listOfElements);
                _this.updateListaShow();
            });
        }
        else {
            this.listOfElements = this.ecService.getElements();
            this.listOfElements.forEach(function (item) {
                if (!item.hasOwnProperty('check')) {
                    item.check = false;
                }
            });
            this.updateListaShow();
        }
    };
    ElementsComponent.prototype.onPerPage = function (n) {
        this.perPage = n;
        this.updateListaShow();
    };
    ElementsComponent.prototype.updateListaShow = function () {
        this.listShowElements = this.pagServ.getShowList({
            entry: this.perPage,
            list: this.listOfElements,
            pageToShow: this.actualPage
        });
    };
    ElementsComponent.prototype.onPrev = function () {
        this.actualPage--;
        this.updateListaShow();
    };
    ElementsComponent.prototype.onNext = function (ev) {
        this.actualPage++;
        this.updateListaShow();
    };
    ElementsComponent.prototype.onPage = function (page) {
        this.actualPage = page;
        this.updateListaShow();
    };
    ElementsComponent.prototype.eventChange = function (ev, data) {
        if (ev.target.checked) {
            this.listaElementsDelete.push(data);
        }
        else {
            var index = this.listaElementsDelete.indexOf(data);
            if (index > -1) {
                this.listaElementsDelete.splice(index, 1);
            }
        }
    };
    ElementsComponent.prototype.deleteElements = function () {
        var _this = this;
        if (this.listaElementsDelete.length > 0) {
            if (confirm('Do you really want delete this Roles?')) {
                console.log(this.listaElementsDelete);
                this.ecService.deleteElements(this.listaElementsDelete).subscribe(function (data) {
                    _this.listaElementsDelete = [];
                    _this.listOfElements = data;
                    _this.ecService.setElements(_this.listOfElements);
                    _this.updateListaShow();
                });
            }
        }
    };
    return ElementsComponent;
}());
ElementsComponent = __decorate([
    core_1.Component({
        selector: 'wb-elements',
        template: __webpack_require__("./src/plugins/Hardel/Website/component/Elements/elements.component.html"),
        styles: ['']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof website_service_1.WebsiteService !== "undefined" && website_service_1.WebsiteService) === "function" && _a || Object, typeof (_b = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _b || Object])
], ElementsComponent);
exports.ElementsComponent = ElementsComponent;
var _a, _b;
//# sourceMappingURL=elements.component.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/NewComponent/componentnew.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form\">\n    <div class=\"portlet\">\n        <div class=\"portlet-title\">\n            <div class=\"caption\">\n                <i class=\"fa fa-database\"></i>\n                <span>General Definitions</span>\n            </div>\n            <div class=\"actions\">\n            </div>\n        </div>\n        <div class=\"portlet-body\">\n            <div class=\"portlet-form-body\">\n                <div class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"nome\" class=\"col-md-2 control-label\">Nome</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"nome\" placeholder=\"Nome\" id=\"nome\" [(ngModel)] = \"component.name\" >\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"appearance\" class=\"col-md-2 control-label\">Appearance</label>\n                                <div class=\"col-md-4\">\n                                    <textarea type=\"text\" class=\"form-control\" name=\"appearance\" id=\"appearance\" [(ngModel)] = \"component.appearance\" ></textarea>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"portlet\">\n        <div class=\"portlet-title\">\n            <div class=\"caption\">\n                <i class=\"fa fa-list\"></i>\n                <span>Elements</span>\n            </div>\n            <div class=\"actions\">\n                <button class=\"btn cyan\" data-toggle=\"modal\" data-target=\"#addModal\">\n                    <i class=\"fa fa-plus\"></i>\n                    Add\n                </button>\n            </div>\n        </div>\n        <div class=\"portlet-body\">\n            <div class=\"box\">\n                <div class=\"box-header\">\n\n                </div>\n                <div class=\"box-body\">\n                    <div class=\"wrapper\">\n                        <div class=\"row\">\n                            <div class=\"col-sm-12\">\n                                <table class=\"table table-bordered table-striped\" *ngIf=\"component.elements.length > 0\">\n                                    <thead>\n                                    <tr>\n                                        <th>\n                                            <a>Nome</a>\n                                        </th>\n                                        <th style=\"width: 50px;\"></th>\n                                    </tr>\n                                    </thead>\n                                    <tbody>\n                                    <tr *ngFor=\"let el of component.elements\">\n                                        <td>\n                                            {{el.name}}\n                                        </td>\n                                        <td>\n                                            <a class=\"td_orange\" (click)=\"eraseElement(el)\" *ngIf=\"isEdit == true\"><i class=\"fa fa-window-close-o\"></i></a>\n                                        </td>\n                                    </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-12\">\n            <button class=\"btn orange\" (click)=\"saveMode()\">Save</button>\n            <button class=\"btn red\" (click)=\"resetMode()\">Reset</button>\n        </div>\n    </div>\n    <div id=\"addModal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"addModal\"  aria-hidden=\"true\">\n        <div class=\"modal-dialog\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <div class=\"modal-title\">\n                        Searching For Permission\n                        <button class=\"close\" data-dismiss = \"modal\" aria-label=\"hidden\"><i class=\"fa fa-times\"></i></button>\n                    </div>\n                </div>\n                <div class=\"modal-body\">\n                    <div class=\"row\">\n                        <div class=\"col-md-12\">\n                            <div class=\"form-group flex-group\">\n                                <label class=\"col-md-4\">Name</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control input-sm\" name=\"query\" [(ngModel)]=\"query\" (keyup)=\"filter()\" autocomplete=\"off\">\n                                    <div class=\"suggestions\" *ngIf=\"filteredList.length > 0\">\n                                        <ul>\n                                            <li class=\"suggestion-li\" *ngFor=\"let item of filteredList\">\n                                                <a (click)=\"addElement(item)\">{{item.name}}</a>\n                                            </li>\n                                        </ul>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"modal-footer\">\n                    <div class=\"m-footer\">\n\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</form>"

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/NewComponent/componentnew.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by hernan on 20/11/2017.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var website_service_1 = __webpack_require__("./src/plugins/Hardel/Website/Services/website.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var NewComponent = (function () {
    function NewComponent(ncsService, router) {
        this.ncsService = ncsService;
        this.router = router;
        this.listElements = [];
        this.isEdit = false;
        this.filteredList = [];
        this.query = '';
        this.component = {
            id: -1,
            name: '',
            check: false,
            appearance: '',
            elements: []
        };
    }
    NewComponent.prototype.ngOnInit = function () {
        this.retriveElement();
    };
    NewComponent.prototype.retriveElement = function () {
        var _this = this;
        this.ncsService.getElementsFrom().subscribe(function (elements) {
            _this.listElements = elements;
            _this.component.elements.forEach(function (item) {
                var index = -1;
                for (var i = 0; i < _this.listElements.length; i++) {
                    var m = _this.listElements[i];
                    if (m.id === item.id && m.name === item.name) {
                        index = i;
                        break;
                    }
                }
                if (index > -1) {
                    _this.listElements.splice(index, 1);
                }
            });
        });
        this.cloneComponent();
    };
    /**
     * This function filter permission for research
     */
    NewComponent.prototype.filter = function () {
        if (this.query !== "") {
            this.filteredList = this.listElements.filter(function (el) {
                return el.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        }
    };
    /**
     * This function delete Permission from role.permissions
     * @param item
     */
    NewComponent.prototype.eraseElement = function (item) {
        // cancella il permesso
        var index = this.component.elements.indexOf(item);
        if (index > -1) {
            this.component.elements.splice(index, 1);
        }
    };
    /**
     * This Function add Permission at the moment to role.permissions
     * @param item
     */
    NewComponent.prototype.addElement = function (item) {
        //aggiunge un permesso
        this.filteredList = [];
        this.query = item.name;
        this.component.elements.push(item);
    };
    /**
     * This function go to save Mode
     */
    NewComponent.prototype.saveMode = function () {
        //salva i cambiamenti
        var _this = this;
        if (!this.isEqual(this.component, this.copyComponent)) {
            if (this.component.name.length == 0) {
                alert('You must write a name of Role, please!');
                this.cloneCopyComponent();
                return;
            }
            this.ncsService.createComponent(this.component).subscribe(function (data) {
                if (!data.hasOwnProperty('state')) {
                    data.state = false;
                }
                //push the item into roles
                _this.ncsService.setComponent(data);
                _this.ncsService.updateListOfComponents();
                //navigate to Settings Roles
                _this.router.navigate(['/backend/website/components']);
            });
        }
    };
    NewComponent.prototype.isEqual = function (v, v2) {
        return (v.name == v2.name) && (v.state == v2.state) && (v.elements.length == v2.elements.length);
    };
    /**
     * This function clone the Role
     */
    NewComponent.prototype.cloneComponent = function () {
        var elements = [];
        for (var _i = 0, _a = this.component.elements; _i < _a.length; _i++) {
            var perm = _a[_i];
            elements.push(perm);
        }
        this.copyComponent = Object.assign({}, this.component);
        this.copyComponent.elements = elements;
    };
    /**
     * This function clone the CopyRole
     */
    NewComponent.prototype.cloneCopyComponent = function () {
        var elements = [];
        for (var _i = 0, _a = this.copyComponent.elements; _i < _a.length; _i++) {
            var perm = _a[_i];
            elements.push(perm);
        }
        this.component = Object.assign({}, this.copyComponent);
        this.component.elements = elements;
    };
    return NewComponent;
}());
NewComponent = __decorate([
    core_1.Component({
        selector: 'wb-new-component',
        template: __webpack_require__("./src/plugins/Hardel/Website/component/NewComponent/componentnew.component.html"),
        styles: ['']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof website_service_1.WebsiteService !== "undefined" && website_service_1.WebsiteService) === "function" && _a || Object, typeof (_b = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _b || Object])
], NewComponent);
exports.NewComponent = NewComponent;
var _a, _b;
//# sourceMappingURL=componentnew.component.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/NewElement/elementnew.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form\">\n    <div class=\"portlet\">\n        <div class=\"portlet-title\">\n            <div class=\"caption\">\n                <i class=\"fa fa-database\"></i>\n                <span>General Definitions</span>\n            </div>\n            <div class=\"actions\">\n            </div>\n        </div>\n        <div class=\"portlet-body\">\n            <div class=\"portlet-form-body\">\n                <div class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"name\" class=\"col-md-2 control-label\">Name</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"name\" placeholder=\"Name\" id=\"name\" [(ngModel)] = \"element.name\" >\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"object\" class=\"col-md-2 control-label\">Object</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"object\" placeholder=\"Object\" id=\"object\" [(ngModel)] = \"element.Object\" >\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"function\" class=\"col-md-2 control-label\">Functions</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"function\" placeholder=\"Functions\" id=\"function\" [(ngModel)] = \"element.functions\" >\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"appearance\" class=\"col-md-2 control-label\">Appearance</label>\n                                <div class=\"col-md-4\">\n                                    <textarea type=\"text\" class=\"form-control\" name=\"appearance\" id=\"appearance\" [(ngModel)] = \"element.appearance\" ></textarea>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-12\">\n            <button class=\"btn orange\" (click)=\"saveMode()\">Save</button>\n            <button class=\"btn red\" (click)=\"resetMode()\">Reset</button>\n        </div>\n    </div>\n</form>"

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/NewElement/elementnew.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by hernan on 17/11/2017.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var website_service_1 = __webpack_require__("./src/plugins/Hardel/Website/Services/website.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var ElementNewComponent = (function () {
    function ElementNewComponent(neService, router) {
        this.neService = neService;
        this.router = router;
        this.element = {
            id: -1,
            name: '',
            Object: '',
            functions: '',
            appearance: '',
            check: false
        };
        this.cloneElement();
    }
    ElementNewComponent.prototype.ngOnInit = function () { };
    ElementNewComponent.prototype.saveMode = function () {
        var _this = this;
        if (!this.isEqual(this.element, this.copyElement)) {
            this.neService.createElement(this.element).subscribe(function (element) {
                _this.neService.setElement(element);
                _this.neService.updateListOfElements();
                _this.router.navigate(['/backend/website/elements']);
            });
        }
    };
    ElementNewComponent.prototype.resetMode = function () {
        if (confirm("Do you really want reset all fields?")) {
            this.cloneCopyElement();
        }
    };
    ElementNewComponent.prototype.cloneElement = function () {
        this.copyElement = Object.assign({}, this.element);
    };
    ElementNewComponent.prototype.cloneCopyElement = function () {
        this.element = Object.assign({}, this.copyElement);
    };
    ElementNewComponent.prototype.isEqual = function (v1, v2) {
        return (v1.name == v2.name);
    };
    return ElementNewComponent;
}());
ElementNewComponent = __decorate([
    core_1.Component({
        selector: 'wb-new-element',
        template: __webpack_require__("./src/plugins/Hardel/Website/component/NewElement/elementnew.component.html"),
        styles: ['']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof website_service_1.WebsiteService !== "undefined" && website_service_1.WebsiteService) === "function" && _a || Object, typeof (_b = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _b || Object])
], ElementNewComponent);
exports.ElementNewComponent = ElementNewComponent;
var _a, _b;
//# sourceMappingURL=elementnew.component.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/NewPage/pagenew.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form\">\n    <div class=\"portlet\">\n        <div class=\"portlet-title\">\n            <div class=\"caption\">\n                <i class=\"fa fa-database\"></i>\n                <span>General Definitions</span>\n            </div>\n            <div class=\"actions\">\n            </div>\n        </div>\n        <div class=\"portlet-body\">\n            <div class=\"portlet-form-body\">\n                <div class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"title\" class=\"col-md-2 control-label\">Title</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"title\" placeholder=\"Title\" id=\"title\" [(ngModel)] = \"page.title\" >\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"slug\" class=\"col-md-2 control-label\">Slug</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"slug\" placeholder=\"Slug\" id=\"slug\" [(ngModel)] = \"page.slug\" >\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"fileName\" class=\"col-md-2 control-label\">File Name</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"fileName\" placeholder=\"File Name\" id=\"fileName\" [(ngModel)] = \"page.fileName\" >\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"meta_tag\" class=\"col-md-2 control-label\">Meta Tag</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"meta_tag\" placeholder=\"Meta Tag\" id=\"meta_tag\" [(ngModel)] = \"page.metaTag\" >\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"meta_desc\" class=\"col-md-2 control-label\">Meta Desc</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"meta_desc\" placeholder=\"Meta Desc\" id=\"meta_desc\" [(ngModel)] = \"page.metaDesc\" >\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"new-page\" class=\"col-md-2 control-label\">State</label>\n                                <div class=\"col-md-4\">\n                                    <select class=\"form-control\" name=\"state\" [(ngModel)] = \"page.state\">\n                                        <option *ngFor=\"let x of listOfState\" [ngValue]=\"x\">{{x.label}}</option>\n                                    </select>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"new-page\" class=\"col-md-2 control-label\">Content</label>\n                                <div class=\"col-md-10\">\n                                   <app-editor [elementId]=\"'new-page'\" id=\"new-page\" [content]=\"page.content\" (onEditorKeyup)=\"keyupHandlerFunction($event)\"></app-editor>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-12\">\n            <button class=\"btn orange\" (click)=\"saveMode()\">Save</button>\n            <button class=\"btn red\" (click)=\"resetMode()\">Reset</button>\n        </div>\n    </div>\n</form>"

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/NewPage/pagenew.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var website_service_1 = __webpack_require__("./src/plugins/Hardel/Website/Services/website.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var PageNewComponent = (function () {
    function PageNewComponent(pn_Service, rout) {
        var _this = this;
        this.pn_Service = pn_Service;
        this.rout = rout;
        this.page = {
            id: -1,
            title: '',
            slug: '',
            metaTag: '',
            metaDesc: '',
            check: false,
            state: {},
            content: '',
            fileName: '',
        };
        this.clonePage();
        this.pn_Service.getPageAtt().subscribe(function (data) {
            _this.listOfState = data.states;
        });
    }
    PageNewComponent.prototype.ngOnInit = function () { };
    PageNewComponent.prototype.resetMode = function () {
        if (confirm('Do you want to reset all data?')) {
            this.cloneCopyPage();
        }
    };
    PageNewComponent.prototype.clonePage = function () {
        this.copyPage = Object.assign({}, this.page);
    };
    PageNewComponent.prototype.cloneCopyPage = function () {
        this.page = Object.assign({}, this.copyPage);
    };
    PageNewComponent.prototype.saveMode = function () {
        var _this = this;
        if (this.isEqual(this.page, this.copyPage)) {
            this.pn_Service.createPage(this.page).subscribe(function (page) {
                _this.pn_Service.setPage(page);
                _this.pn_Service.updateListOfPages();
                _this.rout.navigate(['/backend/website/pages']);
            });
        }
    };
    PageNewComponent.prototype.isEqual = function (v1, v2) {
        return (v1.title != v2.title && v1.slug != v2.slug);
    };
    PageNewComponent.prototype.keyupHandlerFunction = function (event) {
        this.page.content = event;
    };
    return PageNewComponent;
}());
PageNewComponent = __decorate([
    core_1.Component({
        selector: 'wb-new-page',
        template: __webpack_require__("./src/plugins/Hardel/Website/component/NewPage/pagenew.component.html"),
        styles: ['']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof website_service_1.WebsiteService !== "undefined" && website_service_1.WebsiteService) === "function" && _a || Object, typeof (_b = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _b || Object])
], PageNewComponent);
exports.PageNewComponent = PageNewComponent;
var _a, _b;
//# sourceMappingURL=pagenew.component.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/Page/page.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form\">\n    <div class=\"portlet\">\n        <div class=\"portlet-title\">\n            <div class=\"caption\">\n                <i class=\"fa fa-database\"></i>\n                <span>General Definitions</span>\n            </div>\n            <div class=\"actions\">\n                <button class=\"btn darkorange\" (click)=\"editMode()\">\n                    <i class=\"fa fa-edit\"></i>\n                    Edit\n                </button>\n            </div>\n        </div>\n        <div class=\"portlet-body\">\n            <div class=\"portlet-form-body\">\n                <div class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"title\" class=\"col-md-2 control-label\">Title</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"title\" [ngModel] = \"page.title\" placeholder=\"Title\" id=\"title\" *ngIf=\"isEdit === false; else editTitle\" readonly>\n                                    <ng-template #editTitle>\n                                        <input type=\"text\" class=\"form-control\" name=\"title\" placeholder=\"Title\" id=\"title\" [(ngModel)] = \"page.title\" >\n                                    </ng-template>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"slug\" class=\"col-md-2 control-label\">Slug</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"slug\" placeholder=\"Slug\" id=\"slug\" [ngModel] = \"page.slug\" *ngIf=\"isEdit === false; else editSlug\" readonly>\n                                    <ng-template #editSlug>\n                                        <input type=\"text\" class=\"form-control\" name=\"slug\" placeholder=\"Slug\" id=\"slug\" [(ngModel)] = \"page.slug\" >\n                                    </ng-template>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"fileName\" class=\"col-md-2 control-label\">File Name</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"fileName\" placeholder=\"File Name\" id=\"fileName\" [ngModel] = \"page.fileName\" *ngIf=\"isEdit === false; else editFileName\" readonly>\n                                    <ng-template #editFileName>\n                                        <input type=\"text\" class=\"form-control\" name=\"fileName\" placeholder=\"File Name\" id=\"fileName\" [(ngModel)] = \"page.fileName\" >\n                                    </ng-template>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"meta_tag\" class=\"col-md-2 control-label\">Meta Tag</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"meta_tag\" placeholder=\"Meta Tag\" id=\"meta_tag\" [ngModel] = \"page.metaTag\" *ngIf=\"isEdit === false; else editMetaTag\" readonly>\n                                    <ng-template #editMetaTag>\n                                        <input type=\"text\" class=\"form-control\" name=\"meta_tag\" placeholder=\"Meta Tag\" id=\"meta_tag\" [(ngModel)] = \"page.metaTag\" >\n                                    </ng-template>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"meta_desc\" class=\"col-md-2 control-label\">Meta Desc</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"meta_desc\" placeholder=\"Meta Desc\" id=\"meta_desc\" [ngModel] = \"page.metaDesc\" *ngIf=\"isEdit === false; else editMetaDesc\" readonly>\n                                    <ng-template #editMetaDesc>\n                                        <input type=\"text\" class=\"form-control\" name=\"meta_desc\" placeholder=\"Meta Desc\" id=\"meta_desc\" [(ngModel)] = \"page.metaDesc\" >\n                                    </ng-template>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"state\" class=\"col-md-2 control-label\">State</label>\n                                <div class=\"col-md-4\">\n                                    <select class=\"form-control\" name=\"state\"  id=\"state\" *ngIf=\"isEdit === false; else editState\" disabled>\n                                        <ng-container>\n                                            <option *ngFor=\"let x of listOfState\" [ngValue]=\"x\" [attr.selected] = \"x == page.state ? true : null\">{{x.label}}</option>\n                                        </ng-container>\n                                    </select>\n                                    <ng-template #editState>\n                                        <select class=\"form-control\" name=\"state\" [(ngModel)] = \"page.state\">\n                                            <option *ngFor=\"let x of listOfState\" [ngValue]=\"x\" [attr.selected] = \"x == page.state ? true : null\">{{x.label}}</option>\n                                        </select>\n                                    </ng-template>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"edit-page\" class=\"col-md-2 control-label\">Content</label>\n                                <div class=\"col-md-10\">\n                                    <div class=\"form-control\" [innerHtml] = \"page.content\" *ngIf=\"isEdit === false; else editContent\" disabled></div>\n                                    <ng-template #editContent>\n                                        <app-editor [elementId]=\"'edit-page'\" id=\"edit-page\" [content]=\"page.content\" (onEditorKeyup)=\"keyupHandlerFunction($event)\"></app-editor>\n                                    </ng-template>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-12\">\n            <button class=\"btn orange\" (click)=\"saveMode()\">Save</button>\n            <button class=\"btn red\" (click)=\"resetMode()\">Reset</button>\n        </div>\n    </div>\n</form>"

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/Page/page.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var website_interfaces_1 = __webpack_require__("./src/plugins/Hardel/Website/Services/website.interfaces.ts");
var website_service_1 = __webpack_require__("./src/plugins/Hardel/Website/Services/website.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var PageComponent = (function () {
    function PageComponent(pService, router, nav) {
        var _this = this;
        this.pService = pService;
        this.router = router;
        this.nav = nav;
        this.isEdit = false;
        this.notFound = false;
        this.query = '';
        this.page = {
            id: -2,
            title: '',
            check: false,
            state: {},
            metaDesc: '',
            metaTag: '',
            slug: '',
            fileName: '',
            content: ''
        };
        this.pService.getPageAtt().subscribe(function (data) {
            _this.listOfState = data.states;
        });
        this.sub = this.router.params.subscribe(function (params) {
            _this.id = +params['id'];
            _this.page = _this.pService.getPageByProperty('id', _this.id);
            if (_this.page != null) {
                _this.notFound = true;
            }
            else {
                _this.nav.navigate(['/backend/not-found']);
            }
            _this.clonePage();
        });
    }
    PageComponent.prototype.ngOnInit = function () { };
    /**
     * This function pass into edit Mode
     */
    PageComponent.prototype.editMode = function () {
        //passa in modalità edit
        this.isEdit = !this.isEdit;
    };
    PageComponent.prototype.resetMode = function () {
        if (confirm('Do you want to reset all data?')) {
            this.cloneCopyPage();
        }
    };
    PageComponent.prototype.clonePage = function () {
        this.copyPage = Object.assign({}, this.page);
    };
    PageComponent.prototype.cloneCopyPage = function () {
        this.page = Object.assign({}, this.copyPage);
    };
    PageComponent.prototype.saveMode = function () {
        var _this = this;
        if (this.page.slug.length > 0) {
            this.pService.savePage(this.page).subscribe(function (page) {
                _this.page = page;
                _this.clonePage();
                _this.pService.updatePageInList(_this.page);
                _this.pService.updateListOfPages();
                _this.editMode();
            });
        }
        else {
            alert('The slug cannot be empty, please!');
            this.cloneCopyPage();
            return;
        }
    };
    PageComponent.prototype.keyupHandlerFunction = function (event) {
        this.page.content = event;
    };
    return PageComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", typeof (_a = typeof website_interfaces_1.Page !== "undefined" && website_interfaces_1.Page) === "function" && _a || Object)
], PageComponent.prototype, "page", void 0);
PageComponent = __decorate([
    core_1.Component({
        selector: 'wb-page',
        template: __webpack_require__("./src/plugins/Hardel/Website/component/Page/page.component.html"),
        styles: ['']
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof website_service_1.WebsiteService !== "undefined" && website_service_1.WebsiteService) === "function" && _b || Object, typeof (_c = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _c || Object, typeof (_d = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _d || Object])
], PageComponent);
exports.PageComponent = PageComponent;
var _a, _b, _c, _d;
//# sourceMappingURL=page.component.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/Pages/pages.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"tabbable-custom\" *ngIf=\"isRoot === true\">\n    <ul class=\"nav nav-tabs\">\n        <li class=\"active\">\n            <a href=\"#tab_1\" data-toggle=\"tab\"> Pages</a>\n        </li>\n        <li>\n            <a [routerLink]=\"['/backend/website/menu']\" data-toggle=\"tab\"> Menu</a>\n        </li>\n        <li>\n            <a [routerLink]=\"['/backend/website/components']\" data-toggle=\"tab\"> Component</a>\n        </li>\n        <li>\n            <a [routerLink]=\"['/backend/website/elements']\" data-toggle=\"tab\"> Element</a>\n        </li>\n    </ul>\n    <div class=\"tab-content\">\n        <div class=\"tab-pane active\" id=\"tab_1\">\n            <div class=\"box\">\n                <div class=\"box-header\">\n\n                </div>\n                <div class=\"box-body\">\n                    <div class=\"wrapper\">\n                        <div class=\"row\">\n                            <div class=\"col-md-8\">\n                                <lt-entry-pagination\n                                [entry]=\"'50-5'\"\n                                (onEntry)=\"onPerPage($event)\"\n                                >\n                                </lt-entry-pagination>\n                            </div>\n                            <div class=\"col-md-4\">\n                                <div class=\"dataTables_filter\">\n                                    <label>\n                                        Search:\n                                        <input type=\"search\" class=\"form-control input-sm\">\n                                    </label>\n                                    <a class=\"btn btn-primary\" [routerLink] = \"['/backend/website/pages/new']\"><i class=\"fa fa-file\"></i> New</a>\n                                    <a class=\"btn btn-danger\" (click)=\"deletePages()\"><i class=\"fa fa-times\"></i> Delete</a>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-sm-12\">\n                                <table class=\"table table-bordered table-striped\">\n                                    <thead>\n                                    <tr>\n                                        <th style=\"width: 30px;\"></th>\n                                        <th>\n                                            <a>Title</a>\n                                        </th>\n                                        <th>\n                                            Slug\n                                        </th>\n                                        <th style=\"width: 50px;\"></th>\n                                    </tr>\n                                    </thead>\n                                    <tbody>\n                                    <tr *ngFor=\"let page of listaPages\">\n                                        <td>\n                                            <input type=\"checkbox\" (change)=\"eventChange($event,page)\" [(ngModel)] = \"page.check\">\n                                        </td>\n                                        <td>\n                                            {{page.title}}\n                                        </td>\n                                        <td>\n                                            {{page.slug}}\n                                        </td>\n                                        <td>\n                                            <a [routerLink] = \"['/backend/website/pages',page.id]\"><i class=\"fa fa-edit\" style=\"color:orange; font-size: 16px;\"></i></a>\n                                        </td>\n                                    </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                        <lt-pagination\n                            [pagesToShow]=\"3\"\n                            [perPage]=\"perPage\"\n                            [count]=\"listaPages.length\"\n                            [loading]=\"false\"\n                            [page]=\"actualPage\"\n                            (goNext)=\"onNext($event)\"\n                            (goPage)=\"onPage($event)\"\n                            (goPrev)=\"onPrev()\"\n                        ></lt-pagination>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/Pages/pages.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var website_service_1 = __webpack_require__("./src/plugins/Hardel/Website/Services/website.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var pagination_service_1 = __webpack_require__("./src/services/pagination.service.ts");
var PagesComponent = (function () {
    function PagesComponent(wb_Service, router) {
        var _this = this;
        this.wb_Service = wb_Service;
        this.router = router;
        this.listaPages = [];
        this.myRoot = '/backend/website/pages';
        this.isRoot = false;
        if (!this.wb_Service.hasPermissions("Hardel.Website.Pages")) {
            this.router.navigate(['/backend/dashboard']);
        }
        this.listaPageDelete = [];
        //This is to manage the Pagination
        this.pagServ = new pagination_service_1.PaginationService();
        this.actualPage = 1;
        this.perPage = 3;
        this.router.events.subscribe(function (val) {
            if (val instanceof router_1.NavigationEnd) {
                if (_this.myRoot === val.url) {
                    _this.isRoot = true;
                }
                else {
                    _this.isRoot = false;
                }
            }
        });
        this.retrieveListOfPages();
        this.wb_Service.updatePages$.subscribe(function () {
            _this.retrieveListOfPages();
        });
    }
    PagesComponent.prototype.ngOnInit = function () {
    };
    PagesComponent.prototype.retrieveListOfPages = function () {
        var _this = this;
        if (!this.wb_Service.checkPagesExist()) {
            this.wb_Service.getPagesFrom().subscribe(function (pages) {
                _this.listaPages = pages;
                _this.listaPages.forEach(function (page) {
                    page.check = false;
                });
                _this.wb_Service.setPages(_this.listaPages);
                _this.updateListaShow();
            });
        }
        else {
            this.listaPages = this.wb_Service.getPages();
            this.listaPages.forEach(function (item) {
                if (!item.hasOwnProperty('check')) {
                    item.check = false;
                }
            });
            this.updateListaShow();
        }
    };
    PagesComponent.prototype.onPerPage = function (n) {
        this.perPage = n;
    };
    PagesComponent.prototype.updateListaShow = function () {
        this.listaShowPages = this.pagServ.getShowList({
            entry: this.perPage,
            list: this.listaPages,
            pageToShow: this.actualPage
        });
    };
    PagesComponent.prototype.onPrev = function () {
        this.actualPage--;
        this.updateListaShow();
    };
    PagesComponent.prototype.onNext = function (ev) {
        this.actualPage++;
        this.updateListaShow();
    };
    PagesComponent.prototype.onPage = function (page) {
        this.actualPage = page;
        this.updateListaShow();
    };
    /**
     * function to push or splice item into Deleted List of Roles
     * @param ev
     * @param data
     */
    PagesComponent.prototype.eventChange = function (ev, data) {
        if (ev.target.checked) {
            this.listaPageDelete.push(data);
        }
        else {
            var index = this.listaPageDelete.indexOf(data);
            if (index > -1) {
                this.listaPageDelete.splice(index, 1);
            }
        }
    };
    PagesComponent.prototype.deletePages = function () {
        var _this = this;
        if (this.listaPageDelete.length > 0) {
            if (confirm('Do you really want delete this Roles?')) {
                this.wb_Service.deletePages(this.listaPageDelete).subscribe(function (data) {
                    _this.listaPageDelete = [];
                    _this.listaPages = data;
                    _this.wb_Service.setPages(_this.listaPages);
                    _this.updateListaShow();
                });
            }
        }
    };
    return PagesComponent;
}());
PagesComponent = __decorate([
    core_1.Component({
        selector: 'wb-pages',
        template: __webpack_require__("./src/plugins/Hardel/Website/component/Pages/pages.component.html"),
        styles: ['']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof website_service_1.WebsiteService !== "undefined" && website_service_1.WebsiteService) === "function" && _a || Object, typeof (_b = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _b || Object])
], PagesComponent);
exports.PagesComponent = PagesComponent;
var _a, _b;
//# sourceMappingURL=pages.component.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by hernan on 13/11/2017.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var website_component_1 = __webpack_require__("./src/plugins/Hardel/Website/component/website.component.ts");
exports.WebsiteComponent = website_component_1.WebsiteComponent;
var pages_component_1 = __webpack_require__("./src/plugins/Hardel/Website/component/Pages/pages.component.ts");
exports.PagesComponent = pages_component_1.PagesComponent;
var pagenew_component_1 = __webpack_require__("./src/plugins/Hardel/Website/component/NewPage/pagenew.component.ts");
exports.PageNewComponent = pagenew_component_1.PageNewComponent;
var page_component_1 = __webpack_require__("./src/plugins/Hardel/Website/component/Page/page.component.ts");
exports.PageComponent = page_component_1.PageComponent;
var elements_component_1 = __webpack_require__("./src/plugins/Hardel/Website/component/Elements/elements.component.ts");
exports.ElementsComponent = elements_component_1.ElementsComponent;
var elementnew_component_1 = __webpack_require__("./src/plugins/Hardel/Website/component/NewElement/elementnew.component.ts");
exports.ElementNewComponent = elementnew_component_1.ElementNewComponent;
var element_component_1 = __webpack_require__("./src/plugins/Hardel/Website/component/Element/element.component.ts");
exports.ElementComponent = element_component_1.ElementComponent;
var components_component_1 = __webpack_require__("./src/plugins/Hardel/Website/component/Components/components.component.ts");
exports.ComponentsComponent = components_component_1.ComponentsComponent;
var componentnew_component_1 = __webpack_require__("./src/plugins/Hardel/Website/component/NewComponent/componentnew.component.ts");
exports.NewComponent = componentnew_component_1.NewComponent;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/website.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content-box\">\n    <div class=\"content-header\">\n        <h1>Website</h1>\n        <breadcrumbs></breadcrumbs>\n    </div>\n    <div class=\"content\">\n        <router-outlet></router-outlet>\n        <div class=\"portlet\" *ngIf=\"isRoot === true\">\n            <div class=\"portlet-title\">\n                <div class=\"caption\">\n                    <i class=\"fa fa-database\"></i>\n                    <span>Overviews</span>\n                </div>\n                <div class=\"actions\">\n                </div>\n            </div>\n            <div class=\"portlet-body\">\n                <div class=\"tiles\">\n                    <a [routerLink]=\"['/backend/website/pages']\">\n                        <div class=\"tile double bg-cyan\">\n                            <div class=\"tile-body\">\n                                <i class=\"fa fa-clone fa-6\"></i>\n                            </div>\n                            <div class=\"tile-object\">\n                                <div class=\"name\">\n                                    Pages\n                                </div>\n                            </div>\n                        </div>\n                    </a>\n                    <a [routerLink]=\"['/backend/website/menu']\">\n                        <div class=\"tile bg-orange\">\n                            <div class=\"tile-body\">\n                                <i class=\"fa fa-list fa-6\"></i>\n                            </div>\n                            <div class=\"tile-object\">\n                                <div class=\"name\">\n                                    Menu\n                                </div>\n                            </div>\n                        </div>\n                    </a>\n                    <a [routerLink]=\"['/backend/website/components']\">\n                        <div class=\"tile bg-lightgreen\">\n                            <div class=\"tile-body\">\n                                <i class=\"fa fa-cubes fa-6\"></i>\n                            </div>\n                            <div class=\"tile-object\">\n                                <div class=\"name\">\n                                    Component\n                                </div>\n                            </div>\n                        </div>\n                    </a>\n                    <a [routerLink]=\"['/backend/website/elements']\">\n                        <div class=\"tile bg-fucsia\">\n                            <div class=\"tile-body\">\n                                <i class=\"fa fa-cube fa-6\"></i>\n                            </div>\n                            <div class=\"tile-object\">\n                                <div class=\"name\">\n                                    Element\n                                </div>\n                            </div>\n                        </div>\n                    </a>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/plugins/Hardel/Website/component/website.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var WebsiteComponent = (function () {
    function WebsiteComponent(r) {
        var _this = this;
        this.r = r;
        this.myRoot = '/backend/website';
        this.isRoot = true;
        this.r.events.subscribe(function (val) {
            if (val instanceof router_1.NavigationEnd) {
                if (_this.myRoot === val.url) {
                    _this.isRoot = true;
                }
                else {
                    _this.isRoot = false;
                }
            }
        });
    }
    WebsiteComponent.prototype.ngOnInit = function () { };
    return WebsiteComponent;
}());
WebsiteComponent = __decorate([
    core_1.Component({
        selector: 'app-website',
        template: __webpack_require__("./src/plugins/Hardel/Website/component/website.component.html"),
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object])
], WebsiteComponent);
exports.WebsiteComponent = WebsiteComponent;
var _a;
//# sourceMappingURL=website.component.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Website/website.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var website_routing_1 = __webpack_require__("./src/plugins/Hardel/Website/website.routing.ts");
var breadcrumbs_module_1 = __webpack_require__("./src/app/backend-module/breadcrumbs/breadcrumbs.module.ts");
var common_1 = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
var website_service_1 = __webpack_require__("./src/plugins/Hardel/Website/Services/website.service.ts");
var editor_1 = __webpack_require__("./src/app/backend-module/Editor/editor.ts");
var uielement_module_1 = __webpack_require__("./src/app/backend-module/UIElement/uielement.module.ts");
var WebsiteModule = (function () {
    function WebsiteModule() {
    }
    return WebsiteModule;
}());
WebsiteModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            website_routing_1.routing,
            breadcrumbs_module_1.BreadCrumbModule,
            editor_1.EditorModule,
            uielement_module_1.UIElementModule
        ],
        providers: [website_service_1.WebsiteService],
        declarations: [website_routing_1.websiteComponent]
    })
], WebsiteModule);
exports.WebsiteModule = WebsiteModule;
//# sourceMappingURL=website.module.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Website/website.routing.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var component_1 = __webpack_require__("./src/plugins/Hardel/Website/component/index.ts");
var routes = [
    { path: '', component: component_1.WebsiteComponent, data: { breadcrumb: 'Website' }, children: [
            { path: 'pages', component: component_1.PagesComponent, data: { breadcrumb: 'Pages' }, children: [
                    { path: 'new', component: component_1.PageNewComponent, data: { breadcrumb: 'New' } },
                    { path: ':id', component: component_1.PageComponent, data: { breadcrumb: 'Page' } }
                ] },
            { path: 'elements', component: component_1.ElementsComponent, data: { breadcrumb: 'Elements' }, children: [
                    { path: 'new', component: component_1.ElementNewComponent, data: { breadcrumb: 'New' } },
                    { path: ':id', component: component_1.ElementComponent, data: { breadcrumb: 'Element' } }
                ] },
            { path: 'components', component: component_1.ComponentsComponent, data: { breadcrumb: 'Components' }, children: [
                    { path: 'new', component: component_1.NewComponent, data: { breadcrumb: 'New' } }
                ] }
        ] }
];
exports.routing = router_1.RouterModule.forChild(routes);
exports.websiteComponent = [component_1.WebsiteComponent, component_1.PagesComponent, component_1.PageNewComponent, component_1.PageComponent, component_1.ElementsComponent, component_1.ElementNewComponent, component_1.ElementComponent, component_1.ComponentsComponent, component_1.NewComponent];
//console.log(websiteComponent); 
//# sourceMappingURL=website.routing.js.map

/***/ })

});
//# sourceMappingURL=website.module.chunk.js.map