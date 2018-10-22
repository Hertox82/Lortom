webpackJsonp(["plugin.module"],{

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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var master_service_1 = __webpack_require__("./src/services/master.service.ts");
var http_1 = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var Subject_1 = __webpack_require__("./node_modules/rxjs/_esm5/Subject.js");
var PluginService = (function (_super) {
    __extends(PluginService, _super);
    function PluginService(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this._updatePlugins = new Subject_1.Subject();
        _this._updateTemplate = new Subject_1.Subject();
        _this.updatePlugins$ = _this._updatePlugins.asObservable();
        _this.updateTemplate$ = _this._updateTemplate.asObservable();
        // write the api route for setting
        var urls = [
            { namePath: 'getPlugins', path: 'plugins' },
            { namePath: 'installPlugin', path: 'plugin' },
            { namePath: 'packPlugin', path: 'plugin/pack' },
            { namePath: 'delPack', path: 'plugin/delete' },
            { namePath: 'getLatestPlugin', path: 'plugins/latest' },
            { namePath: 'getLatestTemplate', path: 'templates/latest' },
            { namePath: 'getTemplate', path: 'templates' },
            { namePath: 'packTemplate', path: 'template/pack' },
            { namePath: 'unPackTemp', path: 'template/delpack' },
            { namePath: 'instTemp', path: 'template' }
        ];
        //Add the Api to the ApiManager
        _this.apiManager.addListUrlApi(urls);
        return _this;
    }
    /* Section call to API */
    /**
     * This function Call API in order to get List of Plugin
     * @returns {Observable<R>}
     */
    PluginService.prototype.getPluginsFrom = function () {
        return this.http.get(this.apiManager.getPathByName('getPlugins'))
            .map(function (response) {
            return response.plugins;
        });
    };
    PluginService.prototype.getTemplateFrom = function () {
        return this.http.get(this.apiManager.getPathByName('getTemplate'))
            .map(function (response) {
            return response;
        });
    };
    PluginService.prototype.getLatestPlugin = function () {
        return this.http.get(this.apiManager.getPathByName('getLatestPlugin'))
            .map(function (response) {
            return response.plugins;
        });
    };
    PluginService.prototype.getLatestTemplate = function () {
        return this.http.get(this.apiManager.getPathByName('getLatestTemplate'))
            .map(function (response) {
            return response.template;
        });
    };
    /**
     * This Function call API in order to Delete a list of Plugins
     * @param plugins
     * @returns {Observable<R>}
     */
    PluginService.prototype.uninstallPlugins = function (plugins) {
        return this.http.put(this.apiManager.getPathByName('getPlugins'), plugins, this.getOptions())
            .map(function (response) {
            return response.message;
        });
    };
    PluginService.prototype.uninstallTemplates = function (templates) {
        return this.http.put(this.apiManager.getPathByName('instTemp'), templates, this.getOptions())
            .map(function (response) {
            return response.message;
        });
    };
    PluginService.prototype.uninstallTemplate = function (template) {
        return this.http.put(this.apiManager.getPathByName('instTemp'), template, this.getOptions())
            .map(function (response) {
            return response.message;
        });
    };
    PluginService.prototype.deletePackPlugin = function (plugin) {
        return this.http.post(this.apiManager.getPathByName('delPack'), plugin, this.getOptions())
            .map(function (response) {
            return response.plugins;
        });
    };
    PluginService.prototype.deletePackTemplate = function (template) {
        return this.http.post(this.apiManager.getPathByName('unPackTemp'), template, this.getOptions())
            .map(function (response) {
            return response.message;
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
            return response.message;
        });
    };
    PluginService.prototype.installTemplate = function (template) {
        return this.http.post(this.apiManager.getPathByName('instTemp'), template, this.getOptions())
            .map(function (response) {
            return response.message;
        });
    };
    PluginService.prototype.activateTemplate = function (template) {
        return this.http.post(this.apiManager.getPathByName('actiTemp'), template, this.getOptions())
            .map(function (response) {
            return response.message;
        });
    };
    PluginService.prototype.deactivateTemplate = function (template) {
        return this.http.post(this.apiManager.getPathByName('deactiTemp'), template, this.getOptions())
            .map(function (response) {
            return response.message;
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
            return response.messsage;
        });
    };
    PluginService.prototype.updateTemplate = function (template) {
        return this.http.put(this.apiManager.getPathByName('installTemplate'), template, this.getOptions())
            .map(function (response) {
            return response.message;
        });
    };
    PluginService.prototype.packPlugin = function (plugin) {
        return this.http.post(this.apiManager.getPathByName('packPlugin'), plugin, this.getOptions())
            .map(function (response) {
            return response.plugins;
        });
    };
    PluginService.prototype.packTemplate = function (template) {
        return this.http.post(this.apiManager.getPathByName('packTemplate'), template, this.getOptions())
            .map(function (response) {
            return response.message;
        });
    };
    /* End Section call to API*/
    /**
     * This function set plugins and store it into a Session
     * @param plugins
     */
    PluginService.prototype.setPlugins = function (plugins) {
        var data = plugins;
        this.setItem('plugins', data);
        this.listOfPlugins = data;
    };
    PluginService.prototype.setTemplate = function (template) {
        var data = template;
        this.setItem('template', data);
        this.listOfTemplate = data;
    };
    PluginService.prototype.setTemplates = function (templates) {
        var data = templates;
        this.setItem('templates', data);
        this.listOfTemplates = data;
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
    PluginService.prototype.updateListOfTemplate = function () {
        this._updateTemplate.next();
    };
    PluginService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], PluginService);
    return PluginService;
}(master_service_1.MasterService));
exports.PluginService = PluginService;


/***/ }),

