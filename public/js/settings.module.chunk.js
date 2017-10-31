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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SettingsService = (function () {
    function SettingsService() {
    }
    SettingsService.prototype.setRoles = function (roles) {
        sessionStorage.setItem('roles', JSON.stringify(roles));
        this.listOfRoles = roles;
    };
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
    SettingsService.prototype.roleHasPermission = function (role, permission) {
        var response = false;
        role.permissions.forEach(function (p) {
            if (p.name === permission) {
                response = true;
            }
        });
        return response;
    };
    return SettingsService;
}());
SettingsService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])()
], SettingsService);

//# sourceMappingURL=settings.service.js.map

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Settings/component/Role/role.component.html":
/***/ (function(module, exports) {

module.exports = "\n<h3>Roles</h3>\n\n<form class=\"form\">\n    <div class=\"portlet\">\n        <div class=\"portlet-title\">\n            <div class=\"caption\">\n                <i class=\"fa fa-database\"></i>\n                <span>General Definitions</span>\n            </div>\n            <div class=\"actions\">\n                <button class=\"btn darkorange\" (click)=\"editMode()\">\n                    <i class=\"fa fa-edit\"></i>\n                    Edit\n                </button>\n            </div>\n        </div>\n        <div class=\"portlet-body\">\n            <div class=\"portlet-form-body\">\n                <div class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"nome\" class=\"col-md-2 control-label\">Nome</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"nome\" [ngModel] = \"role.name\" placeholder=\"Nome\" id=\"nome\" *ngIf=\"isEdit === false; else editName\" readonly>\n                                    <ng-template #editName>\n                                        <input type=\"text\" class=\"form-control\" name=\"nome\" placeholder=\"Nome\" id=\"nome\" [(ngModel)] = \"role.name\" >\n                                    </ng-template>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"portlet\">\n        <div class=\"portlet-title\">\n            <div class=\"caption\">\n                <i class=\"fa fa-list\"></i>\n                <span>Permissions</span>\n            </div>\n            <div class=\"actions\">\n                <button class=\"btn cyan\" data-toggle=\"modal\" data-target=\"#addModal\">\n                    <i class=\"fa fa-plus\"></i>\n                    Add\n                </button>\n            </div>\n        </div>\n        <div class=\"portlet-body\">\n            <div class=\"box\">\n                <div class=\"box-header\">\n\n                </div>\n                <div class=\"box-body\">\n                    <div class=\"wrapper\">\n                        <div class=\"row\">\n                            <div class=\"col-sm-12\">\n                                <table class=\"table table-bordered table-striped\">\n                                    <thead>\n                                    <tr>\n                                        <th style=\"width: 30px;\"></th>\n                                        <th>\n                                            <a>Nome</a>\n                                        </th>\n                                        <th style=\"width: 50px;\"></th>\n                                    </tr>\n                                    </thead>\n                                    <tbody>\n                                    <tr *ngFor=\"let permission of role.permissions\">\n                                        <td>\n                                            <input type=\"checkbox\">\n                                        </td>\n                                        <td>\n                                            {{permission.name}}\n                                        </td>\n                                        <td>\n                                            <a><i class=\"fa fa-window-close-o\" style=\"color:orange; font-size: 16px;\"></i></a>\n                                        </td>\n                                    </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-12\">\n            <button class=\"btn orange\" (click)=\"saveMode()\">Save</button>\n            <button class=\"btn red\" (click)=\"resetMode()\">Reset</button>\n        </div>\n    </div>\n    <div id=\"addModal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"addModal\"  aria-hidden=\"true\">\n        <div class=\"modal-dialog\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <div class=\"modal-title\">\n                        Searching For Permission \n                        <button class=\"close\" data-dismiss = \"modal\" aria-label=\"hidden\"><i class=\"fa fa-times\"></i></button>\n                    </div>\n                </div>\n                <div class=\"modal-body\">\n                    <div class=\"row\">\n                        <div class=\"col-md-12\">\n                            <div class=\"form-group flex-group\">\n                                <label class=\"col-md-4\">Nome Permesso</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"search\" class=\"form-control input-sm\">\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"modal-footer\">\n                    <div class=\"m-footer\">\n\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</form>"

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
        console.log('roma merda');
        this.isEdit = false;
        this.sub = this.router.params.subscribe(function (params) {
            _this.id = +params['id'];
            _this.role = _this.sService.getRoleByProperty('id', _this.id);
        });
    }
    RoleComponent.prototype.ngOnInit = function () { };
    RoleComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    RoleComponent.prototype.editMode = function () { };
    RoleComponent.prototype.saveMode = function () { };
    RoleComponent.prototype.resetMode = function () { };
    RoleComponent.prototype.addPermissions = function () { };
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

module.exports = "<div class=\"tabbable-custom\">\n    <ul class=\"nav nav-tabs\">\n        <li class=\"active\">\n            <a href=\"#tab_1\" data-toggle=\"tab\"> Roles</a>\n        </li>\n        <li>\n            <a href=\"#tab_2\" data-toggle=\"tab\"> Permissions</a>\n        </li>\n    </ul>\n    <div class=\"tab-content\">\n        <div class=\"tab-pane active\" id=\"tab_1\">\n            <div class=\"box\">\n                <div class=\"box-header\">\n\n                </div>\n                <div class=\"box-body\">\n                    <div class=\"wrapper\">\n                        <div class=\"row\">\n                            <div class=\"col-md-10\">\n                                <div class=\"dataTables_length\">\n                                    <label>\n                                        Show\n                                        <select class=\"form-control input-sm\" name=\"example_length\">\n                                            <option value=\"10\">10</option>\n                                        </select>\n                                        entries\n                                    </label>\n                                </div>\n                            </div>\n                            <div class=\"col-md-2\">\n                                <div class=\"dataTables_filter\">\n                                    <label>\n                                        Search:\n                                        <input type=\"search\" class=\"form-control input-sm\">\n                                    </label>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-sm-12\">\n                                <table class=\"table table-bordered table-striped\">\n                                    <thead>\n                                    <tr>\n                                        <th style=\"width: 30px;\"></th>\n                                        <th>\n                                            <a>Nome</a>\n                                        </th>\n                                        <th style=\"width: 50px;\"></th>\n                                    </tr>\n                                    </thead>\n                                    <tbody>\n                                        <tr *ngFor=\"let role of listaRole\">\n                                            <td>\n                                                <input type=\"checkbox\">\n                                            </td>\n                                            <td>\n                                                {{role.name}}\n                                            </td>\n                                            <td>\n                                                <a [routerLink] = \"['/backend/settings/role',role.id]\"><i class=\"fa fa-edit\" style=\"color:orange; font-size: 16px;\"></i></a>\n                                            </td>\n                                        </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-sm-5\">\n                                <div class=\"dataTables_info\">Showing 1 to 10 of 57 entries</div>\n                            </div>\n                            <div class=\"col-sm-7\">\n                                <div class=\"dataTables_paginate\">\n                                    <ul class=\"pagination\">\n                                        <li class=\"page-item\">\n                                            <a class=\"page-link\" href=\"#\" aria-label=\"Previous\"><span aria-hidden=\"true\">«</span></a>\n                                        </li>\n                                        <li class=\"page-item active\">\n                                            <a class=\"page-link\" href=\"#\">1</a>\n                                        </li>\n                                        <li class=\"page-item\">\n                                            <a class=\"page-link\" href=\"#\">2</a>\n                                        </li>\n                                        <li class=\"page-item\">\n                                            <a class=\"page-link\" href=\"#\" aria-label=\"Next\"><span aria-hidden=\"true\">»</span></a>\n                                        </li>\n                                    </ul>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Settings/component/Roles/roles.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RolesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_settings_service__ = __webpack_require__("../../../../../src/plugins/Hardel/Settings/Services/settings.service.ts");
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
    function RolesComponent(tService) {
        this.tService = tService;
        this.listaRole = [
            { id: 1, name: 'Admin', permissions: [
                    { id: 1, name: 'Hardel.Settings' },
                    { id: 2, name: 'Hardel.Dashboard' },
                    { id: 3, name: 'Hardel.Settings.Roles' },
                    { id: 4, name: 'Hardel.Settings.Permissions' },
                    { id: 5, name: 'Hardel.Plugin' }
                ] },
            { id: 2, name: 'Web Operator', permissions: [] }
        ];
        this.tService.setRoles(this.listaRole);
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
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__Services_settings_service__["a" /* SettingsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__Services_settings_service__["a" /* SettingsService */]) === "function" && _a || Object])
], RolesComponent);

