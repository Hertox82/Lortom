webpackJsonp(["plugin.module"],{

/***/ "./src/plugins/Hardel/Plugin/component/plugin.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content-box\">\n    <div class=\"content-header\">\n        <h1>Plugin</h1>\n        <ol class=\"breadcrumb\">\n            <li><a>Backend</a></li>\n            <li class=\"active\"><a>Plugin</a></li>\n        </ol>\n    </div>\n    <div class=\"content\">\n        Qui viene messo tutto il contenuto\n    </div>\n</div>"

/***/ }),

/***/ "./src/plugins/Hardel/Plugin/component/plugin.component.ts":
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
var PluginComponent = (function () {
    function PluginComponent() {
    }
    PluginComponent.prototype.ngOnInit = function () {
    };
    return PluginComponent;
}());
PluginComponent = __decorate([
    core_1.Component({
        selector: 'app-plugin',
        template: __webpack_require__("./src/plugins/Hardel/Plugin/component/plugin.component.html")
    }),
    __metadata("design:paramtypes", [])
], PluginComponent);
exports.PluginComponent = PluginComponent;
//# sourceMappingURL=plugin.component.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Plugin/plugin.module.ts":
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
var plugin_component_1 = __webpack_require__("./src/plugins/Hardel/Plugin/component/plugin.component.ts");
var plugin_routing_1 = __webpack_require__("./src/plugins/Hardel/Plugin/plugin.routing.ts");
var PluginModule = (function () {
    function PluginModule() {
    }
    return PluginModule;
}());
PluginModule = __decorate([
    core_1.NgModule({
        imports: [plugin_routing_1.routing],
        declarations: [plugin_component_1.PluginComponent]
    })
], PluginModule);
exports.PluginModule = PluginModule;
//# sourceMappingURL=plugin.module.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Plugin/plugin.routing.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by hernan on 17/10/2017.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var plugin_component_1 = __webpack_require__("./src/plugins/Hardel/Plugin/component/plugin.component.ts");
var routes = [
    { path: '', component: plugin_component_1.PluginComponent, data: { breadcrumb: 'Plugin' } }
];
exports.routing = router_1.RouterModule.forChild(routes);
//# sourceMappingURL=plugin.routing.js.map

/***/ })

});
//# sourceMappingURL=plugin.module.chunk.js.map