webpackJsonp([8],{

/***/ "./src/plugins/Hardel/Dashboard/component/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content-box\">\n    <div class=\"content-header\">\n        <h1>Dashboard</h1>\n        <ol class=\"breadcrumb\">\n            <li><a>Backend</a></li>\n            <li class=\"active\"><a>Dashboard</a></li>\n        </ol>\n    </div>\n    <div class=\"content\">\n        Qui viene messo tutto il contenuto\n    </div>\n</div>"

/***/ }),

/***/ "./src/plugins/Hardel/Dashboard/component/dashboard.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var DashBoardComponent = (function () {
    function DashBoardComponent() {
    }
    DashBoardComponent.prototype.ngOnInit = function () { };
    return DashBoardComponent;
}());
DashBoardComponent = __decorate([
    core_1.Component({
        selector: 'app-dashboard',
        template: __webpack_require__("./src/plugins/Hardel/Dashboard/component/dashboard.component.html"),
    }),
    __metadata("design:paramtypes", [])
], DashBoardComponent);
exports.DashBoardComponent = DashBoardComponent;
//# sourceMappingURL=dashboard.component.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Dashboard/dashboard.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by hernan on 17/10/2017.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var dashboard_component_1 = __webpack_require__("./src/plugins/Hardel/Dashboard/component/dashboard.component.ts");
var dashboard_routing_1 = __webpack_require__("./src/plugins/Hardel/Dashboard/dashboard.routing.ts");
var DashboardModule = (function () {
    function DashboardModule() {
    }
    return DashboardModule;
}());
DashboardModule = __decorate([
    core_1.NgModule({
        imports: [dashboard_routing_1.routing],
        declarations: [
            dashboard_component_1.DashBoardComponent
        ],
    })
], DashboardModule);
exports.DashboardModule = DashboardModule;
//# sourceMappingURL=dashboard.module.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Dashboard/dashboard.routing.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by hernan on 17/10/2017.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var dashboard_component_1 = __webpack_require__("./src/plugins/Hardel/Dashboard/component/dashboard.component.ts");
var routes = [
    { path: '', component: dashboard_component_1.DashBoardComponent, data: { breadcrumb: 'Dashboard' } }
];
exports.routing = router_1.RouterModule.forChild(routes);
//# sourceMappingURL=dashboard.routing.js.map

/***/ })

});
//# sourceMappingURL=8.chunk.js.map