/***/ "./src/plugins/Hardel/Plugin/component/InstallPlugin/install-plugin.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container deck\">\n    <div class=\"row\">\n        <div class=\"col-md-6\">\n            <lt-entry-pagination\n                    [entry]=\"'50-5'\"\n                    (onEntry)=\"onPerPage($event)\"\n            >\n            </lt-entry-pagination>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div *ngFor=\"let pl of listToShow\" class=\"col-lg-3\">\n            <div class=\"card-lt\">\n                <h4>{{pl.vendor}} - {{pl.name}}</h4>\n                <p>version: {{pl.version}}</p>\n                <a *ngIf=\"pl?.toUpdate === true; else otherTmp\" class=\"btn btn-success btn-lt\" style=\"cursor:pointer;\" (click)=\"updatePlugin(pl)\"><i class=\"fa fa-refresh\"></i> Update Plugin</a>\n                <ng-template #otherTmp>\n                    <a class=\"btn btn-primary btn-lt\" style=\"cursor:pointer;\" (click)=\"downloadPlugin(pl,progressModal)\"><i class=\"fa fa-download\"></i> Installa Plugin</a>\n                </ng-template>\n            </div>\n        </div>\n    </div>\n</div>\n<lt-pagination\n        [pagesToShow]=\"3\"\n        [perPage]=\"perPage\"\n        [count]=\"listOfLatestPlugin.length\"\n        [loading]=\"false\"\n        [page]=\"actualPage\"\n        (goNext)=\"onNext($event)\"\n        (goPage)=\"onPage($event)\"\n        (goPrev)=\"onPrev()\"\n>\n</lt-pagination>\n\n<ng-template #progressModal>\n<!-- Modal -->\n    <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"exampleModalLabel\">Modal title</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n            <span aria-hidden=\"true\">&times;</span>\n        </button>\n    </div>\n    <div class=\"modal-body\">\n        <div class=\"progress\">\n            <div class=\"progress-bar progress-bar-striped\" role=\"progressbar\" [style.width]=\"widthStyle\" aria-valuenow=\"10\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n        </div>\n    </div>\n</ng-template>"

/***/ }),

/***/ "./src/plugins/Hardel/Plugin/component/InstallPlugin/install-plugin.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by hernan on 14/12/2017.
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var plugin_service_1 = __webpack_require__("./src/plugins/Hardel/Plugin/Service/plugin.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var list_component_1 = __webpack_require__("./src/model/list.component.ts");
var ng_bootstrap_1 = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
var InstallPluginComponent = (function (_super) {
    __extends(InstallPluginComponent, _super);
    function InstallPluginComponent(inPl, router, serviceModal) {
        var _this = _super.call(this) || this;
        _this.inPl = inPl;
        _this.router = router;
        _this.serviceModal = serviceModal;
        _this.listOfLatestPlugin = [];
        _this.retrieveListOfLatestPlugin();
        return _this;
    }
    InstallPluginComponent.prototype.ngOnInit = function () { };
    InstallPluginComponent.prototype.retrieveListOfLatestPlugin = function () {
        var _this = this;
        this.inPl.getLatestPlugin().subscribe(function (data) {
            _this.listOfLatestPlugin = data;
            _this.listOfData = _this.listOfLatestPlugin;
            _this.updateListaShow();
        });
    };
    InstallPluginComponent.prototype.downloadPlugin = function (plugin, modal) {
        var _this = this;
        var mod = this.serviceModal.open(modal);
        this.widthStyle = '20%';
        this.inPl.installPlugin(plugin).subscribe(function (message) {
            if (message) {
                _this.widthStyle = '40%';
                _this.retrieveListOfLatestPlugin();
                _this.widthStyle = '80%';
                _this.inPl.getPluginsFrom()
                    .subscribe(function (data) {
                    _this.widthStyle = '99%';
                    _this.inPl.setPlugins(data);
                    mod.close();
                    _this.widthStyle = '10%';
                });
            }
        });
    };
    InstallPluginComponent.prototype.updatePlugin = function (plugin, modal) {
        var _this = this;
        //this is to update plugin
        var mod = this.serviceModal.open(modal);
        this.widthStyle = '20%';
        this.inPl.updatePlugin(plugin).subscribe(function (message) {
            if (message) {
                _this.widthStyle = '40%';
                _this.retrieveListOfLatestPlugin();
                _this.widthStyle = '80%';
                _this.inPl.getPluginsFrom()
                    .subscribe(function (data) {
                    _this.widthStyle = '99%';
                    _this.inPl.setPlugins(data);
                    mod.close();
                    _this.widthStyle = '10%';
                });
            }
        });
    };
    InstallPluginComponent = __decorate([
        core_1.Component({
            selector: 'pl-install',
            template: __webpack_require__("./src/plugins/Hardel/Plugin/component/InstallPlugin/install-plugin.component.html"),
            styles: ['']
        }),
        __metadata("design:paramtypes", [plugin_service_1.PluginService, router_1.Router, ng_bootstrap_1.NgbModal])
    ], InstallPluginComponent);
    return InstallPluginComponent;
}(list_component_1.ListComponent));
exports.InstallPluginComponent = InstallPluginComponent;


/***/ }),

