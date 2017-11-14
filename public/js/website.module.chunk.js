webpackJsonp(["website.module"],{

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
        return this.http.put(this.apiManager.getPathByName('getRoles'), pages, options)
            .map(function (response) {
            return response.json().pages;
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

/***/ "../../../../../src/plugins/Hardel/Website/component/Pages/pages.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"tabbable-custom\" *ngIf=\"isRoot === true\">\n    <ul class=\"nav nav-tabs\">\n        <li class=\"active\">\n            <a href=\"#tab_1\" data-toggle=\"tab\"> Pages</a>\n        </li>\n        <li>\n            <a [routerLink]=\"['/backend/website/menu']\" data-toggle=\"tab\"> Menu</a>\n        </li>\n    </ul>\n    <div class=\"tab-content\">\n        <div class=\"tab-pane active\" id=\"tab_1\">\n            <div class=\"box\">\n                <div class=\"box-header\">\n\n                </div>\n                <div class=\"box-body\">\n                    <div class=\"wrapper\">\n                        <div class=\"row\">\n                            <div class=\"col-md-8\">\n                                <div class=\"dataTables_length\">\n                                    <label>\n                                        Show\n                                        <select class=\"form-control input-sm\" name=\"example_length\">\n                                            <option value=\"10\">10</option>\n                                        </select>\n                                        entries\n                                    </label>\n                                </div>\n                            </div>\n                            <div class=\"col-md-4\">\n                                <div class=\"dataTables_filter\">\n                                    <label>\n                                        Search:\n                                        <input type=\"search\" class=\"form-control input-sm\">\n                                    </label>\n                                    <a class=\"btn btn-primary\" [routerLink] = \"['/backend/website/pages/new']\"><i class=\"fa fa-file\"></i> New</a>\n                                    <a class=\"btn btn-danger\" (click)=\"deletePages()\"><i class=\"fa fa-times\"></i> Delete</a>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-sm-12\">\n                                <table class=\"table table-bordered table-striped\">\n                                    <thead>\n                                    <tr>\n                                        <th style=\"width: 30px;\"></th>\n                                        <th>\n                                            <a>Title</a>\n                                        </th>\n                                        <th>\n                                            Slug\n                                        </th>\n                                        <th style=\"width: 50px;\"></th>\n                                    </tr>\n                                    </thead>\n                                    <tbody>\n                                    <tr *ngFor=\"let page of listaPages\">\n                                        <td>\n                                            <input type=\"checkbox\" (change)=\"eventChange($event,page)\" [(ngModel)] = \"page.state\">\n                                        </td>\n                                        <td>\n                                            {{page.title}}\n                                        </td>\n                                        <td>\n                                            {{page.slug}}\n                                        </td>\n                                        <td>\n                                            <a [routerLink] = \"['/backend/website/pages',page.id]\"><i class=\"fa fa-edit\" style=\"color:orange; font-size: 16px;\"></i></a>\n                                        </td>\n                                    </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-sm-5\">\n                                <div class=\"dataTables_info\">Showing 1 to 10 of 57 entries</div>\n                            </div>\n                            <div class=\"col-sm-7\">\n                                <div class=\"dataTables_paginate\">\n                                    <ul class=\"pagination\">\n                                        <li class=\"page-item\">\n                                            <a class=\"page-link\" href=\"#\" aria-label=\"Previous\"><span aria-hidden=\"true\">«</span></a>\n                                        </li>\n                                        <li class=\"page-item active\">\n                                            <a class=\"page-link\" href=\"#\">1</a>\n                                        </li>\n                                        <li class=\"page-item\">\n                                            <a class=\"page-link\" href=\"#\">2</a>\n                                        </li>\n                                        <li class=\"page-item\">\n                                            <a class=\"page-link\" href=\"#\" aria-label=\"Next\"><span aria-hidden=\"true\">»</span></a>\n                                        </li>\n                                    </ul>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<router-outlet></router-outlet>"

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
    }
    PagesComponent.prototype.ngOnInit = function () {
    };
    PagesComponent.prototype.retrieveListOfPages = function () {
        var _this = this;
        if (!this.wb_Service.checkPagesExist()) {
            this.wb_Service.getPagesFrom().subscribe(function (pages) {
                _this.listaPages = pages;
                _this.listaPages.forEach(function (role) {
                    role.state = false;
                });
                _this.wb_Service.setPages(_this.listaPages);
            });
        }
        else {
            this.listaPages = this.wb_Service.getPages();
            this.listaPages.forEach(function (item) {
                if (!item.hasOwnProperty('state')) {
                    item.state = false;
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
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__website_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Pages_pages_component__ = __webpack_require__("../../../../../src/plugins/Hardel/Website/component/Pages/pages.component.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__Pages_pages_component__["a"]; });
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
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__component__["b" /* WebsiteComponent */], data: { breadcrumb: 'Website' }, children: [
            { path: 'pages', component: __WEBPACK_IMPORTED_MODULE_1__component__["a" /* PagesComponent */], data: { breadcrumb: 'Pages' } }
        ] }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["e" /* RouterModule */].forChild(routes);
var websiteComponent = [__WEBPACK_IMPORTED_MODULE_1__component__["b" /* WebsiteComponent */], __WEBPACK_IMPORTED_MODULE_1__component__["a" /* PagesComponent */]];
//# sourceMappingURL=website.routing.js.map

/***/ })

});
//# sourceMappingURL=website.module.chunk.js.map