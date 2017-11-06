webpackJsonp(["plugin.module"],{

/***/ "../../../../../src/plugins/Hardel/Plugin/component/plugin.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content-box\">\n    <div class=\"content-header\">\n        <h1>Plugin</h1>\n        <ol class=\"breadcrumb\">\n            <li><a>Backend</a></li>\n            <li class=\"active\"><a>Plugin</a></li>\n        </ol>\n    </div>\n    <div class=\"content\">\n        Qui viene messo tutto il contenuto\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Plugin/component/plugin.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PluginComponent; });
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

var PluginComponent = (function () {
    function PluginComponent() {
    }
    PluginComponent.prototype.ngOnInit = function () {
    };
    return PluginComponent;
}());
PluginComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-plugin',
        template: __webpack_require__("../../../../../src/plugins/Hardel/Plugin/component/plugin.component.html")
    }),
    __metadata("design:paramtypes", [])
], PluginComponent);

//# sourceMappingURL=plugin.component.js.map

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Plugin/plugin.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PluginModule", function() { return PluginModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__component_plugin_component__ = __webpack_require__("../../../../../src/plugins/Hardel/Plugin/component/plugin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__plugin_routing__ = __webpack_require__("../../../../../src/plugins/Hardel/Plugin/plugin.routing.ts");
/**
 * Created by hernan on 17/10/2017.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PluginModule = (function () {
    function PluginModule() {
    }
    return PluginModule;
}());
PluginModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_2__plugin_routing__["a" /* routing */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_1__component_plugin_component__["a" /* PluginComponent */]]
    })
], PluginModule);

//# sourceMappingURL=plugin.module.js.map

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Plugin/plugin.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__component_plugin_component__ = __webpack_require__("../../../../../src/plugins/Hardel/Plugin/component/plugin.component.ts");
/**
 * Created by hernan on 17/10/2017.
 */


var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__component_plugin_component__["a" /* PluginComponent */], data: { breadcrumb: 'Plugin' } }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["e" /* RouterModule */].forChild(routes);
//# sourceMappingURL=plugin.routing.js.map

/***/ })

});
//# sourceMappingURL=plugin.module.chunk.js.map