/***/ "./src/plugins/Hardel/Plugin/component/InstallTemplate/install-template.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container deck\">\n    <div class=\"row\">\n        <div class=\"col-md-6\">\n            <lt-entry-pagination\n                    [entry]=\"'50-5'\"\n                    (onEntry)=\"onPerPage($event)\"\n            >\n            </lt-entry-pagination>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div *ngFor=\"let pl of listToShow\" class=\"col-lg-3\">\n            <div class=\"card-lt\">\n                <h4>{{pl.vendor}} - {{pl.name}}</h4>\n                <p>version: {{pl.version}}</p>\n                <a *ngIf=\"pl?.toUpdate === true; else otherTmp\" class=\"btn btn-success btn-lt\" style=\"cursor:pointer;\" (click)=\"updateTemplate(pl)\"><i class=\"fa fa-refresh\"></i> Update Template</a>\n                <ng-template #otherTmp>\n                    <a class=\"btn btn-primary btn-lt\" style=\"cursor:pointer;\" (click)=\"downloadTemplate(pl,progressModal)\"><i class=\"fa fa-download\"></i> Installa Template</a>\n                </ng-template>\n            </div>\n        </div>\n    </div>\n</div>\n<lt-pagination\n        [pagesToShow]=\"3\"\n        [perPage]=\"perPage\"\n        [count]=\"listOfLatestTemplate.length\"\n        [loading]=\"false\"\n        [page]=\"actualPage\"\n        (goNext)=\"onNext($event)\"\n        (goPage)=\"onPage($event)\"\n        (goPrev)=\"onPrev()\"\n>\n</lt-pagination>\n\n<ng-template #progressModal>\n    <!-- Modal -->\n    <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"exampleModalLabel\">Modal title</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n            <span aria-hidden=\"true\">&times;</span>\n        </button>\n    </div>\n    <div class=\"modal-body\">\n        <div class=\"progress\">\n            <div class=\"progress-bar progress-bar-striped\" role=\"progressbar\" [style.width]=\"widthStyle\" aria-valuenow=\"10\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n        </div>\n    </div>\n</ng-template>"

/***/ }),

