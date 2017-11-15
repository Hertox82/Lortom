webpackJsonp(["website.module"],{

/***/ "../../../../../src/plugins/Hardel/Website/Services/website.interfaces.ts":
/***/ (function(module, exports) {

/**
 * Created by hernan on 14/11/2017.
 */
//# sourceMappingURL=website.interfaces.js.map

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Website/Services/website.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WebsiteService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_urlApi_api_manager__ = __webpack_require__("../../../../../src/app/urlApi/api.manager.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__);
/**
 * Created by hernan on 14/11/2017.
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




var WebsiteService = (function () {
    function WebsiteService(http) {
        this.http = http;
        this._updatePages = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.updatePages$ = this._updatePages.asObservable();
        this.apiManager = new __WEBPACK_IMPORTED_MODULE_1__app_urlApi_api_manager__["a" /* ApiManager */]();
        // write the api route for setting
        var urls = [
            { namePath: 'getPages', path: 'pages' },
            { namePath: 'savePage', path: 'page' },
            { namePath: 'getPageAtt', path: 'pages/attribute/list' },
        ];
        //Add the Api to the ApiManager
        this.apiManager.addListUrlApi(urls);
    }
    /**
     * Check if User has permission
     * @param name
     * @returns {boolean}
     */
    WebsiteService.prototype.hasPermissions = function (name) {
        if (this.user == null) {
            this.user = JSON.parse(sessionStorage.getItem('user'));
        }
        for (var i = 0; i < this.user.permissions.length; i++) {
            if (this.user.permissions[i].name === name) {
                return true;
            }
        }
        return false;
    };
    WebsiteService.prototype.getPageByProperty = function (name, value) {
        var response;
        response = null;
        if (this.listOfPages == null) {
            this.listOfPages = JSON.parse(sessionStorage.getItem('pages'));
        }
        this.listOfPages.forEach(function (page) {
            if (page[name] === value) {
                response = page;
            }
        });
        return response;
    };
    WebsiteService.prototype.checkPagesExist = function () {
        return (sessionStorage.getItem('pages') !== null);
    };
    WebsiteService.prototype.getPagesFrom = function () {
        return this.http.get(this.apiManager.getPathByName('getPages'))
            .map(function (response) {
            return response.json().pages;
        });
    };
    WebsiteService.prototype.setPages = function (pages) {
        sessionStorage.setItem('pages', JSON.stringify(pages));
        this.listOfPages = pages;
    };
    WebsiteService.prototype.getPages = function () {
        if (this.listOfPages == null) {
            return JSON.parse(sessionStorage.getItem('pages'));
        }
        else {
            return this.listOfPages;
        }
    };
    WebsiteService.prototype.deletePages = function (pages) {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.put(this.apiManager.getPathByName('getPages'), pages, options)
            .map(function (response) {
            return response.json().pages;
        });
    };
    WebsiteService.prototype.createPage = function (page) {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post(this.apiManager.getPathByName('savePage'), page, options)
            .map(function (response) {
            return response.json().page;
        });
    };
    WebsiteService.prototype.setPage = function (page) {
        var pages = this.getPages();
        pages.push(page);
        this.deletePageFromCache();
        this.setPages(pages);
    };
    WebsiteService.prototype.deletePageFromCache = function () {
        this.listOfPages = null;
        sessionStorage.removeItem('pages');
    };
    WebsiteService.prototype.updateListOfPages = function () {
        this._updatePages.next();
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
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.put(this.apiManager.getPathByName('savePage'), page, options)
            .map(function (response) {
            return response.json().page;
        });
    };
    return WebsiteService;
}());
WebsiteService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]) === "function" && _a || Object])
], WebsiteService);

