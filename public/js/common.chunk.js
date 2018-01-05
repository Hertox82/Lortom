webpackJsonp(["common"],{

/***/ "./node_modules/tslint/lib/utils.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @license
 * Copyright 2016 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Enforces the invariant that the input is an array.
 */
function arrayify(arg) {
    if (Array.isArray(arg)) {
        return arg;
    }
    else if (arg != null) {
        return [arg];
    }
    else {
        return [];
    }
}
exports.arrayify = arrayify;
/**
 * @deprecated (no longer used)
 * Enforces the invariant that the input is an object.
 */
function objectify(arg) {
    if (typeof arg === "object" && arg != null) {
        return arg;
    }
    else {
        return {};
    }
}
exports.objectify = objectify;
function hasOwnProperty(arg, key) {
    return Object.prototype.hasOwnProperty.call(arg, key);
}
exports.hasOwnProperty = hasOwnProperty;
/**
 * Replace hyphens in a rule name by upper-casing the letter after them.
 * E.g. "foo-bar" -> "fooBar"
 */
function camelize(stringWithHyphens) {
    return stringWithHyphens.replace(/-(.)/g, function (_, nextLetter) { return nextLetter.toUpperCase(); });
}
exports.camelize = camelize;
function isUpperCase(str) {
    return str === str.toUpperCase();
}
exports.isUpperCase = isUpperCase;
function isLowerCase(str) {
    return str === str.toLowerCase();
}
exports.isLowerCase = isLowerCase;
/**
 * Removes leading indents from a template string without removing all leading whitespace
 */
function dedent(strings) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var fullString = strings.reduce(function (accumulator, str, i) {
        return "" + accumulator + values[i - 1] + str;
    });
    // match all leading spaces/tabs at the start of each line
    var match = fullString.match(/^[ \t]*(?=\S)/gm);
    if (match === null) {
        // e.g. if the string is empty or all whitespace.
        return fullString;
    }
    // find the smallest indent, we don't want to remove all leading whitespace
    var indent = Math.min.apply(Math, match.map(function (el) { return el.length; }));
    var regexp = new RegExp("^[ \\t]{" + indent + "}", "gm");
    fullString = indent > 0 ? fullString.replace(regexp, "") : fullString;
    return fullString;
}
exports.dedent = dedent;
/**
 * Strip comments from file content.
 */
function stripComments(content) {
    /**
     * First capturing group matches double quoted string
     * Second matches single quotes string
     * Third matches block comments
     * Fourth matches line comments
     */
    var regexp = /("(?:[^\\\"]*(?:\\.)?)*")|('(?:[^\\\']*(?:\\.)?)*')|(\/\*(?:\r?\n|.)*?\*\/)|(\/{2,}.*?(?:(?:\r?\n)|$))/g;
    var result = content.replace(regexp, function (match, _m1, _m2, m3, m4) {
        // Only one of m1, m2, m3, m4 matches
        if (m3 !== undefined) {
            // A block comment. Replace with nothing
            return "";
        }
        else if (m4 !== undefined) {
            // A line comment. If it ends in \r?\n then keep it.
            var length = m4.length;
            if (length > 2 && m4[length - 1] === "\n") {
                return m4[length - 2] === "\r" ? "\r\n" : "\n";
            }
            else {
                return "";
            }
        }
        else {
            // We match a string
            return match;
        }
    });
    return result;
}
exports.stripComments = stripComments;
/**
 * Escapes all special characters in RegExp pattern to avoid broken regular expressions and ensure proper matches
 */
function escapeRegExp(re) {
    return re.replace(/[.+*?|^$[\]{}()\\]/g, "\\$&");
}
exports.escapeRegExp = escapeRegExp;
function arraysAreEqual(a, b, eq) {
    return a === b || a !== undefined && b !== undefined && a.length === b.length && a.every(function (x, idx) { return eq(x, b[idx]); });
}
exports.arraysAreEqual = arraysAreEqual;
/** Returns the first non-`undefined` result. */
function find(inputs, getResult) {
    for (var _i = 0, inputs_1 = inputs; _i < inputs_1.length; _i++) {
        var element = inputs_1[_i];
        var result = getResult(element);
        if (result !== undefined) {
            return result;
        }
    }
    return undefined;
}
exports.find = find;
/** Returns an array that is the concatenation of all output arrays. */
function flatMap(inputs, getOutputs) {
    var out = [];
    for (var _i = 0, inputs_2 = inputs; _i < inputs_2.length; _i++) {
        var input = inputs_2[_i];
        out.push.apply(out, getOutputs(input));
    }
    return out;
}
exports.flatMap = flatMap;
/** Returns an array of all outputs that are not `undefined`. */
function mapDefined(inputs, getOutput) {
    var out = [];
    for (var _i = 0, inputs_3 = inputs; _i < inputs_3.length; _i++) {
        var input = inputs_3[_i];
        var output = getOutput(input);
        if (output !== undefined) {
            out.push(output);
        }
    }
    return out;
}
exports.mapDefined = mapDefined;
function readBufferWithDetectedEncoding(buffer) {
    switch (detectBufferEncoding(buffer)) {
        case "utf8":
            return buffer.toString();
        case "utf8-bom":
            return buffer.toString("utf-8", 2);
        case "utf16le":
            return buffer.toString("utf16le", 2);
        case "utf16be":
            // Round down to nearest multiple of 2.
            var len = buffer.length & ~1; // tslint:disable-line no-bitwise
            // Flip all byte pairs, then read as little-endian.
            for (var i = 0; i < len; i += 2) {
                var temp = buffer[i];
                buffer[i] = buffer[i + 1];
                buffer[i + 1] = temp;
            }
            return buffer.toString("utf16le", 2);
    }
}
exports.readBufferWithDetectedEncoding = readBufferWithDetectedEncoding;
function detectBufferEncoding(buffer, length) {
    if (length === void 0) { length = buffer.length; }
    if (length < 2) {
        return "utf8";
    }
    switch (buffer[0]) {
        case 0xEF:
            if (buffer[1] === 0xBB && length >= 3 && buffer[2] === 0xBF) {
                return "utf8-bom";
            }
            break;
        case 0xFE:
            if (buffer[1] === 0xFF) {
                return "utf16be";
            }
            break;
        case 0xFF:
            if (buffer[1] === 0xFE) {
                return "utf16le";
            }
    }
    return "utf8";
}
exports.detectBufferEncoding = detectBufferEncoding;


/***/ }),

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

