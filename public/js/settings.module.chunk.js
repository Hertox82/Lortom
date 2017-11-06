webpackJsonp(["settings.module"],{

/***/ "../../../../../src/plugins/Hardel/Settings/Services/settings.interfaces.ts":
/***/ (function(module, exports) {

//# sourceMappingURL=settings.interfaces.js.map

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Settings/Services/settings.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_urlApi_api_manager__ = __webpack_require__("../../../../../src/app/urlApi/api.manager.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SettingsService = (function () {
    function SettingsService(http) {
        this.http = http;
        this._oC = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__["Subject"]();
        this.oc$ = this._oC.asObservable();
        // create the ApiManager
        this.apiManager = new __WEBPACK_IMPORTED_MODULE_3__app_urlApi_api_manager__["a" /* ApiManager */]();
        // write the api route for setting
        var urls = [
            { namePath: 'getPermission', path: 'permissions' },
            { namePath: 'getRoles', path: 'roles' }
        ];
        //Add the Api to the ApiManager
        this.apiManager.addListUrlApi(urls);
    }
    /**
     * This function retrive the roles from the API (Laravel)
     * @returns {Observable<R>}
     */
    SettingsService.prototype.getRolesFrom = function () {
        return this.http.get(this.apiManager.getPathByName('getRoles'))
            .map(function (response) {
            return response.json().roles;
        });
    };
    /**
     * This function retrive the permissions from the API (Laravel)
     * @returns {Observable<R>}
     */
    SettingsService.prototype.getPermissionsFrom = function () {
        return this.http.get(this.apiManager.getPathByName('getPermission'))
            .map(function (response) {
            return response.json().permissions;
        });
    };
    /**
     * This function set the Roles
     * @param roles
     */
    SettingsService.prototype.setRoles = function (roles) {
        sessionStorage.setItem('roles', JSON.stringify(roles));
        this.listOfRoles = roles;
    };
    /**
     * This function check if Dataset of Roles exist
     * @returns {boolean}
     */
    SettingsService.prototype.checkRolesExist = function () {
        return (sessionStorage.getItem('roles') !== null);
    };
    /**
     * This function return Role passing a property
     * @param name
     * @param value
     * @returns {Role}
     */
    SettingsService.prototype.getRoleByProperty = function (name, value) {
        var response;
        response = null;
        if (this.listOfRoles == null) {
            this.listOfRoles = JSON.parse(sessionStorage.getItem('roles'));
        }
        this.listOfRoles.forEach(function (role) {
            if (role[name] === value) {
                response = role;
            }
        });
        return response;
    };
    /**
     * This function check if a role has permission
     * @param role
     * @param permission
     * @returns {boolean}
     */
    SettingsService.prototype.roleHasPermission = function (role, permission) {
        var response = false;
        role.permissions.forEach(function (p) {
            if (p.name === permission) {
                response = true;
            }
        });
        return response;
    };
    /**
     * This function get The Roles
     * @returns {any}
     */
    SettingsService.prototype.getRoles = function () {
        if (this.listOfRoles == null) {
            return JSON.parse(sessionStorage.getItem('roles'));
        }
        else {
            return this.listOfRoles;
        }
    };
    SettingsService.prototype.emitOc = function (object) {
        this._oC.next(object);
    };
    return SettingsService;
}());
SettingsService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], SettingsService);

var _a;
//# sourceMappingURL=settings.service.js.map

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Settings/component/Role/role.component.html":
/***/ (function(module, exports) {

module.exports = "\n<h3>Roles</h3>\n\n<form class=\"form\">\n    <div class=\"portlet\">\n        <div class=\"portlet-title\">\n            <div class=\"caption\">\n                <i class=\"fa fa-database\"></i>\n                <span>General Definitions</span>\n            </div>\n            <div class=\"actions\">\n                <button class=\"btn darkorange\" (click)=\"editMode()\">\n                    <i class=\"fa fa-edit\"></i>\n                    Edit\n                </button>\n            </div>\n        </div>\n        <div class=\"portlet-body\">\n            <div class=\"portlet-form-body\">\n                <div class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"nome\" class=\"col-md-2 control-label\">Nome</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"nome\" [ngModel] = \"role.name\" placeholder=\"Nome\" id=\"nome\" *ngIf=\"isEdit === false; else editName\" readonly>\n                                    <ng-template #editName>\n                                        <input type=\"text\" class=\"form-control\" name=\"nome\" placeholder=\"Nome\" id=\"nome\" [(ngModel)] = \"role.name\" >\n                                    </ng-template>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"portlet\">\n        <div class=\"portlet-title\">\n            <div class=\"caption\">\n                <i class=\"fa fa-list\"></i>\n                <span>Permissions</span>\n            </div>\n            <div class=\"actions\">\n                <button class=\"btn cyan\" data-toggle=\"modal\" data-target=\"#addModal\" *ngIf=\"isEdit == true\">\n                    <i class=\"fa fa-plus\"></i>\n                    Add\n                </button>\n            </div>\n        </div>\n        <div class=\"portlet-body\">\n            <div class=\"box\">\n                <div class=\"box-header\">\n\n                </div>\n                <div class=\"box-body\">\n                    <div class=\"wrapper\">\n                        <div class=\"row\">\n                            <div class=\"col-sm-12\">\n                                <table class=\"table table-bordered table-striped\">\n                                    <thead>\n                                    <tr>\n                                        <th>\n                                            <a>Nome</a>\n                                        </th>\n                                        <th style=\"width: 50px;\"></th>\n                                    </tr>\n                                    </thead>\n                                    <tbody>\n                                    <tr *ngFor=\"let permission of role.permissions\">\n                                        <td>\n                                            {{permission.name}}\n                                        </td>\n                                        <td>\n                                            <a class=\"td_orange\" (click)=\"erasePermission(permission)\" *ngIf=\"isEdit == true\"><i class=\"fa fa-window-close-o\"></i></a>\n                                        </td>\n                                    </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-12\">\n            <button class=\"btn orange\" (click)=\"saveMode()\">Save</button>\n            <button class=\"btn red\" (click)=\"resetMode()\">Reset</button>\n        </div>\n    </div>\n    <div id=\"addModal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"addModal\"  aria-hidden=\"true\">\n        <div class=\"modal-dialog\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <div class=\"modal-title\">\n                        Searching For Permission \n                        <button class=\"close\" data-dismiss = \"modal\" aria-label=\"hidden\"><i class=\"fa fa-times\"></i></button>\n                    </div>\n                </div>\n                <div class=\"modal-body\">\n                    <div class=\"row\">\n                        <div class=\"col-md-12\">\n                            <div class=\"form-group flex-group\">\n                                <label class=\"col-md-4\">Name</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control input-sm\" name=\"query\" [(ngModel)]=\"query\" (keyup)=\"filter()\">\n                                    <div class=\"suggestions\" *ngIf=\"filteredList.length > 0\">\n                                        <ul>\n                                            <li class=\"suggestion-li\" *ngFor=\"let item of filteredList\">\n                                                <a (click)=\"addPermissions(item)\">{{item.name}}</a>\n                                            </li>\n                                        </ul>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"modal-footer\">\n                    <div class=\"m-footer\">\n\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</form>"

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Settings/component/Role/role.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoleComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_settings_service__ = __webpack_require__("../../../../../src/plugins/Hardel/Settings/Services/settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_settings_interfaces__ = __webpack_require__("../../../../../src/plugins/Hardel/Settings/Services/settings.interfaces.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_settings_interfaces___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Services_settings_interfaces__);
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




var RoleComponent = (function () {
    function RoleComponent(sService, router) {
        var _this = this;
        this.sService = sService;
        this.router = router;
        this.listPermissions = [];
        this.isEdit = false;
        this.filteredList = [];
        this.query = '';
        this.sub = this.router.params.subscribe(function (params) {
            _this.id = +params['id'];
            _this.role = _this.sService.getRoleByProperty('id', _this.id);
        });
    }
    RoleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sService.getPermissionsFrom().subscribe(function (perms) {
            _this.listPermissions = perms;
            _this.role.permissions.forEach(function (item) {
                var index = -1;
                for (var i = 0; i < _this.listPermissions.length; i++) {
                    var m = _this.listPermissions[i];
                    if (m.id === item.id && m.name === item.name) {
                        index = i;
                        break;
                    }
                }
                if (index > -1) {
                    _this.listPermissions.splice(index, 1);
                }
            });
        });
    };
    RoleComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    RoleComponent.prototype.editMode = function () {
        //passa in modalità edit
        this.isEdit = !this.isEdit;
    };
    RoleComponent.prototype.saveMode = function () {
        //salva i cambiamenti
    };
    RoleComponent.prototype.resetMode = function () { };
    RoleComponent.prototype.addPermissions = function (item) {
        //aggiunge un permesso
        this.filteredList = [];
        this.query = item.name;
        this.role.permissions.push(item);
        var index = this.listPermissions.indexOf(item);
        if (index > -1) {
            this.listPermissions.splice(index, 1);
        }
    };
    RoleComponent.prototype.erasePermission = function (item) {
        // cancella il permesso
        this.listPermissions.push(item);
        var index = this.role.permissions.indexOf(item);
        if (index > -1) {
            this.role.permissions.splice(index, 1);
        }
    };
    RoleComponent.prototype.filter = function () {
        if (this.query !== "") {
            this.filteredList = this.listPermissions.filter(function (el) {
                return el.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        }
        else {
        }
    };
    return RoleComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__Services_settings_interfaces__["Role"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__Services_settings_interfaces__["Role"]) === "function" && _a || Object)
], RoleComponent.prototype, "role", void 0);
RoleComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-role',
        template: __webpack_require__("../../../../../src/plugins/Hardel/Settings/component/Role/role.component.html"),
        styles: ['']
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__Services_settings_service__["a" /* SettingsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__Services_settings_service__["a" /* SettingsService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object])
], RoleComponent);

var _a, _b, _c;
//# sourceMappingURL=role.component.js.map

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Settings/component/Roles/roles.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"tabbable-custom\" *ngIf=\"isRoot === true\">\n    <ul class=\"nav nav-tabs\">\n        <li class=\"active\">\n            <a href=\"#tab_1\" data-toggle=\"tab\"> Roles</a>\n        </li>\n        <li>\n            <a href=\"#tab_2\" data-toggle=\"tab\"> Permissions</a>\n        </li>\n    </ul>\n    <div class=\"tab-content\">\n        <div class=\"tab-pane active\" id=\"tab_1\">\n            <div class=\"box\">\n                <div class=\"box-header\">\n\n                </div>\n                <div class=\"box-body\">\n                    <div class=\"wrapper\">\n                        <div class=\"row\">\n                            <div class=\"col-md-10\">\n                                <div class=\"dataTables_length\">\n                                    <label>\n                                        Show\n                                        <select class=\"form-control input-sm\" name=\"example_length\">\n                                            <option value=\"10\">10</option>\n                                        </select>\n                                        entries\n                                    </label>\n                                </div>\n                            </div>\n                            <div class=\"col-md-2\">\n                                <div class=\"dataTables_filter\">\n                                    <label>\n                                        Search:\n                                        <input type=\"search\" class=\"form-control input-sm\">\n                                    </label>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-sm-12\">\n                                <table class=\"table table-bordered table-striped\">\n                                    <thead>\n                                    <tr>\n                                        <th style=\"width: 30px;\"></th>\n                                        <th>\n                                            <a>Nome</a>\n                                        </th>\n                                        <th style=\"width: 50px;\"></th>\n                                    </tr>\n                                    </thead>\n                                    <tbody>\n                                        <tr *ngFor=\"let role of listaRole\">\n                                            <td>\n                                                <input type=\"checkbox\">\n                                            </td>\n                                            <td>\n                                                {{role.name}}\n                                            </td>\n                                            <td>\n                                                <a [routerLink] = \"['/backend/settings/roles',role.id]\"><i class=\"fa fa-edit\" style=\"color:orange; font-size: 16px;\"></i></a>\n                                            </td>\n                                        </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-sm-5\">\n                                <div class=\"dataTables_info\">Showing 1 to 10 of 57 entries</div>\n                            </div>\n                            <div class=\"col-sm-7\">\n                                <div class=\"dataTables_paginate\">\n                                    <ul class=\"pagination\">\n                                        <li class=\"page-item\">\n                                            <a class=\"page-link\" href=\"#\" aria-label=\"Previous\"><span aria-hidden=\"true\">«</span></a>\n                                        </li>\n                                        <li class=\"page-item active\">\n                                            <a class=\"page-link\" href=\"#\">1</a>\n                                        </li>\n                                        <li class=\"page-item\">\n                                            <a class=\"page-link\" href=\"#\">2</a>\n                                        </li>\n                                        <li class=\"page-item\">\n                                            <a class=\"page-link\" href=\"#\" aria-label=\"Next\"><span aria-hidden=\"true\">»</span></a>\n                                        </li>\n                                    </ul>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<router-outlet></router-outlet>"

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Settings/component/Roles/roles.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RolesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_settings_service__ = __webpack_require__("../../../../../src/plugins/Hardel/Settings/Services/settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/**
 * Created by hernan on 30/10/2017.
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



var RolesComponent = (function () {
    function RolesComponent(m_Service, router) {
        var _this = this;
        this.m_Service = m_Service;
        this.router = router;
        this.myRoot = '/backend/settings/roles';
        this.isRoot = false;
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
        if (!this.m_Service.checkRolesExist()) {
            this.m_Service.getRolesFrom().subscribe(function (roles) {
                _this.listaRole = roles;
                _this.m_Service.setRoles(_this.listaRole);
            });
        }
        else {
            this.listaRole = this.m_Service.getRoles();
        }
    }
    RolesComponent.prototype.ngOnInit = function () {
    };
    return RolesComponent;
}());
RolesComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-roles-component',
        template: __webpack_require__("../../../../../src/plugins/Hardel/Settings/component/Roles/roles.component.html"),
        styles: ['']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__Services_settings_service__["a" /* SettingsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__Services_settings_service__["a" /* SettingsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["d" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["d" /* Router */]) === "function" && _b || Object])
], RolesComponent);