/***/ "./src/plugins/Hardel/Plugin/component/InstallTemplate/install-template.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by hernan on 04/06/2018.
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var list_component_1 = __webpack_require__("./src/model/list.component.ts");
var plugin_service_1 = __webpack_require__("./src/plugins/Hardel/Plugin/Service/plugin.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var ng_bootstrap_1 = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
var InstallTemplateComponent = (function (_super) {
    __extends(InstallTemplateComponent, _super);
    function InstallTemplateComponent(inTmp, router, serviceModal) {
        var _this = _super.call(this) || this;
        _this.inTmp = inTmp;
        _this.router = router;
        _this.serviceModal = serviceModal;
        _this.listOfLatestTemplate = [];
        _this.retrieveListOfLatestTemplate();
        return _this;
    }
    InstallTemplateComponent.prototype.ngOnInit = function () { };
    InstallTemplateComponent.prototype.retrieveListOfLatestTemplate = function () {
        var _this = this;
        this.inTmp.getLatestTemplate().subscribe(function (data) {
            _this.listOfLatestTemplate = data;
            _this.listOfData = _this.listOfLatestTemplate;
            _this.updateListaShow();
        });
    };
    InstallTemplateComponent.prototype.downloadTemplate = function (template, modal) {
        var _this = this;
        var mod = this.serviceModal.open(modal);
        this.widthStyle = '20%';
        this.inTmp.installTemplate(template).subscribe(function (message) {
            if (message) {
                _this.widthStyle = '40%';
                _this.retrieveListOfLatestTemplate();
                _this.widthStyle = '80%';
                _this.inTmp.getTemplateFrom()
                    .subscribe(function (data) {
                    _this.widthStyle = '99%';
                    _this.inTmp.setTemplate(data.template);
                    _this.inTmp.setTemplates(data.templates);
                    mod.close();
                    _this.widthStyle = '10%';
                });
            }
        });
    };
    InstallTemplateComponent.prototype.updateTemplate = function (template, modal) {
        var _this = this;
        //this is to update plugin
        var mod = this.serviceModal.open(modal);
        this.widthStyle = '20%';
        this.inTmp.updateTemplate(template).subscribe(function (message) {
            if (message) {
                _this.widthStyle = '40%';
                _this.retrieveListOfLatestTemplate();
                _this.widthStyle = '80%';
                _this.inTmp.getPluginsFrom()
                    .subscribe(function (data) {
                    _this.widthStyle = '99%';
                    _this.inTmp.setPlugins(data);
                    mod.close();
                    _this.widthStyle = '10%';
                });
            }
        });
    };
    InstallTemplateComponent = __decorate([
        core_1.Component({
            selector: 'template-install',
            template: __webpack_require__("./src/plugins/Hardel/Plugin/component/InstallTemplate/install-template.component.html"),
            styles: ['']
        }),
        __metadata("design:paramtypes", [plugin_service_1.PluginService, router_1.Router, ng_bootstrap_1.NgbModal])
    ], InstallTemplateComponent);
    return InstallTemplateComponent;
}(list_component_1.ListComponent));
exports.InstallTemplateComponent = InstallTemplateComponent;


/***/ }),