/***/ "./src/model/list.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var pagination_service_1 = __webpack_require__("./src/services/pagination.service.ts");
var utils_1 = __webpack_require__("./node_modules/tslint/lib/utils.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var ListComponent = (function () {
    function ListComponent() {
        this.listOfData = [];
        this.listOfDataToDelete = [];
        //This is to manage the Pagination
        this.pagServ = new pagination_service_1.PaginationService();
        this.actualPage = 1;
        this.perPage = 3;
        this.listToShow = [];
        this.listOfData = [];
    }
    ListComponent.prototype.onComponentInit = function (service, router, getList) {
        var _this = this;
        if (this[service.name] != null || this[service.name] != undefined) {
            if (!this[service.name].hasPermissions(service.permission)) {
                if (this[router] != null || this[router] != undefined) {
                    this[router].navigate(['/backend/dashboard']);
                }
            }
        }
        if (this[router] != null || this[router] != undefined) {
            this[router].events.subscribe(function (val) {
                if (val instanceof router_1.NavigationEnd) {
                    if (_this['myRoot'] === val.url) {
                        _this['isRoot'] = true;
                    }
                    else {
                        _this['isRoot'] = false;
                    }
                }
            });
        }
        if (typeof this[getList] === 'function') {
            this[getList]();
            if (this[service.name] != null || this[service.name] != undefined) {
                this[service.name][service.upd].subscribe(function () {
                    _this[getList]();
                });
            }
        }
    };
    /**
     * This function is
     */
    ListComponent.prototype.updateListaShow = function () {
        this.listToShow = this.pagServ.getShowList({
            entry: this.perPage,
            list: this.listOfData,
            pageToShow: this.actualPage
        });
    };
    /**
     * This function is to Catch Event of Pagination
     */
    ListComponent.prototype.onPrev = function () {
        this.actualPage--;
        this.updateListaShow();
    };
    /**
     * This function is to Catch Event of Pagination
     * @param ev
     */
    ListComponent.prototype.onNext = function (ev) {
        this.actualPage++;
        this.updateListaShow();
    };
    /**
     * This function is to Catch Event of Pagination
     * @param act
     */
    ListComponent.prototype.onPage = function (act) {
        this.actualPage = act;
        this.updateListaShow();
    };
    /**
     * This function is to Catch Event of Pagination
     * @param n
     */
    ListComponent.prototype.onPerPage = function (n) {
        this.perPage = n;
        this.updateListaShow();
    };
    /**
     * This function retrieveListOfData that passed into singular Component
     * @param service
     * @param nameList
     */
    ListComponent.prototype.retrieveListOfData = function (service, nameList) {
        var _this = this;
        if (this[service.name] != null || this[service.name] != undefined) {
            var fnCheck = service.check;
            if (typeof this[service.name][fnCheck] === 'function') {
                if (!this[service.name][fnCheck]()) {
                    var fnCallApi = service.callApi;
                    if (typeof this[service.name][fnCallApi] === 'function') {
                        this[service.name][fnCallApi]().subscribe(function (plugins) {
                            _this.listOfData = plugins;
                            _this[nameList] = plugins;
                            for (var i = 0; i < _this[nameList].length; i++) {
                                if (!utils_1.hasOwnProperty(_this[nameList][i], 'check')) {
                                    _this[nameList][i].check = false;
                                }
                            }
                            var fnSetData = service.setData;
                            if (typeof _this[service.name][fnSetData] === 'function') {
                                _this[service.name][fnSetData](plugins);
                                _this.updateListaShow();
                            }
                        });
                    }
                }
                else {
                    this[nameList] = this[service.name][service.getData]();
                    this.listOfData = this[nameList];
                    this.listOfData.forEach(function (item) {
                        if (!item.hasOwnProperty('check')) {
                            item.check = false;
                        }
                    });
                    this.updateListaShow();
                }
            }
        }
    };
    /**
     * This function hold the Event from other Component
     * @param ev
     * @param data
     */
    ListComponent.prototype.eventChangeData = function (ev, data) {
        if (ev.target.checked) {
            this.listOfDataToDelete.push(data);
        }
        else {
            var index = this.listOfDataToDelete.indexOf(data);
            if (index > -1) {
                this.listOfDataToDelete.splice(index, 1);
            }
        }
    };
    /**
     * This Function is to Delete Data from Component
     * @param service
     * @param nameList
     * @param message
     */
    ListComponent.prototype.deleteData = function (service, nameList, message) {
        var _this = this;
        if (this.listOfDataToDelete.length > 0) {
            if (confirm(message)) {
                if (this[service.name] != null || this[service.name] != undefined) {
                    var fnDel = service.delFn;
                    if (typeof this[service.name][fnDel] === 'function') {
                        this[service.name][fnDel](this.listOfDataToDelete).subscribe(function (data) {
                            _this.listOfDataToDelete = [];
                            _this.listOfData = data;
                            _this[nameList] = data;
                            var fnSet = service.setData;
                            if (typeof _this[service.name][fnSet] === 'function') {
                                _this[service.name][fnSet](_this[nameList]);
                                _this.updateListaShow();
                            }
                        });
                    }
                }
            }
        }
    };
    return ListComponent;
}());
exports.ListComponent = ListComponent;
//# sourceMappingURL=list.component.js.map

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