var _a;
//# sourceMappingURL=roles.component.js.map

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Settings/component/settings.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content-box\">\n    <div class=\"content-header\">\n        <h1>Settings</h1>\n        <ol class=\"breadcrumb\">\n            <li><a>Backend</a></li>\n            <li class=\"active\"><a>Settings</a></li>\n        </ol>\n    </div>\n    <div class=\"content\">\n        <router-outlet></router-outlet>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Settings/component/settings.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
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
    function SettingsComponent() {
    }
    SettingsComponent.prototype.ngOnInit = function () { };
    return SettingsComponent;
}());
SettingsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-settings',
        template: __webpack_require__("../../../../../src/plugins/Hardel/Settings/component/settings.component.html")
    }),
    __metadata("design:paramtypes", [])
], SettingsComponent);

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
            __WEBPACK_IMPORTED_MODULE_1__settings_routing__["b" /* routing */]
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
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__component_settings_component__["a" /* SettingsComponent */], children: [
            { path: 'roles', component: __WEBPACK_IMPORTED_MODULE_2__component_Roles_roles_component__["a" /* RolesComponent */] },
            { path: 'role/:id', component: __WEBPACK_IMPORTED_MODULE_3__component_Role_role_component__["a" /* RoleComponent */] }
        ] }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["d" /* RouterModule */].forChild(routes);
var routedComponents = [__WEBPACK_IMPORTED_MODULE_1__component_settings_component__["a" /* SettingsComponent */], __WEBPACK_IMPORTED_MODULE_2__component_Roles_roles_component__["a" /* RolesComponent */], __WEBPACK_IMPORTED_MODULE_3__component_Role_role_component__["a" /* RoleComponent */]];
//# sourceMappingURL=settings.routing.js.map

/***/ })

});
//# sourceMappingURL=settings.module.chunk.js.map