/***/ "./src/plugins/Hardel/Plugin/component/Plugins/listplugin.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"tabbable-custom\" *ngIf=\"isRoot === true\">\n    <ul class=\"nav nav-tabs\">\n        <li class=\"active\">\n            <a href=\"#tab_1\" data-toggle=\"tab\"> List Plugin</a>\n        </li>\n        <li>\n            <a [routerLink]=\"['/backend/plugin/template']\" data-toggle=\"tab\"> Template</a>\n        </li>\n    </ul>\n    <div class=\"tab-content\">\n        <div class=\"tab-pane active\" id=\"tab_1\">\n            <div class=\"box\">\n                <div class=\"box-header\">\n\n                </div>\n                <div class=\"box-body\">\n                    <div class=\"wrapper\">\n                        <div class=\"row\">\n                            <div class=\"col-md-8\">\n                                <lt-entry-pagination\n                                        [entry]=\"'50-5'\"\n                                        (onEntry)=\"onPerPage($event)\"\n                                >\n                                </lt-entry-pagination>\n                            </div>\n                            <div class=\"col-md-4\">\n                                <div class=\"dataTables_filter\">\n                                    <a class=\"btn btn-primary\" [routerLink] = \"['/backend/plugin/plugins/install']\"><i class=\"fa fa-download\"></i> Install</a>\n                                    <a class=\"btn btn-warning\" (click)=\"uninstallPlugins()\"><i class=\"fa fa-trash-o\"></i> Uninstall</a>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-sm-12\">\n                                <table class=\"table table-bordered table-striped\">\n                                    <thead>\n                                    <tr>\n                                        <th style=\"width: 30px;\"></th>\n                                        <th>\n                                            <a>Vendor</a>\n                                        </th>\n                                        <th>\n                                            <a>Name</a>\n                                        </th>\n                                        <th>\n                                            <a>Version</a>\n                                        </th>\n                                        <th style=\"width: 50px;\" colspan=\"3\"></th>\n                                    </tr>\n                                    </thead>\n                                    <tbody>\n                                    <tr *ngFor=\"let plugin of listToShow\">\n                                        <td>\n                                            <input type=\"checkbox\" (change)=\"eventChange($event,plugin)\" [(ngModel)] = \"plugin.check\">\n                                        </td>\n                                        <td>\n                                            {{plugin.vendor}}\n                                        </td>\n                                        <td>\n                                            {{plugin.name}}\n                                        </td>\n                                        <td>\n                                            {{plugin.version}}\n                                        </td>\n                                        <td width=\"38px\">\n                                            <a (click)=\"updatePlugin(plugin)\" title=\"Update\"><i class=\"fa fa-refresh\" style=\"color:orange; font-size: 16px; cursor:pointer;\"></i></a>\n                                        </td>\n                                        <td width=\"38px\">\n                                           <a *ngIf=\"plugin.packed === false\" (click)=\"packPlugin(plugin)\" title=\"Packing\"><i class=\"fa fa-cube\" style=\"color:orange; font-size: 16px; cursor:pointer;\"></i> </a>\n                                        </td>\n                                        <td width=\"38px\">\n                                            <a *ngIf=\"plugin.packed === true\" (click)=\"deletePlugin(plugin)\"  title=\"Delete Packing\"><i class=\"fa fa-times\" style=\"color:orange; font-size: 16px; cursor: pointer;\"></i> </a>\n                                        </td>\n                                    </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                        <lt-pagination\n                                [pagesToShow]=\"3\"\n                                [perPage]=\"perPage\"\n                                [count]=\"listOfPlugins.length\"\n                                [loading]=\"false\"\n                                [page]=\"actualPage\"\n                                (goNext)=\"onNext($event)\"\n                                (goPage)=\"onPage($event)\"\n                                (goPrev)=\"onPrev()\"\n                        ></lt-pagination>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<router-outlet></router-outlet>"

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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var plugin_service_1 = __webpack_require__("./src/plugins/Hardel/Plugin/Service/plugin.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var list_component_1 = __webpack_require__("./src/model/list.component.ts");
var ListPluginComponent = (function (_super) {
    __extends(ListPluginComponent, _super);
    function ListPluginComponent(plsSer, router) {
        var _this = _super.call(this) || this;
        _this.plsSer = plsSer;
        _this.router = router;
        _this.myRoot = '/backend/plugin/plugins';
        _this.isRoot = false;
        _this.listOfPlugins = [];
        _this.onComponentInit({
            name: 'plsSer',
            permission: 'Hardel.Plugin.Plugins',
            upd: 'updatePlugins$'
        }, 'router', 'retrieveListOfPlugins');
        return _this;
    }
    ListPluginComponent.prototype.ngOnInit = function () { };
    /**
     * This function call the Service in order to get the list Of Plugins
     */
    ListPluginComponent.prototype.retrieveListOfPlugins = function () {
        var _this = this;
        this.plsSer.getPluginsFrom().subscribe(function (listPl) {
            _this.listOfPlugins = listPl;
            _this.listOfData = _this.listOfPlugins;
            _this.plsSer.setPlugins(_this.listOfPlugins);
            _this.updateListaShow();
        });
    };
    /**
     * function to push or splice item into Deleted List of Roles
     * @param ev
     * @param data
     */
    ListPluginComponent.prototype.eventChange = function (ev, data) {
        this.eventChangeData(ev, data);
    };
    /**
     * This function is to delete Plugins selected
     */
    ListPluginComponent.prototype.deletePlugin = function (plugin) {
        var _this = this;
        this.plsSer.deletePackPlugin(plugin).subscribe(function (data) {
            _this.listOfPlugins = data;
            _this.listOfData = _this.listOfPlugins;
            _this.plsSer.setPlugins(_this.listOfPlugins);
            _this.retrieveListOfData({
                name: 'plsSer',
                getData: 'getPlugins',
                setData: 'setPlugins',
                callApi: 'getPluginsFrom',
                check: 'checkPluginsExist'
            }, 'listOfPlugins');
        });
    };
    ListPluginComponent.prototype.updatePlugin = function (plugin) {
        console.log('update this plugin');
    };
    ListPluginComponent.prototype.packPlugin = function (plugin) {
        var _this = this;
        this.plsSer.packPlugin(plugin).subscribe(function (data) {
            _this.listOfPlugins = data;
            _this.listOfData = _this.listOfPlugins;
            _this.plsSer.setPlugins(_this.listOfPlugins);
            _this.retrieveListOfData({
                name: 'plsSer',
                getData: 'getPlugins',
                setData: 'setPlugins',
                callApi: 'getPluginsFrom',
                check: 'checkPluginsExist'
            }, 'listOfPlugins');
        });
    };
    ListPluginComponent.prototype.uninstallPlugins = function () {
        var _this = this;
        if (confirm('Do you really uninstall this plugins?')) {
            this.plsSer.uninstallPlugins(this.listOfDataToDelete).subscribe(function (message) {
                if (message) {
                    _this.plsSer.getPluginsFrom().subscribe(function (listPl) {
                        _this.listOfPlugins = listPl;
                        _this.listOfData = _this.listOfPlugins;
                        _this.plsSer.setPlugins(_this.listOfPlugins);
                        _this.updateListaShow();
                    });
                }
            });
        }
    };
    ListPluginComponent = __decorate([
        core_1.Component({
            selector: 'pl-list',
            template: __webpack_require__("./src/plugins/Hardel/Plugin/component/Plugins/listplugin.component.html"),
            styles: ['']
        }),
        __metadata("design:paramtypes", [plugin_service_1.PluginService, router_1.Router])
    ], ListPluginComponent);
    return ListPluginComponent;
}(list_component_1.ListComponent));
exports.ListPluginComponent = ListPluginComponent;


/***/ }),