var _a;
//# sourceMappingURL=website.service.js.map

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Website/component/NewPage/pagenew.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form\">\n    <div class=\"portlet\">\n        <div class=\"portlet-title\">\n            <div class=\"caption\">\n                <i class=\"fa fa-database\"></i>\n                <span>General Definitions</span>\n            </div>\n            <div class=\"actions\">\n            </div>\n        </div>\n        <div class=\"portlet-body\">\n            <div class=\"portlet-form-body\">\n                <div class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"title\" class=\"col-md-2 control-label\">Title</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"title\" placeholder=\"Title\" id=\"title\" [(ngModel)] = \"page.title\" >\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"slug\" class=\"col-md-2 control-label\">Slug</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"slug\" placeholder=\"Slug\" id=\"slug\" [(ngModel)] = \"page.slug\" >\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"fileName\" class=\"col-md-2 control-label\">File Name</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"fileName\" placeholder=\"File Name\" id=\"fileName\" [(ngModel)] = \"page.fileName\" >\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"meta_tag\" class=\"col-md-2 control-label\">Meta Tag</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"meta_tag\" placeholder=\"Meta Tag\" id=\"meta_tag\" [(ngModel)] = \"page.metaTag\" >\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"meta_desc\" class=\"col-md-2 control-label\">Meta Desc</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"meta_desc\" placeholder=\"Meta Desc\" id=\"meta_desc\" [(ngModel)] = \"page.metaDesc\" >\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"new-page\" class=\"col-md-2 control-label\">State</label>\n                                <div class=\"col-md-4\">\n                                    <select class=\"form-control\" name=\"state\" [(ngModel)] = \"page.state\">\n                                        <option *ngFor=\"let x of listOfState\" [ngValue]=\"x\">{{x.label}}</option>\n                                    </select>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"new-page\" class=\"col-md-2 control-label\">Content</label>\n                                <div class=\"col-md-10\">\n                                   <app-editor [elementId]=\"'new-page'\" id=\"new-page\" [content]=\"page.content\" (onEditorKeyup)=\"keyupHandlerFunction($event)\"></app-editor>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-12\">\n            <button class=\"btn orange\" (click)=\"saveMode()\">Save</button>\n            <button class=\"btn red\" (click)=\"resetMode()\">Reset</button>\n        </div>\n    </div>\n</form>"

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Website/component/NewPage/pagenew.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageNewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_website_service__ = __webpack_require__("../../../../../src/plugins/Hardel/Website/Services/website.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PageNewComponent = (function () {
    function PageNewComponent(pn_Service) {
        var _this = this;
        this.pn_Service = pn_Service;
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'wb-new-page',
        template: __webpack_require__("../../../../../src/plugins/Hardel/Website/component/NewPage/pagenew.component.html"),
        styles: ['']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__Services_website_service__["a" /* WebsiteService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__Services_website_service__["a" /* WebsiteService */]) === "function" && _a || Object])
], PageNewComponent);

