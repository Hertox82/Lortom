webpackJsonp(["common"],{

/***/ "./src/app/backend-module/UIElement/pagination/pagination.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" *ngIf=\"count !== 0\">\n    <div class=\"col-sm-5\">\n        <div class=\"dataTables_info\">Showing {{getMin()}} to {{getMax()}} of {{count}} entries</div>\n    </div>\n    <div class=\"col-sm-7\">\n        <div class=\"dataTables_paginate\">\n            <ul class=\"pagination\">\n                <li class=\"page-item\">\n                    <a class=\"page-link\" (click)=\"onPrev()\" [ngClass]=\"{ 'disabled': page === 1 || loading }\" aria-label=\"Previous\"><span aria-hidden=\"true\">«</span></a>\n                </li>\n                <li class=\"page-item\" *ngFor=\"let pageNum of getPages()\" [ngClass]=\"{'active' : pageNum === page, 'disabled' : loading}\">\n                    <a class=\"page-link\" (click)=\"onPage(pageNum)\">{{pageNum}}</a>\n                </li>\n                <li class=\"page-item\">\n                    <a class=\"page-link\" (click)=\"onNext(true)\"  [ngClass]=\"{ 'disabled': page === 1 || loading }\" aria-label=\"Next\"><span aria-hidden=\"true\">»</span></a>\n                </li>\n            </ul>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/backend-module/UIElement/pagination/pagination.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by hernan on 16/11/2017.
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
var PaginationComponent = (function () {
    function PaginationComponent() {
        this.loading = false;
        this.goPrev = new core_1.EventEmitter();
        this.goNext = new core_1.EventEmitter();
        this.goPage = new core_1.EventEmitter();
    }
    PaginationComponent.prototype.ngOnInit = function () { };
    PaginationComponent.prototype.getMin = function () {
        return ((this.perPage * this.page) - this.perPage) + 1;
    };
    PaginationComponent.prototype.getMax = function () {
        var max = this.perPage * this.page;
        if (max > this.count) {
            max = this.count;
        }
        return max;
    };
    PaginationComponent.prototype.onPrev = function () {
        this.goPrev.emit(true);
    };
    PaginationComponent.prototype.onNext = function (next) {
        this.goNext.emit(next);
    };
    PaginationComponent.prototype.onPage = function (page) {
        this.goPage.emit(page);
    };
    PaginationComponent.prototype.lastPage = function () {
        return this.perPage * this.page > this.count;
    };
    PaginationComponent.prototype.getPages = function () {
        var c = Math.ceil(this.count / this.perPage);
        var p = this.page || 1;
        var pagesToShow = this.pagesToShow || 9;
        var pages = [];
        pages.push(p);
        var times = pagesToShow - 1;
        for (var i = 0; i < times; i++) {
            if (pages.length < pagesToShow) {
                if (Math.min.apply(null, pages) > 1) {
                    pages.push(Math.min.apply(null, pages) - 1);
                }
            }
            if (pages.length < pagesToShow) {
                if (Math.max.apply(null, pages) < c) {
                    pages.push(Math.max.apply(null, pages) + 1);
                }
            }
        }
        pages.sort(function (a, b) { return a - b; });
        return pages;
    };
    return PaginationComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], PaginationComponent.prototype, "count", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], PaginationComponent.prototype, "page", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], PaginationComponent.prototype, "loading", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], PaginationComponent.prototype, "perPage", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], PaginationComponent.prototype, "pagesToShow", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], PaginationComponent.prototype, "goPrev", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], PaginationComponent.prototype, "goNext", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], PaginationComponent.prototype, "goPage", void 0);
PaginationComponent = __decorate([
    core_1.Component({
        selector: 'lt-pagination',
        template: __webpack_require__("./src/app/backend-module/UIElement/pagination/pagination.component.html"),
        styles: ['']
    }),
    __metadata("design:paramtypes", [])
], PaginationComponent);
exports.PaginationComponent = PaginationComponent;
//# sourceMappingURL=pagination.component.js.map

/***/ }),

/***/ "./src/app/backend-module/UIElement/pagination/show-entry.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"dataTables_length\">\n    <label>\n        Show\n        <select class=\"form-control input-sm\" name=\"example_length\" (change)=\"passVal($event.target.value)\">\n            <option *ngFor=\"let val of listEntry\" value = \"{{val}}\">{{val}}</option>\n        </select>\n        entries\n    </label>\n</div>"

/***/ }),

/***/ "./src/app/backend-module/UIElement/pagination/show-entry.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by hernan on 17/11/2017.
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
var ShowEntryComponent = (function () {
    function ShowEntryComponent() {
        this.listEntry = [];
        this.onEntry = new core_1.EventEmitter();
    }
    ShowEntryComponent.prototype.ngOnInit = function () {
        var entries = this.entry.split('-');
        var maxNumber = parseInt(entries[0]);
        var grouping = parseInt(entries[1]);
        var iterator = maxNumber / grouping;
        for (var i = 0; i < iterator; i++) {
            var number = (i + 1) * grouping;
            this.listEntry.push(number);
        }
        this.onEntry.emit(this.listEntry[0]);
    };
    ShowEntryComponent.prototype.passVal = function (event) {
        this.onEntry.emit(parseInt(event));
    };
    return ShowEntryComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ShowEntryComponent.prototype, "entry", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ShowEntryComponent.prototype, "onEntry", void 0);
ShowEntryComponent = __decorate([
    core_1.Component({
        selector: 'lt-entry-pagination',
        template: __webpack_require__("./src/app/backend-module/UIElement/pagination/show-entry.component.html"),
        styles: ['']
    }),
    __metadata("design:paramtypes", [])
], ShowEntryComponent);
exports.ShowEntryComponent = ShowEntryComponent;
//# sourceMappingURL=show-entry.component.js.map

/***/ }),

