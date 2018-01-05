webpackJsonp([7],{

/***/ "./src/plugins/Hardel/Prova/component/prova.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content-box\">\n    <div class=\"content-header\">\n        <h1>Title</h1>\n        <ol class=\"breadcrumb\">\n            <li><a>Level 1</a></li>\n            <li class=\"active\"><a>Level 2 active</a></li>\n        </ol>\n    </div>\n    <div class=\"content\">\n        Here, the Content!\n    </div>\n</div>"

/***/ }),

/***/ "./src/plugins/Hardel/Prova/component/prova.component.ts":
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
var ProvaComponent = (function () {
    function ProvaComponent() {
    }
    ProvaComponent.prototype.ngOnInit = function () { };
    return ProvaComponent;
}());
ProvaComponent = __decorate([
    core_1.Component({
        selector: 'app-prova',
        template: __webpack_require__("./src/plugins/Hardel/Prova/component/prova.component.html"),
    }),
    __metadata("design:paramtypes", [])
], ProvaComponent);
exports.ProvaComponent = ProvaComponent;
//# sourceMappingURL=prova.component.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Prova/prova.module.ts":
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
var prova_component_1 = __webpack_require__("./src/plugins/Hardel/Prova/component/prova.component.ts");
var prova_routing_1 = __webpack_require__("./src/plugins/Hardel/Prova/prova.routing.ts");
var ProvaModule = (function () {
    function ProvaModule() {
    }
    return ProvaModule;
}());
ProvaModule = __decorate([
    core_1.NgModule({
        imports: [prova_routing_1.routing],
        declarations: [
            prova_component_1.ProvaComponent
        ],
    })
], ProvaModule);
exports.ProvaModule = ProvaModule;
//# sourceMappingURL=prova.module.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Prova/prova.routing.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var prova_component_1 = __webpack_require__("./src/plugins/Hardel/Prova/component/prova.component.ts");
var routes = [
    { path: '', component: prova_component_1.ProvaComponent }
];
exports.routing = router_1.RouterModule.forChild(routes);
//# sourceMappingURL=prova.routing.js.map

/***/ })

});
//# sourceMappingURL=7.chunk.js.map