var _a;
//# sourceMappingURL=pagenew.component.js.map

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Website/component/Page/page.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form\">\n    <div class=\"portlet\">\n        <div class=\"portlet-title\">\n            <div class=\"caption\">\n                <i class=\"fa fa-database\"></i>\n                <span>General Definitions</span>\n            </div>\n            <div class=\"actions\">\n                <button class=\"btn darkorange\" (click)=\"editMode()\">\n                    <i class=\"fa fa-edit\"></i>\n                    Edit\n                </button>\n            </div>\n        </div>\n        <div class=\"portlet-body\">\n            <div class=\"portlet-form-body\">\n                <div class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"title\" class=\"col-md-2 control-label\">Title</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"title\" [ngModel] = \"page.title\" placeholder=\"Title\" id=\"title\" *ngIf=\"isEdit === false; else editTitle\" readonly>\n                                    <ng-template #editTitle>\n                                        <input type=\"text\" class=\"form-control\" name=\"title\" placeholder=\"Title\" id=\"title\" [(ngModel)] = \"page.title\" >\n                                    </ng-template>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"slug\" class=\"col-md-2 control-label\">Slug</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"slug\" placeholder=\"Slug\" id=\"slug\" [ngModel] = \"page.slug\" *ngIf=\"isEdit === false; else editSlug\" readonly>\n                                    <ng-template #editSlug>\n                                        <input type=\"text\" class=\"form-control\" name=\"slug\" placeholder=\"Slug\" id=\"slug\" [(ngModel)] = \"page.slug\" >\n                                    </ng-template>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"fileName\" class=\"col-md-2 control-label\">File Name</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"fileName\" placeholder=\"File Name\" id=\"fileName\" [ngModel] = \"page.fileName\" *ngIf=\"isEdit === false; else editFileName\" readonly>\n                                    <ng-template #editFileName>\n                                        <input type=\"text\" class=\"form-control\" name=\"fileName\" placeholder=\"File Name\" id=\"fileName\" [(ngModel)] = \"page.fileName\" >\n                                    </ng-template>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"meta_tag\" class=\"col-md-2 control-label\">Meta Tag</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"meta_tag\" placeholder=\"Meta Tag\" id=\"meta_tag\" [ngModel] = \"page.metaTag\" *ngIf=\"isEdit === false; else editMetaTag\" readonly>\n                                    <ng-template #editMetaTag>\n                                        <input type=\"text\" class=\"form-control\" name=\"meta_tag\" placeholder=\"Meta Tag\" id=\"meta_tag\" [(ngModel)] = \"page.metaTag\" >\n                                    </ng-template>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"meta_desc\" class=\"col-md-2 control-label\">Meta Desc</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"meta_desc\" placeholder=\"Meta Desc\" id=\"meta_desc\" [ngModel] = \"page.metaDesc\" *ngIf=\"isEdit === false; else editMetaDesc\" readonly>\n                                    <ng-template #editMetaDesc>\n                                        <input type=\"text\" class=\"form-control\" name=\"meta_desc\" placeholder=\"Meta Desc\" id=\"meta_desc\" [(ngModel)] = \"page.metaDesc\" >\n                                    </ng-template>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"state\" class=\"col-md-2 control-label\">State</label>\n                                <div class=\"col-md-4\">\n                                    <select class=\"form-control\" name=\"state\"  id=\"state\" *ngIf=\"isEdit === false; else editState\" disabled>\n                                        <ng-container>\n                                            <option *ngFor=\"let x of listOfState\" [ngValue]=\"x\" [attr.selected] = \"x == page.state ? true : null\">{{x.label}}</option>\n                                        </ng-container>\n                                    </select>\n                                    <ng-template #editState>\n                                        <select class=\"form-control\" name=\"state\" [(ngModel)] = \"page.state\">\n                                            <option *ngFor=\"let x of listOfState\" [ngValue]=\"x\" [attr.selected] = \"x == page.state ? true : null\">{{x.label}}</option>\n                                        </select>\n                                    </ng-template>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"edit-page\" class=\"col-md-2 control-label\">Content</label>\n                                <div class=\"col-md-10\">\n                                    <div class=\"form-control\" [innerHtml] = \"page.content\" *ngIf=\"isEdit === false; else editContent\" disabled></div>\n                                    <ng-template #editContent>\n                                        <app-editor [elementId]=\"'edit-page'\" id=\"edit-page\" [content]=\"page.content\" (onEditorKeyup)=\"keyupHandlerFunction($event)\"></app-editor>\n                                    </ng-template>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-12\">\n            <button class=\"btn orange\" (click)=\"saveMode()\">Save</button>\n            <button class=\"btn red\" (click)=\"resetMode()\">Reset</button>\n        </div>\n    </div>\n</form>"

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Website/component/Page/page.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_website_interfaces__ = __webpack_require__("../../../../../src/plugins/Hardel/Website/Services/website.interfaces.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_website_interfaces___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Services_website_interfaces__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_website_service__ = __webpack_require__("../../../../../src/plugins/Hardel/Website/Services/website.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__Services_website_interfaces__["Page"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__Services_website_interfaces__["Page"]) === "function" && _a || Object)
], PageComponent.prototype, "page", void 0);
PageComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'wb-page',
        template: __webpack_require__("../../../../../src/plugins/Hardel/Website/component/Page/page.component.html"),
        styles: ['']
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__Services_website_service__["a" /* WebsiteService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__Services_website_service__["a" /* WebsiteService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* Router */]) === "function" && _d || Object])
], PageComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=page.component.js.map

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Website/component/Pages/pages.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"tabbable-custom\" *ngIf=\"isRoot === true\">\n    <ul class=\"nav nav-tabs\">\n        <li class=\"active\">\n            <a href=\"#tab_1\" data-toggle=\"tab\"> Pages</a>\n        </li>\n        <li>\n            <a [routerLink]=\"['/backend/website/menu']\" data-toggle=\"tab\"> Menu</a>\n        </li>\n    </ul>\n    <div class=\"tab-content\">\n        <div class=\"tab-pane active\" id=\"tab_1\">\n            <div class=\"box\">\n                <div class=\"box-header\">\n\n                </div>\n                <div class=\"box-body\">\n                    <div class=\"wrapper\">\n                        <div class=\"row\">\n                            <div class=\"col-md-8\">\n                                <div class=\"dataTables_length\">\n                                    <label>\n                                        Show\n                                        <select class=\"form-control input-sm\" name=\"example_length\">\n                                            <option value=\"10\">10</option>\n                                        </select>\n                                        entries\n                                    </label>\n                                </div>\n                            </div>\n                            <div class=\"col-md-4\">\n                                <div class=\"dataTables_filter\">\n                                    <label>\n                                        Search:\n                                        <input type=\"search\" class=\"form-control input-sm\">\n                                    </label>\n                                    <a class=\"btn btn-primary\" [routerLink] = \"['/backend/website/pages/new']\"><i class=\"fa fa-file\"></i> New</a>\n                                    <a class=\"btn btn-danger\" (click)=\"deletePages()\"><i class=\"fa fa-times\"></i> Delete</a>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-sm-12\">\n                                <table class=\"table table-bordered table-striped\">\n                                    <thead>\n                                    <tr>\n                                        <th style=\"width: 30px;\"></th>\n                                        <th>\n                                            <a>Title</a>\n                                        </th>\n                                        <th>\n                                            Slug\n                                        </th>\n                                        <th style=\"width: 50px;\"></th>\n                                    </tr>\n                                    </thead>\n                                    <tbody>\n                                    <tr *ngFor=\"let page of listaPages\">\n                                        <td>\n                                            <input type=\"checkbox\" (change)=\"eventChange($event,page)\" [(ngModel)] = \"page.check\">\n                                        </td>\n                                        <td>\n                                            {{page.title}}\n                                        </td>\n                                        <td>\n                                            {{page.slug}}\n                                        </td>\n                                        <td>\n                                            <a [routerLink] = \"['/backend/website/pages',page.id]\"><i class=\"fa fa-edit\" style=\"color:orange; font-size: 16px;\"></i></a>\n                                        </td>\n                                    </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-sm-5\">\n                                <div class=\"dataTables_info\">Showing 1 to 10 of 57 entries</div>\n                            </div>\n                            <div class=\"col-sm-7\">\n                                <div class=\"dataTables_paginate\">\n                                    <ul class=\"pagination\">\n                                        <li class=\"page-item\">\n                                            <a class=\"page-link\" href=\"#\" aria-label=\"Previous\"><span aria-hidden=\"true\">«</span></a>\n                                        </li>\n                                        <li class=\"page-item active\">\n                                            <a class=\"page-link\" href=\"#\">1</a>\n                                        </li>\n                                        <li class=\"page-item\">\n                                            <a class=\"page-link\" href=\"#\">2</a>\n                                        </li>\n                                        <li class=\"page-item\">\n                                            <a class=\"page-link\" href=\"#\" aria-label=\"Next\"><span aria-hidden=\"true\">»</span></a>\n                                        </li>\n                                    </ul>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<router-outlet></router-outlet>"

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Website/component/Pages/pages.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PagesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_website_service__ = __webpack_require__("../../../../../src/plugins/Hardel/Website/Services/website.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PagesComponent = (function () {
    function PagesComponent(wb_Service, router) {
        var _this = this;
        this.wb_Service = wb_Service;
        this.router = router;
        this.myRoot = '/backend/website/pages';
        this.isRoot = false;
        if (!this.wb_Service.hasPermissions("Hardel.Website.Pages")) {
            this.router.navigate(['/backend/dashboard']);
        }
        this.listaPageDelete = [];
        this.router.events.subscribe(function (val) {
            if (val instanceof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* NavigationEnd */]) {
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
        console.log(this.listaPages);
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
            });
        }
        else {
            this.listaPages = this.wb_Service.getPages();
            this.listaPages.forEach(function (item) {
                if (!item.hasOwnProperty('check')) {
                    item.check = false;
                }
            });
        }
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
                });
            }
        }
    };
    return PagesComponent;
}());
PagesComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'wb-pages',
        template: __webpack_require__("../../../../../src/plugins/Hardel/Website/component/Pages/pages.component.html"),
        styles: ['']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__Services_website_service__["a" /* WebsiteService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__Services_website_service__["a" /* WebsiteService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["d" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["d" /* Router */]) === "function" && _b || Object])
], PagesComponent);

