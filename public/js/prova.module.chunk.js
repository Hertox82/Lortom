webpackJsonp(["prova.module"],{

/***/ "../../../../../src/plugins/Hardel/Prova/component/prova.component.html":
/***/ (function(module, exports) {

module.exports = "<p> The component</p>"

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Prova/component/prova.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProvaComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ProvaComponent = (function () {
    function ProvaComponent() {
    }
    ProvaComponent.prototype.ngOnInit = function () { };
    return ProvaComponent;
}());
ProvaComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-prova',
        template: __webpack_require__("../../../../../src/plugins/Hardel/Prova/component/prova.component.html"),
    }),
    __metadata("design:paramtypes", [])
], ProvaComponent);

//# sourceMappingURL=prova.component.js.map

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Prova/prova.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProvaModule", function() { return ProvaModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__component_prova_component__ = __webpack_require__("../../../../../src/plugins/Hardel/Prova/component/prova.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__prova_routing__ = __webpack_require__("../../../../../src/plugins/Hardel/Prova/prova.routing.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ProvaModule = (function () {
    function ProvaModule() {
    }
    return ProvaModule;
}());
ProvaModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_2__prova_routing__["a" /* routing */]],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_1__component_prova_component__["a" /* ProvaComponent */]
        ],
    })
], ProvaModule);

//# sourceMappingURL=prova.module.js.map

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Prova/prova.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__component_prova_component__ = __webpack_require__("../../../../../src/plugins/Hardel/Prova/component/prova.component.ts");


var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__component_prova_component__["a" /* ProvaComponent */] }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* RouterModule */].forChild(routes);
//# sourceMappingURL=prova.routing.js.map

/***/ })

});
//# sourceMappingURL=prova.module.chunk.js.map