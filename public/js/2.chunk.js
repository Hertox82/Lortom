webpackJsonp([2],{

/***/ "./src/model/list.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var pagination_service_1 = __webpack_require__("./src/services/pagination.service.ts");
var ListComponent = (function () {
    function ListComponent() {
        //This is to manage the Pagination
        this.pagServ = new pagination_service_1.PaginationService();
        this.actualPage = 1;
        this.perPage = 3;
    }
    ListComponent.prototype.updateListaShow = function () {
        this.listToShow = this.pagServ.getShowList({
            entry: this.perPage,
            list: this.listOfData,
            pageToShow: this.actualPage
        });
    };
    ListComponent.prototype.onPrev = function () {
        this.actualPage--;
        this.updateListaShow();
    };
    ListComponent.prototype.onNext = function (ev) {
        this.actualPage++;
        this.updateListaShow();
    };
    ListComponent.prototype.onPage = function (act) {
        this.actualPage = act;
        this.updateListaShow();
    };
    ListComponent.prototype.onPerPage = function (n) {
        this.perPage = n;
        this.updateListaShow();
    };
    return ListComponent;
}());
exports.ListComponent = ListComponent;
//# sourceMappingURL=list.component.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Plugin/Service/plugin.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by hernan on 13/12/2017.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var master_service_1 = __webpack_require__("./src/services/master.service.ts");
var http_1 = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
var Subject_1 = __webpack_require__("./node_modules/rxjs/Subject.js");
var PluginService = (function (_super) {
    __extends(PluginService, _super);
    function PluginService(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this._updatePlugins = new Subject_1.Subject();
        _this.updatePlugins$ = _this._updatePlugins.asObservable();
        // write the api route for setting
        var urls = [
            { namePath: 'getPlugins', path: 'plugins' },
            { namePath: 'installPlugin', path: 'plugin' },
        ];
        //Add the Api to the ApiManager
        _this.apiManager.addListUrlApi(urls);
        return _this;
    }
    /* Section call to API*/
    /**
     * This function Call API in order to get List of Plugin
     * @returns {Observable<R>}
     */
    PluginService.prototype.getPluginsFrom = function () {
        return this.http.get(this.apiManager.getPathByName('getPlugins'))
            .map(function (response) {
            return response.json().plugins;
        });
    };
    /**
     * This Function call API in order to Delete a list of Plugins
     * @param plugins
     * @returns {Observable<R>}
     */
    PluginService.prototype.deletePlugins = function (plugins) {
        return this.http.put(this.apiManager.getPathByName('getPlugins'), plugins, this.getOptions())
            .map(function (response) {
            return response.json().plugins;
        });
    };
    /**
     * This function call API in order to Install the Plugin
     * @param plugin
     * @returns {Observable<R>}
     */
    PluginService.prototype.installPlugin = function (plugin) {
        return this.http.post(this.apiManager.getPathByName('installPlugin'), plugin, this.getOptions())
            .map(function (response) {
            return response.json().plugin;
        });
    };
    /**
     * This function call API in order to Update the Plugin
     * @param plugin
     * @returns {Observable<R>}
     */
    PluginService.prototype.updatePlugin = function (plugin) {
        return this.http.put(this.apiManager.getPathByName('installPlugin'), plugin, this.getOptions())
            .map(function (response) {
            return response.json().plugin;
        });
    };
    /* End Section call to API*/
    /**
     * This function set plugins and store it into a Session
     * @param plugins
     */
    PluginService.prototype.setPlugins = function (plugins) {
        this.setItem('plugins', plugins);
        this.listOfPlugins = plugins;
    };
    /**
     * This function get listOfPlugins
     * @returns {any}
     */
    PluginService.prototype.getPlugins = function () {
        return this.getItem('plugins', 'listOfPlugins');
    };
    /**
     * this function delete plugins from cache
     */
    PluginService.prototype.deletePluginFromCache = function () {
        this.deleteItem('plugins', 'listOfPlugins');
    };
    /**
     * this function return if Plugins Exists
     * @returns {boolean}
     */
    PluginService.prototype.checkPluginsExist = function () {
        return this.checkItemExist('plugins');
    };
    /* Fire Event*/
    /**
     * this function fire event
     */
    PluginService.prototype.updateListOfPlugins = function () {
        this._updatePlugins.next();
    };
    return PluginService;
}(master_service_1.MasterService));
PluginService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], PluginService);
exports.PluginService = PluginService;
var _a;
//# sourceMappingURL=plugin.service.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Plugin/component/Plugins/listplugin.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"tabbable-custom\" *ngIf=\"isRoot === true\">\n    <ul class=\"nav nav-tabs\">\n        <li class=\"active\">\n            <a href=\"#tab_1\" data-toggle=\"tab\"> List Plugin</a>\n        </li>\n        <li>\n            <a [routerLink]=\"['/backend/website/menu']\" data-toggle=\"tab\"> Template</a>\n        </li>\n    </ul>\n    <div class=\"tab-content\">\n        <div class=\"tab-pane active\" id=\"tab_1\">\n            <div class=\"box\">\n                <div class=\"box-header\">\n\n                </div>\n                <div class=\"box-body\">\n                    <div class=\"wrapper\">\n                        <div class=\"row\">\n                            <div class=\"col-md-8\">\n                                <lt-entry-pagination\n                                        [entry]=\"'50-5'\"\n                                        (onEntry)=\"onPerPage($event)\"\n                                >\n                                </lt-entry-pagination>\n                            </div>\n                            <div class=\"col-md-4\">\n                                <div class=\"dataTables_filter\">\n                                    <label>\n                                        Search:\n                                        <input type=\"search\" class=\"form-control input-sm\">\n                                    </label>\n                                    <a class=\"btn btn-primary\" [routerLink] = \"['/backend/plugin/plugins/install']\"><i class=\"fa fa-download\"></i> Install</a>\n                                    <a class=\"btn btn-danger\" (click)=\"deletePlugins()\"><i class=\"fa fa-times\"></i> Delete</a>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-sm-12\">\n                                <table class=\"table table-bordered table-striped\">\n                                    <thead>\n                                    <tr>\n                                        <th style=\"width: 30px;\"></th>\n                                        <th>\n                                            <a>Vendor</a>\n                                        </th>\n                                        <th>\n                                            <a>Name</a>\n                                        </th>\n                                        <th>\n                                            <a>Version</a>\n                                        </th>\n                                        <th style=\"width: 50px;\"></th>\n                                    </tr>\n                                    </thead>\n                                    <tbody>\n                                    <tr *ngFor=\"let plugin of listToShow\">\n                                        <td>\n                                            <input type=\"checkbox\" (change)=\"eventChange($event,plugin)\" [(ngModel)] = \"plugin.check\">\n                                        </td>\n                                        <td>\n                                            {{plugin.vendor}}\n                                        </td>\n                                        <td>\n                                            {{plugin.name}}\n                                        </td>\n                                        <td>\n                                            {{plugin.version}}\n                                        </td>\n                                        <td>\n                                            <a [routerLink] = \"['/backend/plugin/plugins/update',plugin.vendor]\" title=\"Update\"><i class=\"fa fa-refresh\" style=\"color:orange; font-size: 16px;\"></i></a>\n                                        </td>\n                                    </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                        <lt-pagination\n                                [pagesToShow]=\"3\"\n                                [perPage]=\"perPage\"\n                                [count]=\"listOfPlugins.length\"\n                                [loading]=\"false\"\n                                [page]=\"actualPage\"\n                                (goNext)=\"onNext($event)\"\n                                (goPage)=\"onPage($event)\"\n                                (goPrev)=\"onPrev()\"\n                        ></lt-pagination>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/plugins/Hardel/Plugin/component/Plugins/listplugin.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var plugin_service_1 = __webpack_require__("./src/plugins/Hardel/Plugin/Service/plugin.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var list_component_1 = __webpack_require__("./src/model/list.component.ts");
var ListPluginComponent = (function (_super) {
    __extends(ListPluginComponent, _super);
    function ListPluginComponent(plsSer, router) {
        var _this = _super.call(this) || this;
        _this.plsSer = plsSer;
        _this.router = router;
        _this.myRoot = '/backend/plugin/plugins';
        _this.isRoot = false;
        if (!_this.plsSer.hasPermissions("Hardel.Plugin.Plugins")) {
            _this.router.navigate(['/backend/dashboard']);
        }
        _this.listOfPlugins = [];
        _this.listOfPluginsToDelete = [];
        _this.router.events.subscribe(function (val) {
            if (val instanceof router_1.NavigationEnd) {
                if (_this.myRoot === val.url) {
                    _this.isRoot = true;
                }
                else {
                    _this.isRoot = false;
                }
            }
        });
        _this.retrieveListOfPlugins();
        _this.plsSer.updatePlugins$.subscribe(function () {
            _this.retrieveListOfPlugins();
        });
        return _this;
    }
    ListPluginComponent.prototype.ngOnInit = function () { };
    /**
     * This function call the Service in order to get the list Of Plugins
     */
    ListPluginComponent.prototype.retrieveListOfPlugins = function () {
        var _this = this;
        if (!this.plsSer.checkPluginsExist()) {
            this.plsSer.getPluginsFrom().subscribe(function (plugins) {
                _this.listOfPlugins = plugins;
                _this.listOfData = _this.listOfPlugins;
                _this.listOfPlugins.forEach(function (plugin) {
                    plugin.check = false;
                });
                _this.plsSer.setPlugins(_this.listOfPlugins);
                _this.updateListaShow();
            });
        }
        else {
            this.listOfPlugins = this.plsSer.getPlugins();
            this.listOfData = this.listOfPlugins;
            this.listOfPlugins.forEach(function (item) {
                if (!item.hasOwnProperty('check')) {
                    item.check = false;
                }
            });
            this.updateListaShow();
        }
    };
    /**
     * function to push or splice item into Deleted List of Roles
     * @param ev
     * @param data
     */
    ListPluginComponent.prototype.eventChange = function (ev, data) {
        if (ev.target.checked) {
            this.listOfPluginsToDelete.push(data);
        }
        else {
            var index = this.listOfPluginsToDelete.indexOf(data);
            if (index > -1) {
                this.listOfPluginsToDelete.splice(index, 1);
            }
        }
    };
    ListPluginComponent.prototype.deletePlugins = function () {
        var _this = this;
        if (this.listOfPluginsToDelete.length > 0) {
            if (confirm('Do you really want delete this Roles?')) {
                this.plsSer.deletePlugins(this.listOfPluginsToDelete).subscribe(function (data) {
                    _this.listOfPluginsToDelete = [];
                    _this.listOfPlugins = data;
                    _this.listOfData = _this.listOfPlugins;
                    _this.plsSer.setPlugins(_this.listOfPlugins);
                    _this.updateListaShow();
                });
            }
        }
    };
    return ListPluginComponent;
}(list_component_1.ListComponent));
ListPluginComponent = __decorate([
    core_1.Component({
        selector: 'pl-list',
        template: __webpack_require__("./src/plugins/Hardel/Plugin/component/Plugins/listplugin.component.html"),
        styles: ['']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof plugin_service_1.PluginService !== "undefined" && plugin_service_1.PluginService) === "function" && _a || Object, typeof (_b = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _b || Object])
], ListPluginComponent);
exports.ListPluginComponent = ListPluginComponent;
var _a, _b;
//# sourceMappingURL=listplugin.component.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Plugin/component/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by hernan on 13/12/2017.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var plugin_component_1 = __webpack_require__("./src/plugins/Hardel/Plugin/component/plugin.component.ts");
exports.PluginComponent = plugin_component_1.PluginComponent;
var listplugin_component_1 = __webpack_require__("./src/plugins/Hardel/Plugin/component/Plugins/listplugin.component.ts");
exports.ListPluginComponent = listplugin_component_1.ListPluginComponent;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Plugin/component/plugin.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content-box\">\n    <div class=\"content-header\">\n        <h1>Plugin</h1>\n        <breadcrumbs></breadcrumbs>\n    </div>\n    <div class=\"content\">\n        <router-outlet></router-outlet>\n        <div class=\"portlet\" *ngIf=\"isRoot === true\">\n            <div class=\"portlet-title\">\n                <div class=\"caption\">\n                    <i class=\"fa fa-database\"></i>\n                    <span>Overviews</span>\n                </div>\n                <div class=\"actions\">\n                </div>\n            </div>\n            <div class=\"portlet-body\">\n                <div class=\"tiles\">\n                    <a [routerLink]=\"['/backend/plugin/plugins']\">\n                        <div class=\"tile double bg-cyan\">\n                            <div class=\"tile-body\">\n                                <i class=\"fa fa-plug fa-6\"></i>\n                            </div>\n                            <div class=\"tile-object\">\n                                <div class=\"name\">\n                                    Plugins\n                                </div>\n                            </div>\n                        </div>\n                    </a>\n                    <a [routerLink]=\"['/backend/plugin/template']\">\n                        <div class=\"tile bg-orange\">\n                            <div class=\"tile-body\">\n                                <i class=\"fa fa-university fa-6\"></i>\n                            </div>\n                            <div class=\"tile-object\">\n                                <div class=\"name\">\n                                    Template\n                                </div>\n                            </div>\n                        </div>\n                    </a>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

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
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var PluginComponent = (function () {
    function PluginComponent(pr) {
        var _this = this;
        this.pr = pr;
        this.myRoot = '/backend/plugin';
        this.isRoot = true;
        this.pr.events.subscribe(function (val) {
            if (val instanceof router_1.NavigationEnd) {
                if (_this.myRoot === val.url) {
                    _this.isRoot = true;
                }
                else {
                    _this.isRoot = false;
                }
            }
        });
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
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object])
], PluginComponent);
exports.PluginComponent = PluginComponent;
var _a;
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
var plugin_routing_1 = __webpack_require__("./src/plugins/Hardel/Plugin/plugin.routing.ts");
var common_1 = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
var breadcrumbs_1 = __webpack_require__("./src/app/backend-module/breadcrumbs/index.ts");
var uielement_module_1 = __webpack_require__("./src/app/backend-module/UIElement/uielement.module.ts");
var plugin_service_1 = __webpack_require__("./src/plugins/Hardel/Plugin/Service/plugin.service.ts");
var PluginModule = (function () {
    function PluginModule() {
    }
    return PluginModule;
}());
PluginModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            plugin_routing_1.routing,
            breadcrumbs_1.BreadCrumbModule,
            uielement_module_1.UIElementModule
        ],
        providers: [plugin_service_1.PluginService],
        declarations: [plugin_routing_1.pluginComponent]
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
var PL = __webpack_require__("./src/plugins/Hardel/Plugin/component/index.ts");
var routes = [
    { path: '', component: PL.PluginComponent, data: { breadcrumb: 'Plugins' }, children: [
            { path: 'plugins', component: PL.ListPluginComponent, data: { breadcrumb: 'List' } }
        ] }
];
exports.routing = router_1.RouterModule.forChild(routes);
exports.pluginComponent = [
    PL.PluginComponent,
    PL.ListPluginComponent
];
//# sourceMappingURL=plugin.routing.js.map

/***/ })

});
//# sourceMappingURL=2.chunk.js.map