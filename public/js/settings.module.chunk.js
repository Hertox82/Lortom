webpackJsonp(["settings.module"],{

/***/ "../../../../../src/plugins/Hardel/Settings/component/settings.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content-box\">\n    <div class=\"content-header\">\n        <h1>Settings</h1>\n        <ol class=\"breadcrumb\">\n            <li><a>Backend</a></li>\n            <li class=\"active\"><a>Settings</a></li>\n        </ol>\n    </div>\n    <div class=\"content\">\n        Qui viene messo tutto il contenuto\n    </div>\n</div>"

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__component_settings_component__ = __webpack_require__("../../../../../src/plugins/Hardel/Settings/component/settings.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings_routing__ = __webpack_require__("../../../../../src/plugins/Hardel/Settings/settings.routing.ts");
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
        imports: [__WEBPACK_IMPORTED_MODULE_2__settings_routing__["a" /* routing */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_1__component_settings_component__["a" /* SettingsComponent */]]
    })
], SettingsModule);

//# sourceMappingURL=settings.module.js.map

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Settings/settings.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__component_settings_component__ = __webpack_require__("../../../../../src/plugins/Hardel/Settings/component/settings.component.ts");
/**
 * Created by hernan on 17/10/2017.
 */


var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__component_settings_component__["a" /* SettingsComponent */] }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forChild(routes);
//# sourceMappingURL=settings.routing.js.map

/***/ })

});
//# sourceMappingURL=settings.module.chunk.js.map