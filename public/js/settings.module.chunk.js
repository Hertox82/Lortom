webpackJsonp(["settings.module"],{

/***/ "../../../../../src/plugins/Hardel/Settings/component/Roles/roles.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"tabbable-custom\">\n    <ul class=\"nav nav-tabs\">\n        <li class=\"active\">\n            <a href=\"#tab_1\" data-toggle=\"tab\"> Roles</a>\n        </li>\n        <li>\n            <a href=\"#tab_2\" data-toggle=\"tab\"> Permissions</a>\n        </li>\n    </ul>\n    <div class=\"tab-content\">\n        <div class=\"tab-pane active\" id=\"tab_1\">\n            <div class=\"box\">\n                <div class=\"box-header\">\n\n                </div>\n                <div class=\"box-body\">\n                    <div class=\"wrapper\">\n                        <div class=\"row\">\n                            <div class=\"col-md-10\">\n                                <div class=\"dataTables_length\">\n                                    <label>\n                                        Show\n                                        <select class=\"form-control input-sm\" name=\"example_length\">\n                                            <option value=\"10\">10</option>\n                                        </select>\n                                        entries\n                                    </label>\n                                </div>\n                            </div>\n                            <div class=\"col-md-2\">\n                                <div class=\"dataTables_filter\">\n                                    <label>\n                                        Search:\n                                        <input type=\"search\" class=\"form-control input-sm\">\n                                    </label>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-sm-12\">\n                                <table class=\"table table-bordered table-striped\">\n                                    <thead>\n                                    <tr>\n                                        <th style=\"width: 30px;\"></th>\n                                        <th>\n                                            <a>Nome</a>\n                                        </th>\n                                        <th style=\"width: 50px;\"></th>\n                                    </tr>\n                                    </thead>\n                                    <tbody>\n                                    <tr>\n                                        <td>\n                                            <input type=\"checkbox\">\n                                        </td>\n                                        <td>\n                                            Admin\n                                        </td>\n                                        <td>\n                                            <a><i class=\"fa fa-edit\" style=\"color:orange; font-size: 16px;\"></i></a>\n                                        </td>\n                                    </tr>\n                                    <tr>\n                                        <td>\n                                            <input type=\"checkbox\">\n                                        </td>\n                                        <td>\n                                            Web Operator\n                                        </td>\n                                        <td>\n                                            <a><i class=\"fa fa-edit\" style=\"color:orange; font-size: 16px;\"></i></a>\n                                        </td>\n                                    </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-sm-5\">\n                                <div class=\"dataTables_info\">Showing 1 to 10 of 57 entries</div>\n                            </div>\n                            <div class=\"col-sm-7\">\n                                <div class=\"dataTables_paginate\">\n                                    <ul class=\"pagination\">\n                                        <li class=\"page-item\">\n                                            <a class=\"page-link\" href=\"#\" aria-label=\"Previous\"><span aria-hidden=\"true\">«</span></a>\n                                        </li>\n                                        <li class=\"page-item active\">\n                                            <a class=\"page-link\" href=\"#\">1</a>\n                                        </li>\n                                        <li class=\"page-item\">\n                                            <a class=\"page-link\" href=\"#\">2</a>\n                                        </li>\n                                        <li class=\"page-item\">\n                                            <a class=\"page-link\" href=\"#\" aria-label=\"Next\"><span aria-hidden=\"true\">»</span></a>\n                                        </li>\n                                    </ul>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Settings/component/Roles/roles.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RolesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
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
    function RolesComponent() {
    }
    RolesComponent.prototype.ngOnInit = function () { };
    return RolesComponent;
}());
RolesComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-roles-component',
        template: __webpack_require__("../../../../../src/plugins/Hardel/Settings/component/Roles/roles.component.html"),
        styles: ['']
    }),
    __metadata("design:paramtypes", [])
], RolesComponent);

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
        imports: [__WEBPACK_IMPORTED_MODULE_1__settings_routing__["b" /* routing */]],
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
/**
 * Created by hernan on 17/10/2017.
 */



var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__component_settings_component__["a" /* SettingsComponent */], children: [
            { path: 'roles', component: __WEBPACK_IMPORTED_MODULE_2__component_Roles_roles_component__["a" /* RolesComponent */] }
        ] }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* RouterModule */].forChild(routes);
var routedComponents = [__WEBPACK_IMPORTED_MODULE_1__component_settings_component__["a" /* SettingsComponent */], __WEBPACK_IMPORTED_MODULE_2__component_Roles_roles_component__["a" /* RolesComponent */]];
//# sourceMappingURL=settings.routing.js.map

/***/ })

});
//# sourceMappingURL=settings.module.chunk.js.map