var _a, _b;
//# sourceMappingURL=pages.component.js.map

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Website/component/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__website_component__ = __webpack_require__("../../../../../src/plugins/Hardel/Website/component/website.component.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__website_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Pages_pages_component__ = __webpack_require__("../../../../../src/plugins/Hardel/Website/component/Pages/pages.component.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__Pages_pages_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__NewPage_pagenew_component__ = __webpack_require__("../../../../../src/plugins/Hardel/Website/component/NewPage/pagenew.component.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__NewPage_pagenew_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Page_page_component__ = __webpack_require__("../../../../../src/plugins/Hardel/Website/component/Page/page.component.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__Page_page_component__["a"]; });
/**
 * Created by hernan on 13/11/2017.
 */




//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Website/component/website.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content-box\">\n    <div class=\"content-header\">\n        <h1>Website</h1>\n        <breadcrumbs></breadcrumbs>\n    </div>\n    <div class=\"content\">\n        <router-outlet></router-outlet>\n        <div class=\"portlet\" *ngIf=\"isRoot === true\">\n            <div class=\"portlet-title\">\n                <div class=\"caption\">\n                    <i class=\"fa fa-database\"></i>\n                    <span>Overviews</span>\n                </div>\n                <div class=\"actions\">\n                </div>\n            </div>\n            <div class=\"portlet-body\">\n                <div class=\"tiles\">\n                    <a [routerLink]=\"['/backend/website/pages']\">\n                        <div class=\"tile double bg-cyan\">\n                            <div class=\"tile-body\">\n                                <i class=\"fa fa-clone fa-6\"></i>\n                            </div>\n                            <div class=\"tile-object\">\n                                <div class=\"name\">\n                                    Pages\n                                </div>\n                            </div>\n                        </div>\n                    </a>\n                    <a [routerLink]=\"['/backend/website/menu']\">\n                        <div class=\"tile bg-orange\">\n                            <div class=\"tile-body\">\n                                <i class=\"fa fa-list fa-6\"></i>\n                            </div>\n                            <div class=\"tile-object\">\n                                <div class=\"name\">\n                                    Menu\n                                </div>\n                            </div>\n                        </div>\n                    </a>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Website/component/website.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WebsiteComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WebsiteComponent = (function () {
    function WebsiteComponent(router) {
        var _this = this;
        this.router = router;
        this.myRoot = '/backend/website';
        this.isRoot = true;
        this.router.events.subscribe(function (val) {
            if (val instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* NavigationEnd */]) {
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-website',
        template: __webpack_require__("../../../../../src/plugins/Hardel/Website/component/website.component.html"),
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* Router */]) === "function" && _a || Object])
], WebsiteComponent);