var _a, _b;
//# sourceMappingURL=roles.component.js.map

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Settings/component/settings.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content-box\">\n    <div class=\"content-header\">\n        <h1>Settings</h1>\n        <breadcrumbs></breadcrumbs>\n    </div>\n    <div class=\"content\">\n        <router-outlet></router-outlet>\n        <div class=\"portlet\" *ngIf=\"isRoot === true\">\n            <div class=\"portlet-title\">\n                <div class=\"caption\">\n                    <i class=\"fa fa-database\"></i>\n                    <span>Overviews</span>\n                </div>\n                <div class=\"actions\">\n                </div>\n            </div>\n            <div class=\"portlet-body\">\n                <div class=\"tiles\">\n                    <a [routerLink]=\"['/backend/settings/roles']\">\n                        <div class=\"tile bg-orange\">\n                            <div class=\"tile-body\">\n                                    <i class=\"fa fa-list fa-6\"></i>\n                            </div>\n                            <div class=\"tile-object\">\n                                <div class=\"name\">\n                                    Roles\n                                </div>\n                            </div>\n                        </div>\n                    </a>\n                </div>\n            </div>\n        </div>\n\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Settings/component/settings.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_settings_service__ = __webpack_require__("../../../../../src/plugins/Hardel/Settings/Services/settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/**
 * Created by hernan on 17/10/2017.
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



var SettingsComponent = (function () {
    function SettingsComponent(eService, router) {
        var _this = this;
        this.eService = eService;
        this.router = router;
        this.myRoot = '/backend/settings';
        this.isRoot = true;
        //trigger the event for the overview
        this.eService.oc$.subscribe(function (data) {
            _this.isRoot = data;
        });
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
    }
    SettingsComponent.prototype.ngOnInit = function () {
    };
    return SettingsComponent;
}());
SettingsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-settings',
        template: __webpack_require__("../../../../../src/plugins/Hardel/Settings/component/settings.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__Services_settings_service__["a" /* SettingsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__Services_settings_service__["a" /* SettingsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["d" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["d" /* Router */]) === "function" && _b || Object])
], SettingsComponent);