/***/ "./src/plugins/Hardel/Plugin/component/Template/listtemplate.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"tabbable-custom\" *ngIf=\"isRoot === true\">\n    <ul class=\"nav nav-tabs\">\n        <li>\n            <a [routerLink]=\"['/backend/plugin/plugins']\"  data-toggle=\"tab\"> List Plugin</a>\n        </li>\n        <li class=\"active\">\n            <a href=\"#tab_1\" data-toggle=\"tab\"> Template</a>\n        </li>\n    </ul>\n    <div class=\"tab-content\">\n       <div class=\"box\">\n           <div class=\"box-header\">\n               <div class=\"caption\">\n                   <i class=\"fa fa-database\"></i>\n                   <span>Template Active</span>\n               </div>\n           </div>\n           <div class=\"box-body\">\n                <div class=\"wrapper\">\n                    <div class=\"row\">\n                        <div class=\"col-sm-12\">\n                            <table class=\"table table-bordered table-striped\">\n                                <thead>\n                                <tr>\n                                    <th>Vendor</th>\n                                    <th>Name</th>\n                                    <th>Version</th>\n                                    <th colspan=\"4\"></th>\n                                </tr>\n                                </thead>\n                                <tbody>\n                                <tr *ngFor=\"let temp of listOfTemplate\">\n                                    <td>{{temp.vendor}}</td>\n                                    <td>{{temp.name}}</td>\n                                    <td>{{temp.version}}</td>\n                                    <td width=\"38px\">\n                                        <a (click)=\"deactivateTemplate(temp)\" title=\"Active\"><i class=\"fa fa-power-off\" style=\"color:green\"></i></a>\n                                    </td>\n                                    <td width=\"38px\">\n                                        <a *ngIf=\"temp.installed === true\" (click)=\"uninstallTemplate(temp)\" title=\"Uninstall\"><i class=\"fa fa-trash-o\" style=\"color:orange; font-size: 16px; cursor:pointer;\"></i> </a>\n                                    </td>\n                                    <td width=\"38px\">\n                                        <a *ngIf=\"temp.packed === false\" (click)=\"packTemplate(temp)\" title=\"Packing\"><i class=\"fa fa-cube\" style=\"color:orange; font-size: 16px; cursor:pointer;\"></i> </a>\n                                    </td>\n                                    <td width=\"38px\">\n                                        <a *ngIf=\"temp.packed === true\" (click)=\"unpackTemplate(temp)\"  title=\"Delete Packing\"><i class=\"fa fa-times\" style=\"color:orange; font-size: 16px; cursor: pointer;\"></i> </a>\n                                    </td>\n                                </tr>\n                                </tbody>\n                            </table>\n                        </div>\n                    </div>\n                </div>\n           </div>\n       </div>\n    </div>\n    <div class=\"tab-content\">\n        <div class=\"tab-pane active\" id=\"tab_1\">\n            <div class=\"box\">\n                <div class=\"box-header\">\n\n                </div>\n                <div class=\"box-body\">\n                    <div class=\"wrapper\">\n                        <div class=\"row\">\n                            <div class=\"col-md-8\">\n                                <lt-entry-pagination\n                                        [entry]=\"'50-5'\"\n                                        (onEntry)=\"onPerPage($event)\"\n                                >\n                                </lt-entry-pagination>\n                            </div>\n                            <div class=\"col-md-4\">\n                                <div class=\"dataTables_filter\">\n                                    <a class=\"btn btn-primary\" [routerLink] = \"['/backend/plugin/template/install']\"><i class=\"fa fa-download\"></i> MarketPlace</a>\n                                    <a class=\"btn btn-warning\" (click)=\"uninstallTemplates()\"><i class=\"fa fa-trash-o\"></i> Uninstall</a>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-sm-12\">\n                                <table class=\"table table-bordered table-striped\">\n                                    <thead>\n                                    <tr>\n                                        <th style=\"width: 30px;\"></th>\n                                        <th>\n                                            <a>Vendor</a>\n                                        </th>\n                                        <th>\n                                            <a>Name</a>\n                                        </th>\n                                        <th>\n                                            <a>Version</a>\n                                        </th>\n                                        <th style=\"width: 50px;\" colspan=\"4\"></th>\n                                    </tr>\n                                    </thead>\n                                    <tbody>\n                                    <tr *ngFor=\"let temp of listToShow\">\n                                        <td>\n                                            <input type=\"checkbox\" (change)=\"eventChange($event,temp)\" [(ngModel)] = \"temp.check\">\n                                        </td>\n                                        <td>\n                                            {{temp.vendor}}\n                                        </td>\n                                        <td>\n                                            {{temp.name}}\n                                        </td>\n                                        <td>\n                                            {{temp.version}}\n                                        </td>\n                                        <td width=\"38px\">\n                                            <a (click)=\"activateTemplate(temp)\" title=\"Active\"><i class=\"fa fa-power-off\" style=\"color:red\"></i></a>\n                                        </td>\n                                        <td width=\"38px\">\n                                            <a *ngIf=\"temp.installed === true && temp.toUpdate === true\" (click)=\"updateTemplate(temp)\" title=\"Update\"><i class=\"fa fa-refresh\" style=\"color:orange; font-size: 16px; cursor:pointer;\"></i></a>\n                                        </td>\n                                        <td width=\"38px\">\n                                            <a *ngIf=\"temp.installed === false\" (click)=\"installTemplate(temp)\" title=\"Install\"><i class=\"fa fa-download\" style=\"color:orange; font-size: 16px; cursor:pointer;\"></i> </a>\n                                        </td>\n                                        <td width=\"38px\">\n                                            <a *ngIf=\"temp.packed === true\" (click)=\"unpackTemplate(temp)\"  title=\"Delete Packing\"><i class=\"fa fa-times\" style=\"color:orange; font-size: 16px; cursor: pointer;\"></i> </a>\n                                        </td>\n                                    </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                        <lt-pagination\n                                [pagesToShow]=\"3\"\n                                [perPage]=\"perPage\"\n                                [count]=\"listOfNotActiveTemplate.length\"\n                                [loading]=\"false\"\n                                [page]=\"actualPage\"\n                                (goNext)=\"onNext($event)\"\n                                (goPage)=\"onPage($event)\"\n                                (goPrev)=\"onPrev()\"\n                        ></lt-pagination>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/plugins/Hardel/Plugin/component/Template/listtemplate.component.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var list_component_1 = __webpack_require__("./src/model/list.component.ts");
var plugin_service_1 = __webpack_require__("./src/plugins/Hardel/Plugin/Service/plugin.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var ListTemplateComponent = (function (_super) {
    __extends(ListTemplateComponent, _super);
    function ListTemplateComponent(tpSer, router) {
        var _this = _super.call(this) || this;
        _this.tpSer = tpSer;
        _this.router = router;
        _this.myRoot = '/backend/plugin/template';
        _this.isRoot = false;
        _this.listOfTemplate = [];
        _this.listOfNotActiveTemplate = [];
        _this.onComponentInit({
            name: 'tpSer',
            permission: 'Hardel.Plugin.Template',
            upd: 'updateTemplate$'
        }, 'router', 'retrieveListOfTemplate');
        return _this;
    }
    ListTemplateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events.subscribe(function (data) {
            if (data instanceof router_1.NavigationEnd) {
                if (data.url === _this.myRoot) {
                    _this.retrieveListOfTemplate();
                }
            }
        });
    };
    /**
     * function to push or splice item into Deleted List of Roles
     * @param ev
     * @param data
     */
    ListTemplateComponent.prototype.eventChange = function (ev, data) {
        this.eventChangeData(ev, data);
    };
    ListTemplateComponent.prototype.retrieveListOfTemplate = function () {
        var _this = this;
        this.tpSer.getTemplateFrom().subscribe(function (data) {
            _this.listOfNotActiveTemplate = data.templates;
            _this.listOfTemplate = data.template;
            _this.listOfData = _this.listOfNotActiveTemplate;
            _this.tpSer.setTemplate(_this.listOfTemplate);
            _this.tpSer.setTemplates(_this.listOfNotActiveTemplate);
            _this.updateListaShow();
        });
    };
    ListTemplateComponent.prototype.packTemplate = function (temp) {
        var _this = this;
        this.tpSer.packTemplate(temp).subscribe(function (data) {
            _this.retrieveListOfTemplate();
        });
    };
    ListTemplateComponent.prototype.unpackTemplate = function (temp) {
        var _this = this;
        this.tpSer.deletePackTemplate(temp).subscribe(function (data) {
            _this.retrieveListOfTemplate();
        });
    };
    ListTemplateComponent.prototype.activateTemplate = function (temp) {
        var _this = this;
        this.tpSer.activateTemplate(temp).subscribe(function (data) {
            _this.retrieveListOfTemplate();
        });
    };
    ListTemplateComponent.prototype.deactivateTemplate = function (temp) {
        var _this = this;
        this.tpSer.deactivateTemplate(temp).subscribe(function (data) {
            _this.retrieveListOfTemplate();
        });
    };
    ListTemplateComponent.prototype.installTemplate = function (temp) {
        var _this = this;
        this.tpSer.installTemplate(temp).subscribe(function (data) {
            _this.retrieveListOfTemplate();
        });
    };
    ListTemplateComponent.prototype.uninstallTemplate = function (temp) {
        var _this = this;
        this.tpSer.uninstallTemplate(temp).subscribe(function (data) {
            _this.retrieveListOfTemplate();
        });
    };
    ListTemplateComponent.prototype.uninstallTemplates = function () {
        var _this = this;
        if (confirm('Do you really uninstall this templates?')) {
            this.tpSer.uninstallTemplates(this.listOfDataToDelete).subscribe(function (message) {
                if (message) {
                    _this.retrieveListOfTemplate();
                }
            });
        }
    };
    ListTemplateComponent = __decorate([
        core_1.Component({
            selector: 'tp-list',
            template: __webpack_require__("./src/plugins/Hardel/Plugin/component/Template/listtemplate.component.html"),
            styles: ['']
        }),
        __metadata("design:paramtypes", [plugin_service_1.PluginService, router_1.Router])
    ], ListTemplateComponent);
    return ListTemplateComponent;
}(list_component_1.ListComponent));
exports.ListTemplateComponent = ListTemplateComponent;


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
var install_plugin_component_1 = __webpack_require__("./src/plugins/Hardel/Plugin/component/InstallPlugin/install-plugin.component.ts");
exports.InstallPluginComponent = install_plugin_component_1.InstallPluginComponent;
var listtemplate_component_1 = __webpack_require__("./src/plugins/Hardel/Plugin/component/Template/listtemplate.component.ts");
exports.ListTemplateComponent = listtemplate_component_1.ListTemplateComponent;
var install_template_component_1 = __webpack_require__("./src/plugins/Hardel/Plugin/component/InstallTemplate/install-template.component.ts");
exports.InstallTemplateComponent = install_template_component_1.InstallTemplateComponent;


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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
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
    PluginComponent = __decorate([
        core_1.Component({
            selector: 'app-plugin',
            template: __webpack_require__("./src/plugins/Hardel/Plugin/component/plugin.component.html")
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], PluginComponent);
    return PluginComponent;
}());
exports.PluginComponent = PluginComponent;


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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var plugin_routing_1 = __webpack_require__("./src/plugins/Hardel/Plugin/plugin.routing.ts");
var common_1 = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var http_1 = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var breadcrumbs_1 = __webpack_require__("./src/app/backend-module/breadcrumbs/index.ts");
var uielement_module_1 = __webpack_require__("./src/app/backend-module/UIElement/uielement.module.ts");
var plugin_service_1 = __webpack_require__("./src/plugins/Hardel/Plugin/Service/plugin.service.ts");
var ng_bootstrap_1 = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
var PluginModule = (function () {
    function PluginModule() {
    }
    PluginModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                http_1.HttpClientModule,
                plugin_routing_1.routing,
                breadcrumbs_1.BreadCrumbModule,
                uielement_module_1.UIElementModule,
                ng_bootstrap_1.NgbModule.forRoot()
            ],
            providers: [plugin_service_1.PluginService],
            declarations: [plugin_routing_1.pluginComponent]
        })
    ], PluginModule);
    return PluginModule;
}());
exports.PluginModule = PluginModule;


/***/ }),

/***/ "./src/plugins/Hardel/Plugin/plugin.routing.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by hernan on 17/10/2017.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var PL = __webpack_require__("./src/plugins/Hardel/Plugin/component/index.ts");
var routes = [
    { path: '', component: PL.PluginComponent, data: { breadcrumb: 'Plugins' }, children: [
            { path: 'plugins', component: PL.ListPluginComponent, data: { breadcrumb: 'List' }, children: [
                    { path: 'install', component: PL.InstallPluginComponent, data: { breadcrumb: 'Install' } }
                ] },
            { path: 'template', component: PL.ListTemplateComponent, data: { breadcrumb: 'Template List' }, children: [
                    { path: 'install', component: PL.InstallTemplateComponent, data: { breadcrumb: 'Template Install' } }
                ] }
        ] }
];
exports.routing = router_1.RouterModule.forChild(routes);
exports.pluginComponent = [
    PL.PluginComponent,
    PL.ListPluginComponent,
    PL.InstallPluginComponent,
    PL.ListTemplateComponent,
    PL.InstallTemplateComponent
];


/***/ })

});
//# sourceMappingURL=plugin.module.chunk.js.map