var _a;
//# sourceMappingURL=website.component.js.map

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Website/website.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebsiteModule", function() { return WebsiteModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__website_routing__ = __webpack_require__("../../../../../src/plugins/Hardel/Website/website.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_backend_module_breadcrumbs_breadcrumbs_module__ = __webpack_require__("../../../../../src/app/backend-module/breadcrumbs/breadcrumbs.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Services_website_service__ = __webpack_require__("../../../../../src/plugins/Hardel/Website/Services/website.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_backend_module_Editor_editor__ = __webpack_require__("../../../../../src/app/backend-module/Editor/editor.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var WebsiteModule = (function () {
    function WebsiteModule() {
    }
    return WebsiteModule;
}());
WebsiteModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_1__website_routing__["a" /* routing */],
            __WEBPACK_IMPORTED_MODULE_2__app_backend_module_breadcrumbs_breadcrumbs_module__["a" /* BreadCrumbModule */],
            __WEBPACK_IMPORTED_MODULE_7__app_backend_module_Editor_editor__["a" /* EditorModule */],
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_6__Services_website_service__["a" /* WebsiteService */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_1__website_routing__["b" /* websiteComponent */]]
    })
], WebsiteModule);

//# sourceMappingURL=website.module.js.map

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Website/website.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return websiteComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__component__ = __webpack_require__("../../../../../src/plugins/Hardel/Website/component/index.ts");


var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__component__["d" /* WebsiteComponent */], data: { breadcrumb: 'Website' }, children: [
            { path: 'pages', component: __WEBPACK_IMPORTED_MODULE_1__component__["c" /* PagesComponent */], data: { breadcrumb: 'Pages' }, children: [
                    { path: 'new', component: __WEBPACK_IMPORTED_MODULE_1__component__["b" /* PageNewComponent */], data: { breadcrumb: 'New' } },
                    { path: ':id', component: __WEBPACK_IMPORTED_MODULE_1__component__["a" /* PageComponent */], data: { breadcrumb: 'Page' } }
                ] }
        ] }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["e" /* RouterModule */].forChild(routes);
var websiteComponent = [__WEBPACK_IMPORTED_MODULE_1__component__["d" /* WebsiteComponent */], __WEBPACK_IMPORTED_MODULE_1__component__["c" /* PagesComponent */], __WEBPACK_IMPORTED_MODULE_1__component__["b" /* PageNewComponent */], __WEBPACK_IMPORTED_MODULE_1__component__["a" /* PageComponent */]];
//# sourceMappingURL=website.routing.js.map

/***/ })

});
//# sourceMappingURL=website.module.chunk.js.map