var _a, _b;
//# sourceMappingURL=settings.component.js.map

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Settings/settings.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsModule", function() { return SettingsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__settings_routing__ = __webpack_require__("../../../../../src/plugins/Hardel/Settings/settings.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_settings_service__ = __webpack_require__("../../../../../src/plugins/Hardel/Settings/Services/settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_backend_module_breadcrumbs_breadcrumbs_module__ = __webpack_require__("../../../../../src/app/backend-module/breadcrumbs/breadcrumbs.module.ts");
/**
 * Created by hernan on 17/10/2017.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var SettingsModule = (function () {
    function SettingsModule() {
    }
    return SettingsModule;
}());
SettingsModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_1__settings_routing__["b" /* routing */],
            __WEBPACK_IMPORTED_MODULE_6__app_backend_module_breadcrumbs_breadcrumbs_module__["a" /* BreadCrumbModule */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_2__Services_settings_service__["a" /* SettingsService */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_1__settings_routing__["a" /* routedComponents */]]
    })
], SettingsModule);

//# sourceMappingURL=settings.module.js.map

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Settings/settings.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return routing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routedComponents; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__component_settings_component__ = __webpack_require__("../../../../../src/plugins/Hardel/Settings/component/settings.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__component_Roles_roles_component__ = __webpack_require__("../../../../../src/plugins/Hardel/Settings/component/Roles/roles.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__component_Role_role_component__ = __webpack_require__("../../../../../src/plugins/Hardel/Settings/component/Role/role.component.ts");
/**
 * Created by hernan on 17/10/2017.
 */




var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__component_settings_component__["a" /* SettingsComponent */], data: { breadcrumb: 'Settings' }, children: [
            { path: 'roles', component: __WEBPACK_IMPORTED_MODULE_2__component_Roles_roles_component__["a" /* RolesComponent */], data: { breadcrumb: 'Roles' }, children: [
                    { path: ':id', component: __WEBPACK_IMPORTED_MODULE_3__component_Role_role_component__["a" /* RoleComponent */], data: { breadcrumb: 'Role' } }
                ] },
        ] }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["e" /* RouterModule */].forChild(routes);
var routedComponents = [__WEBPACK_IMPORTED_MODULE_1__component_settings_component__["a" /* SettingsComponent */], __WEBPACK_IMPORTED_MODULE_2__component_Roles_roles_component__["a" /* RolesComponent */], __WEBPACK_IMPORTED_MODULE_3__component_Role_role_component__["a" /* RoleComponent */]];
//# sourceMappingURL=settings.routing.js.map

/***/ })

});
//# sourceMappingURL=settings.module.chunk.js.map