/***/ "./src/app/backend-module/UIElement/uielement.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by hernan on 16/11/2017.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
var pagination_component_1 = __webpack_require__("./src/app/backend-module/UIElement/pagination/pagination.component.ts");
var show_entry_component_1 = __webpack_require__("./src/app/backend-module/UIElement/pagination/show-entry.component.ts");
var UIElementModule = (function () {
    function UIElementModule() {
    }
    return UIElementModule;
}());
UIElementModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule
        ],
        declarations: [pagination_component_1.PaginationComponent, show_entry_component_1.ShowEntryComponent],
        providers: [],
        exports: [pagination_component_1.PaginationComponent, show_entry_component_1.ShowEntryComponent]
    })
], UIElementModule);
exports.UIElementModule = UIElementModule;
//# sourceMappingURL=uielement.module.js.map

/***/ }),

/***/ "./src/services/master.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var api_manager_1 = __webpack_require__("./src/app/urlApi/api.manager.ts");
var http_1 = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/**
 * Created by hernan on 20/11/2017.
 */
var MasterService = (function () {
    function MasterService() {
        this.apiManager = new api_manager_1.ApiManager();
    }
    /**
     * Check if User has permission
     * @param name
     * @returns {boolean}
     */
    MasterService.prototype.hasPermissions = function (name) {
        if (this.user == null) {
            this.user = JSON.parse(sessionStorage.getItem('user'));
        }
        for (var i = 0; i < this.user.permissions.length; i++) {
            if (this.user.permissions[i].name === name) {
                return true;
            }
        }
        return false;
    };
    /**
     * This function is abstraction of getting item by property
     * @param propertyName
     * @param value
     * @param sessionName
     * @param prop
     * @returns {null | any }
     */
    MasterService.prototype.getItemByProperty = function (propertyName, value, sessionName, prop) {
        var list = this.getItem(sessionName, prop);
        var response = null;
        list.forEach(function (item) {
            if (item[propertyName] === value) {
                response = item;
            }
        });
        return response;
    };
    /**
     * this function update every type of item into the own List
     * @param item
     * @param list
     */
    MasterService.prototype.updateItemInList = function (item, iList) {
        for (var i = 0; i < iList.length; i++) {
            if (iList[i].id === item.id) {
                iList[i] = item;
            }
        }
        return iList;
    };
    /**
     * Return if an Item exist
     * @param name
     * @returns {boolean}
     */
    MasterService.prototype.checkItemExist = function (name) {
        return (sessionStorage.getItem(name) !== null);
    };
    /**
     * Set Item into a SessionStorage
     * @param name
     * @param list
     */
    MasterService.prototype.setItem = function (name, list) {
        sessionStorage.setItem(name, JSON.stringify(list));
    };
    /**
     * Get Item from SessionStorage
     * @param name
     * @param prop
     * @returns {any}
     */
    MasterService.prototype.getItem = function (name, prop) {
        if (this[prop] == null || this[prop] == undefined) {
            return JSON.parse(sessionStorage.getItem(name));
        }
        else {
            return this[prop];
        }
    };
    /**
     * Delete item from SessionStorage
     * @param name
     * @param prop
     */
    MasterService.prototype.deleteItem = function (name, prop) {
        this[prop] = null;
        sessionStorage.removeItem(name);
    };
    MasterService.prototype.getOptions = function () {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return new http_1.RequestOptions({ headers: headers });
    };
    return MasterService;
}());
exports.MasterService = MasterService;
//# sourceMappingURL=master.service.js.map

/***/ }),

/***/ "./src/services/pagination.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by hernan on 16/11/2017.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var PaginationService = (function () {
    function PaginationService() {
    }
    PaginationService.prototype.getShowList = function (obj) {
        this.entry = obj.entry;
        this.list = obj.list;
        this.length = obj.list.length;
        this.perPage = Math.ceil(this.length / this.entry);
        this.min = 1;
        this.max = Object.assign({}, this.perPage);
        this.pageToShow = obj.pageToShow;
        var iTO = (this.pageToShow * this.entry) - this.entry;
        var counter = (this.pageToShow == this.max) ? this.length : this.entry;
        var show = [];
        for (var i = 0; i < counter; i++) {
            var showI = i + iTO;
            if (showI in this.list)
                show.push(this.list[showI]);
        }
        return show;
    };
    return PaginationService;
}());
exports.PaginationService = PaginationService;
//# sourceMappingURL=pagination.service.js.map

/***/ })

});
//# sourceMappingURL=common.chunk.js.map