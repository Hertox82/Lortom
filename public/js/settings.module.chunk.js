webpackJsonp(["settings.module"],{

/***/ "../../../../../src/plugins/Hardel/Settings/Services/settings.interfaces.ts":
/***/ (function(module, exports) {

//# sourceMappingURL=settings.interfaces.js.map

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Settings/Services/settings.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_urlApi_api_manager__ = __webpack_require__("../../../../../src/app/urlApi/api.manager.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SettingsService = (function () {
    function SettingsService(http) {
        this.http = http;
        this._updateRoles = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__["Subject"]();
        this.updateRoles$ = this._updateRoles.asObservable();
        this._updateUsers = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__["Subject"]();
        this.updateUsers$ = this._updateUsers.asObservable();
        // create the ApiManager
        this.apiManager = new __WEBPACK_IMPORTED_MODULE_3__app_urlApi_api_manager__["a" /* ApiManager */]();
        // write the api route for setting
        var urls = [
            { namePath: 'getPermission', path: 'permissions' },
            { namePath: 'getRoles', path: 'roles' },
            { namePath: 'saveRole', path: 'role' },
            { namePath: 'getUsers', path: 'users' },
        ];
        //Add the Api to the ApiManager
        this.apiManager.addListUrlApi(urls);
    }
    /**
     * This function retrive the roles from the API (Laravel)
     * @returns {Observable<R>}
     */
    SettingsService.prototype.getRolesFrom = function () {
        return this.http.get(this.apiManager.getPathByName('getRoles'))
            .map(function (response) {
            return response.json().roles;
        });
    };
    SettingsService.prototype.getUsersFrom = function () {
        return this.http.get(this.apiManager.getPathByName('getUsers'))
            .map(function (response) {
            return response.json().users;
        });
    };
    /**
     * This function retrive the permissions from the API (Laravel)
     * @returns {Observable<R>}
     */
    SettingsService.prototype.getPermissionsFrom = function () {
        return this.http.get(this.apiManager.getPathByName('getPermission'))
            .map(function (response) {
            return response.json().permissions;
        });
    };
    /**
     * This function set the Roles
     * @param roles
     */
    SettingsService.prototype.setRoles = function (roles) {
        sessionStorage.setItem('roles', JSON.stringify(roles));
        this.listOfRoles = roles;
    };
    SettingsService.prototype.setUsers = function (users) {
        sessionStorage.setItem('users', JSON.stringify(users));
        this.listOfUsers = users;
    };
    /**
     * This function is to set new User into the listOfRoles
     * @param role
     */
    SettingsService.prototype.setRole = function (role) {
        var roles = this.getRoles();
        roles.push(role);
        this.deleteRoleFromCache();
        this.setRoles(roles);
    };
    SettingsService.prototype.setUser = function (user) {
        var users = this.getUsers();
        users.push(user);
        this.deleteUserFromCache();
        this.setUsers(users);
    };
    SettingsService.prototype.deleteRoleFromCache = function () {
        this.listOfRoles = null;
        sessionStorage.removeItem('roles');
    };
    SettingsService.prototype.deleteUserFromCache = function () {
        this.listOfUsers = null;
        sessionStorage.removeItem('users');
    };
    /**
     * This function check if Dataset of Roles exist
     * @returns {boolean}
     */
    SettingsService.prototype.checkRolesExist = function () {
        return (sessionStorage.getItem('roles') !== null);
    };
    SettingsService.prototype.checkUsersExist = function () {
        return (sessionStorage.getItem('users') !== null);
    };
    /**
     * This function return Role passing a property
     * @param name
     * @param value
     * @returns {Role}
     */
    SettingsService.prototype.getRoleByProperty = function (name, value) {
        var response;
        response = null;
        if (this.listOfRoles == null) {
            this.listOfRoles = JSON.parse(sessionStorage.getItem('roles'));
        }
        this.listOfRoles.forEach(function (role) {
            if (role[name] === value) {
                response = role;
            }
        });
        return response;
    };
    /**
     * This function check if a role has permission
     * @param role
     * @param permission
     * @returns {boolean}
     */
    SettingsService.prototype.roleHasPermission = function (role, permission) {
        var response = false;
        role.permissions.forEach(function (p) {
            if (p.name === permission) {
                response = true;
            }
        });
        return response;
    };
    /**
     * This function get The Roles
     * @returns {any}
     */
    SettingsService.prototype.getRoles = function () {
        if (this.listOfRoles == null) {
            return JSON.parse(sessionStorage.getItem('roles'));
        }
        else {
            return this.listOfRoles;
        }
    };
    SettingsService.prototype.getUsers = function () {
        if (this.listOfUsers == null) {
            return JSON.parse(sessionStorage.getItem('users'));
        }
        else {
            return this.listOfUsers;
        }
    };
    SettingsService.prototype.saveRole = function (role) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.put(this.apiManager.getPathByName('saveRole'), role, options)
            .map(function (response) {
            return response.json().role;
        });
    };
    SettingsService.prototype.newRole = function (role) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post(this.apiManager.getPathByName('saveRole'), role, options)
            .map(function (response) {
            return response.json().role;
        });
    };
    SettingsService.prototype.newUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post(this.apiManager.getPathByName('saveUser'), user, options)
            .map(function (response) {
            return response.json().user;
        });
    };
    SettingsService.prototype.deleteRoles = function (roles) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.put(this.apiManager.getPathByName('getRoles'), roles, options)
            .map(function (response) {
            return response.json().roles;
        });
    };
    SettingsService.prototype.deleteUsers = function (users) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.put(this.apiManager.getPathByName('getUsers'), users, options)
            .map(function (response) {
            return response.json().roles;
        });
    };
    SettingsService.prototype.updateListOfRoles = function () {
        this._updateRoles.next();
    };
    SettingsService.prototype.updateListOfUsers = function () {
        this._updateUsers.next();
    };
    return SettingsService;
}());
SettingsService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], SettingsService);

var _a;
//# sourceMappingURL=settings.service.js.map

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Settings/component/NewRole/rolenew.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form\">\n    <div class=\"portlet\">\n        <div class=\"portlet-title\">\n            <div class=\"caption\">\n                <i class=\"fa fa-database\"></i>\n                <span>General Definitions</span>\n            </div>\n            <div class=\"actions\">\n            </div>\n        </div>\n        <div class=\"portlet-body\">\n            <div class=\"portlet-form-body\">\n                <div class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"nome\" class=\"col-md-2 control-label\">Nome</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"nome\" placeholder=\"Nome\" id=\"nome\" [(ngModel)] = \"role.name\" >\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"portlet\">\n        <div class=\"portlet-title\">\n            <div class=\"caption\">\n                <i class=\"fa fa-list\"></i>\n                <span>Permissions</span>\n            </div>\n            <div class=\"actions\">\n                <button class=\"btn cyan\" data-toggle=\"modal\" data-target=\"#addModal\">\n                    <i class=\"fa fa-plus\"></i>\n                    Add\n                </button>\n            </div>\n        </div>\n        <div class=\"portlet-body\">\n            <div class=\"box\">\n                <div class=\"box-header\">\n\n                </div>\n                <div class=\"box-body\">\n                    <div class=\"wrapper\">\n                        <div class=\"row\">\n                            <div class=\"col-sm-12\">\n                                <table class=\"table table-bordered table-striped\" *ngIf=\"role.permissions.length > 0\">\n                                    <thead>\n                                    <tr>\n                                        <th>\n                                            <a>Nome</a>\n                                        </th>\n                                        <th style=\"width: 50px;\"></th>\n                                    </tr>\n                                    </thead>\n                                    <tbody>\n                                    <tr *ngFor=\"let permission of role.permissions\">\n                                        <td>\n                                            {{permission.name}}\n                                        </td>\n                                        <td>\n                                            <a class=\"td_orange\" (click)=\"erasePermission(permission)\" *ngIf=\"isEdit == true\"><i class=\"fa fa-window-close-o\"></i></a>\n                                        </td>\n                                    </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-12\">\n            <button class=\"btn orange\" (click)=\"saveMode()\">Save</button>\n            <button class=\"btn red\" (click)=\"resetMode()\">Reset</button>\n        </div>\n    </div>\n    <div id=\"addModal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"addModal\"  aria-hidden=\"true\">\n        <div class=\"modal-dialog\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <div class=\"modal-title\">\n                        Searching For Permission\n                        <button class=\"close\" data-dismiss = \"modal\" aria-label=\"hidden\"><i class=\"fa fa-times\"></i></button>\n                    </div>\n                </div>\n                <div class=\"modal-body\">\n                    <div class=\"row\">\n                        <div class=\"col-md-12\">\n                            <div class=\"form-group flex-group\">\n                                <label class=\"col-md-4\">Name</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control input-sm\" name=\"query\" [(ngModel)]=\"query\" (keyup)=\"filter()\" autocomplete=\"off\">\n                                    <div class=\"suggestions\" *ngIf=\"filteredList.length > 0\">\n                                        <ul>\n                                            <li class=\"suggestion-li\" *ngFor=\"let item of filteredList\">\n                                                <a (click)=\"addPermissions(item)\">{{item.name}}</a>\n                                            </li>\n                                        </ul>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"modal-footer\">\n                    <div class=\"m-footer\">\n\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</form>"

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Settings/component/NewRole/rolenew.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoleNewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_settings_service__ = __webpack_require__("../../../../../src/plugins/Hardel/Settings/Services/settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RoleNewComponent = (function () {
    function RoleNewComponent(sService, router) {
        this.sService = sService;
        this.router = router;
        this.listPermissions = [];
        this.isEdit = false;
        this.filteredList = [];
        this.query = '';
        this.role = {
            id: -1,
            name: '',
            state: false,
            permissions: []
        };
    }
    RoleNewComponent.prototype.ngOnInit = function () {
        this.retrivePermission();
    };
    RoleNewComponent.prototype.retrivePermission = function () {
        var _this = this;
        this.sService.getPermissionsFrom().subscribe(function (perms) {
            _this.listPermissions = perms;
            _this.role.permissions.forEach(function (item) {
                var index = -1;
                for (var i = 0; i < _this.listPermissions.length; i++) {
                    var m = _this.listPermissions[i];
                    if (m.id === item.id && m.name === item.name) {
                        index = i;
                        break;
                    }
                }
                if (index > -1) {
                    _this.listPermissions.splice(index, 1);
                }
            });
        });
        this.cloneRole();
    };
    /**
     * This function filter permission for research
     */
    RoleNewComponent.prototype.filter = function () {
        if (this.query !== "") {
            this.filteredList = this.listPermissions.filter(function (el) {
                return el.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        }
    };
    /**
     * This function delete Permission from role.permissions
     * @param item
     */
    RoleNewComponent.prototype.erasePermission = function (item) {
        // cancella il permesso
        this.listPermissions.push(item);
        var index = this.role.permissions.indexOf(item);
        if (index > -1) {
            this.role.permissions.splice(index, 1);
        }
    };
    /**
     * This Function add Permission at the moment to role.permissions
     * @param item
     */
    RoleNewComponent.prototype.addPermissions = function (item) {
        //aggiunge un permesso
        this.filteredList = [];
        this.query = item.name;
        this.role.permissions.push(item);
        var index = this.listPermissions.indexOf(item);
        if (index > -1) {
            this.listPermissions.splice(index, 1);
        }
    };
    /**
     * This function go to save Mode
     */
    RoleNewComponent.prototype.saveMode = function () {
        //salva i cambiamenti
        var _this = this;
        if (!this.isEqual(this.role, this.copyRole)) {
            if (this.role.name.length == 0) {
                alert('You must write a name of Role, please!');
                this.cloneCopyRole();
                return;
            }
            this.sService.newRole(this.role).subscribe(function (data) {
                if (!data.hasOwnProperty('state')) {
                    data.state = false;
                }
                //push the item into roles
                _this.sService.setRole(data);
                _this.sService.updateListOfRoles();
                //navigate to Settings Roles
                _this.router.navigate(['/backend/settings/roles']);
            });
        }
    };
    RoleNewComponent.prototype.isEqual = function (v, v2) {
        return (v.name == v2.name) && (v.state == v2.state) && (v.permissions.length == v2.permissions.length);
    };
    /**
     * This function clone the Role
     */
    RoleNewComponent.prototype.cloneRole = function () {
        var permissions = [];
        for (var _i = 0, _a = this.role.permissions; _i < _a.length; _i++) {
            var perm = _a[_i];
            permissions.push(perm);
        }
        this.copyRole = Object.assign({}, this.role);
        this.copyRole.permissions = permissions;
    };
    /**
     * This function clone the CopyRole
     */
    RoleNewComponent.prototype.cloneCopyRole = function () {
        var permissions = [];
        for (var _i = 0, _a = this.copyRole.permissions; _i < _a.length; _i++) {
            var perm = _a[_i];
            permissions.push(perm);
        }
        this.role = Object.assign({}, this.copyRole);
        this.role.permissions = permissions;
    };
    return RoleNewComponent;
}());
RoleNewComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'settings-new-role',
        template: __webpack_require__("../../../../../src/plugins/Hardel/Settings/component/NewRole/rolenew.component.html"),
        styles: ['']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__Services_settings_service__["a" /* SettingsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__Services_settings_service__["a" /* SettingsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["d" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["d" /* Router */]) === "function" && _b || Object])
], RoleNewComponent);

var _a, _b;
//# sourceMappingURL=rolenew.component.js.map

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Settings/component/NewUser/usernew.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form\">\n    <div class=\"portlet\">\n        <div class=\"portlet-title\">\n            <div class=\"caption\">\n                <i class=\"fa fa-database\"></i>\n                <span>General Definitions</span>\n            </div>\n            <div class=\"actions\">\n            </div>\n        </div>\n        <div class=\"portlet-body\">\n            <div class=\"portlet-form-body\">\n                <div class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"nome\" class=\"col-md-2 control-label\">Nome</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"nome\" placeholder=\"Nome\" id=\"nome\" [(ngModel)] = \"user.name\" >\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"nome\" class=\"col-md-2 control-label\">Email</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"email\" placeholder=\"Email\" id=\"email\" [(ngModel)] = \"user.email\" >\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"nome\" class=\"col-md-2 control-label\">Password</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"password\" class=\"form-control\" name=\"password\" placeholder=\"Password\" id=\"password\" [(ngModel)] = \"user.password\" >\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"portlet\">\n        <div class=\"portlet-title\">\n            <div class=\"caption\">\n                <i class=\"fa fa-list\"></i>\n                <span>Role</span>\n            </div>\n            <div class=\"actions\">\n                <button class=\"btn cyan\" data-toggle=\"modal\" data-target=\"#addModal\">\n                    <i class=\"fa fa-plus\"></i>\n                    Add\n                </button>\n            </div>\n        </div>\n        <div class=\"portlet-body\">\n            <div class=\"box\">\n                <div class=\"box-header\">\n\n                </div>\n                <div class=\"box-body\">\n                    <div class=\"wrapper\">\n                        <div class=\"row\">\n                            <div class=\"col-sm-12\">\n                                <table class=\"table table-bordered table-striped\" *ngIf=\"user.role !== undefined\">\n                                    <thead>\n                                    <tr>\n                                        <th>\n                                            <a>Nome</a>\n                                        </th>\n                                        <th style=\"width: 50px;\"></th>\n                                    </tr>\n                                    </thead>\n                                    <tbody>\n                                    <tr>\n                                        <td>\n                                            {{user.role.name}}\n                                        </td>\n                                        <td>\n                                            <a class=\"td_orange\" (click)=\"eraseRole(user.role)\"><i class=\"fa fa-window-close-o\"></i></a>\n                                        </td>\n                                    </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-12\">\n            <button class=\"btn orange\" (click)=\"saveMode()\">Save</button>\n            <button class=\"btn red\" (click)=\"resetMode()\">Reset</button>\n        </div>\n    </div>\n    <div id=\"addModal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"addModal\"  aria-hidden=\"true\">\n        <div class=\"modal-dialog\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <div class=\"modal-title\">\n                        Searching For Permission\n                        <button class=\"close\" data-dismiss = \"modal\" aria-label=\"hidden\"><i class=\"fa fa-times\"></i></button>\n                    </div>\n                </div>\n                <div class=\"modal-body\">\n                    <div class=\"row\">\n                        <div class=\"col-md-12\">\n                            <div class=\"form-group flex-group\">\n                                <label class=\"col-md-4\">Name</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control input-sm\" name=\"query\" [(ngModel)]=\"query\" (keyup)=\"filter()\" autocomplete=\"off\">\n                                    <div class=\"suggestions\" *ngIf=\"filteredList.length > 0\">\n                                        <ul>\n                                            <li class=\"suggestion-li\" *ngFor=\"let item of filteredList\">\n                                                <a (click)=\"addRole(item)\">{{item.name}}</a>\n                                            </li>\n                                        </ul>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"modal-footer\">\n                    <div class=\"m-footer\">\n\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</form>"

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Settings/component/NewUser/usernew.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserNewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_settings_service__ = __webpack_require__("../../../../../src/plugins/Hardel/Settings/Services/settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/**
 * Created by hernan on 09/11/2017.
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



var UserNewComponent = (function () {
    function UserNewComponent(nService, router) {
        this.nService = nService;
        this.router = router;
        this.listRole = [];
        this.isEdit = false;
        this.filteredList = [];
        this.query = '';
        this.user = {
            id: -1,
            name: '',
            state: false,
            email: ''
        };
    }
    UserNewComponent.prototype.ngOnInit = function () {
        this.retriveRoles();
    };
    UserNewComponent.prototype.retriveRoles = function () {
        var _this = this;
        this.nService.getRolesFrom().subscribe(function (roles) {
            _this.listRole = roles;
        });
        this.cloneUser();
    };
    /**
     * This function filter permission for research
     */
    UserNewComponent.prototype.filter = function () {
        if (this.query !== "") {
            this.filteredList = this.listRole.filter(function (el) {
                return el.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        }
    };
    /**
     * This function delete Permission from role.permissions
     * @param item
     */
    UserNewComponent.prototype.eraseRole = function (item) {
        // cancella il permesso
        this.listRole.push(item);
        delete this.user.role;
    };
    /**
     * This Function add Permission at the moment to role.permissions
     * @param item
     */
    UserNewComponent.prototype.addRole = function (item) {
        //aggiunge un permesso
        this.filteredList = [];
        this.query = item.name;
        this.user.role = item;
        var index = this.listRole.indexOf(item);
        if (index > -1) {
            this.listRole.splice(index, 1);
        }
    };
    /**
     * This function go to save Mode
     */
    UserNewComponent.prototype.saveMode = function () {
        //salva i cambiamenti
        var _this = this;
        if (!this.isEqual(this.user, this.copyUser)) {
            if (this.user.email.length == 0) {
                alert('You must write a name of Role, please!');
                this.cloneCopyUser();
                return;
            }
            this.nService.newUser(this.user).subscribe(function (data) {
                if (!data.hasOwnProperty('state')) {
                    data.state = false;
                }
                //push the item into roles
                _this.nService.setUser(data);
                _this.nService.updateListOfUsers();
                //navigate to Settings Roles
                _this.router.navigate(['/backend/settings/users']);
            });
        }
    };
    UserNewComponent.prototype.isEqual = function (v, v2) {
        return (v.username == v2.username) && (v.state == v2.state) && (v.name == v2.name);
    };
    /**
     * This function clone the User
     */
    UserNewComponent.prototype.cloneUser = function () {
        var permissions = [];
        if (this.user.role !== undefined) {
            for (var _i = 0, _a = this.user.role.permissions; _i < _a.length; _i++) {
                var perm = _a[_i];
                permissions.push(perm);
            }
            var role = void 0;
            role = Object.assign({}, this.user.role);
            this.copyUser = Object.assign({}, this.user);
            this.copyUser.role = role;
            this.copyUser.role.permissions = permissions;
        }
    };
    /**
     * This function clone the CopyUser
     */
    UserNewComponent.prototype.cloneCopyUser = function () {
        var permissions = [];
        for (var _i = 0, _a = this.copyUser.role.permissions; _i < _a.length; _i++) {
            var perm = _a[_i];
            permissions.push(perm);
        }
        var role;
        role = Object.assign({}, this.copyUser.role);
        this.user = Object.assign({}, this.copyUser);
        this.user.role = role;
        this.user.role.permissions = permissions;
    };
    return UserNewComponent;
}());
UserNewComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'settings-new-user',
        template: __webpack_require__("../../../../../src/plugins/Hardel/Settings/component/NewUser/usernew.component.html"),
        styles: ['']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__Services_settings_service__["a" /* SettingsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__Services_settings_service__["a" /* SettingsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["d" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["d" /* Router */]) === "function" && _b || Object])
], UserNewComponent);

var _a, _b;
//# sourceMappingURL=usernew.component.js.map

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Settings/component/Role/role.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form\" *ngIf=\"notFound == true\">\n    <div class=\"portlet\">\n        <div class=\"portlet-title\">\n            <div class=\"caption\">\n                <i class=\"fa fa-database\"></i>\n                <span>General Definitions</span>\n            </div>\n            <div class=\"actions\">\n                <button class=\"btn darkorange\" (click)=\"editMode()\">\n                    <i class=\"fa fa-edit\"></i>\n                    Edit\n                </button>\n            </div>\n        </div>\n        <div class=\"portlet-body\">\n            <div class=\"portlet-form-body\">\n                <div class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"nome\" class=\"col-md-2 control-label\">Nome</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"nome\" [ngModel] = \"role.name\" placeholder=\"Nome\" id=\"nome\" *ngIf=\"isEdit === false; else editName\" readonly>\n                                    <ng-template #editName>\n                                        <input type=\"text\" class=\"form-control\" name=\"nome\" placeholder=\"Nome\" id=\"nome\" [(ngModel)] = \"role.name\" >\n                                    </ng-template>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"portlet\">\n        <div class=\"portlet-title\">\n            <div class=\"caption\">\n                <i class=\"fa fa-list\"></i>\n                <span>Permissions</span>\n            </div>\n            <div class=\"actions\">\n                <button class=\"btn cyan\" data-toggle=\"modal\" data-target=\"#addModal\" *ngIf=\"isEdit == true\">\n                    <i class=\"fa fa-plus\"></i>\n                    Add\n                </button>\n            </div>\n        </div>\n        <div class=\"portlet-body\">\n            <div class=\"box\">\n                <div class=\"box-header\">\n\n                </div>\n                <div class=\"box-body\">\n                    <div class=\"wrapper\">\n                        <div class=\"row\">\n                            <div class=\"col-sm-12\">\n                                <table class=\"table table-bordered table-striped\">\n                                    <thead>\n                                    <tr>\n                                        <th>\n                                            <a>Nome</a>\n                                        </th>\n                                        <th style=\"width: 50px;\"></th>\n                                    </tr>\n                                    </thead>\n                                    <tbody>\n                                    <tr *ngFor=\"let permission of role.permissions\">\n                                        <td>\n                                            {{permission.name}}\n                                        </td>\n                                        <td>\n                                            <a class=\"td_orange\" (click)=\"erasePermission(permission)\" *ngIf=\"isEdit == true\"><i class=\"fa fa-window-close-o\"></i></a>\n                                        </td>\n                                    </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-12\">\n            <button class=\"btn orange\" (click)=\"saveMode()\">Save</button>\n            <button class=\"btn red\" (click)=\"resetMode()\">Reset</button>\n        </div>\n    </div>\n    <div id=\"addModal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"addModal\"  aria-hidden=\"true\">\n        <div class=\"modal-dialog\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <div class=\"modal-title\">\n                        Searching For Permission \n                        <button class=\"close\" data-dismiss = \"modal\" aria-label=\"hidden\"><i class=\"fa fa-times\"></i></button>\n                    </div>\n                </div>\n                <div class=\"modal-body\">\n                    <div class=\"row\">\n                        <div class=\"col-md-12\">\n                            <div class=\"form-group flex-group\">\n                                <label class=\"col-md-4\">Name</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control input-sm\" name=\"query\" [(ngModel)]=\"query\" (keyup)=\"filter()\" autocomplete=\"off\">\n                                    <div class=\"suggestions\" *ngIf=\"filteredList.length > 0\">\n                                        <ul>\n                                            <li class=\"suggestion-li\" *ngFor=\"let item of filteredList\">\n                                                <a (click)=\"addPermissions(item)\">{{item.name}}</a>\n                                            </li>\n                                        </ul>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"modal-footer\">\n                    <div class=\"m-footer\">\n\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</form>"

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Settings/component/Role/role.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoleComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_settings_service__ = __webpack_require__("../../../../../src/plugins/Hardel/Settings/Services/settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_settings_interfaces__ = __webpack_require__("../../../../../src/plugins/Hardel/Settings/Services/settings.interfaces.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_settings_interfaces___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Services_settings_interfaces__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RoleComponent = (function () {
    function RoleComponent(sService, router, nav) {
        var _this = this;
        this.sService = sService;
        this.router = router;
        this.nav = nav;
        this.listPermissions = [];
        this.isEdit = false;
        this.notFound = false;
        this.filteredList = [];
        this.query = '';
        this.role = {
            id: -2,
            name: '',
            state: false,
            permissions: []
        };
        this.sub = this.router.params.subscribe(function (params) {
            _this.id = +params['id'];
            _this.role = _this.sService.getRoleByProperty('id', _this.id);
            if (_this.role != null) {
                _this.notFound = true;
            }
            else {
                _this.nav.navigate(['/backend/not-found']);
            }
            _this.copyRole = Object.assign({}, _this.role);
        });
    }
    RoleComponent.prototype.ngOnInit = function () {
        this.retrivePermission();
    };
    RoleComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    /**
     * This function pass into edit Mode
     */
    RoleComponent.prototype.editMode = function () {
        //passa in modalità edit
        this.isEdit = !this.isEdit;
    };
    /**
     * This function go to save Mode
     */
    RoleComponent.prototype.saveMode = function () {
        var _this = this;
        //salva i cambiamenti
        if (this.role !== this.copyRole) {
            if (this.role.name.length == 0) {
                alert('You must write a name of Role, please!');
                this.cloneCopyRole();
                return;
            }
            this.sService.saveRole(this.role).subscribe(function (role) {
                _this.role = role;
                _this.retrivePermission();
                _this.editMode();
            });
        }
    };
    /**
     * This function is to get Permission from API
     */
    RoleComponent.prototype.retrivePermission = function () {
        var _this = this;
        this.sService.getPermissionsFrom().subscribe(function (perms) {
            _this.listPermissions = perms;
            if (_this.role != null) {
                _this.role.permissions.forEach(function (item) {
                    var index = -1;
                    for (var i = 0; i < _this.listPermissions.length; i++) {
                        var m = _this.listPermissions[i];
                        if (m.id === item.id && m.name === item.name) {
                            index = i;
                            break;
                        }
                    }
                    if (index > -1) {
                        _this.listPermissions.splice(index, 1);
                    }
                });
            }
        });
        this.cloneRole();
    };
    /**
     * This function reset the Information of Role
     */
    RoleComponent.prototype.resetMode = function () {
        if (this.role !== this.copyRole) {
            if (confirm('Are you sure you don\'t want to save this changement and restore it?')) {
                this.cloneCopyRole();
            }
        }
    };
    /**
     * This Function add Permission at the moment to role.permissions
     * @param item
     */
    RoleComponent.prototype.addPermissions = function (item) {
        //aggiunge un permesso
        this.filteredList = [];
        this.query = item.name;
        this.role.permissions.push(item);
        var index = this.listPermissions.indexOf(item);
        if (index > -1) {
            this.listPermissions.splice(index, 1);
        }
    };
    /**
     * This function delete Permission from role.permissions
     * @param item
     */
    RoleComponent.prototype.erasePermission = function (item) {
        // cancella il permesso
        this.listPermissions.push(item);
        var index = this.role.permissions.indexOf(item);
        if (index > -1) {
            this.role.permissions.splice(index, 1);
        }
    };
    /**
     * This function filter permission for research
     */
    RoleComponent.prototype.filter = function () {
        if (this.query !== "") {
            this.filteredList = this.listPermissions.filter(function (el) {
                return el.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        }
        else {
        }
    };
    /**
     * This function clone the Role
     */
    RoleComponent.prototype.cloneRole = function () {
        if (this.role != null) {
            var permissions = [];
            for (var _i = 0, _a = this.role.permissions; _i < _a.length; _i++) {
                var perm = _a[_i];
                permissions.push(perm);
            }
            this.copyRole = Object.assign({}, this.role);
            this.copyRole.permissions = permissions;
        }
    };
    /**
     * This function clone the CopyRole
     */
    RoleComponent.prototype.cloneCopyRole = function () {
        var permissions = [];
        for (var _i = 0, _a = this.copyRole.permissions; _i < _a.length; _i++) {
            var perm = _a[_i];
            permissions.push(perm);
        }
        this.role = Object.assign({}, this.copyRole);
        this.role.permissions = permissions;
    };
    return RoleComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__Services_settings_interfaces__["Role"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__Services_settings_interfaces__["Role"]) === "function" && _a || Object)
], RoleComponent.prototype, "role", void 0);
RoleComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-role',
        template: __webpack_require__("../../../../../src/plugins/Hardel/Settings/component/Role/role.component.html"),
        styles: ['']
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__Services_settings_service__["a" /* SettingsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__Services_settings_service__["a" /* SettingsService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* Router */]) === "function" && _d || Object])
], RoleComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=role.component.js.map

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Settings/component/Roles/roles.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"tabbable-custom\" *ngIf=\"isRoot === true\">\n    <ul class=\"nav nav-tabs\">\n        <li class=\"active\">\n            <a href=\"#tab_1\" data-toggle=\"tab\"> Roles</a>\n        </li>\n        <li>\n            <a [routerLink]=\"['/backend/settings/users']\" data-toggle=\"tab\"> Users</a>\n        </li>\n    </ul>\n    <div class=\"tab-content\">\n        <div class=\"tab-pane active\" id=\"tab_1\">\n            <div class=\"box\">\n                <div class=\"box-header\">\n\n                </div>\n                <div class=\"box-body\">\n                    <div class=\"wrapper\">\n                        <div class=\"row\">\n                            <div class=\"col-md-8\">\n                                <div class=\"dataTables_length\">\n                                    <label>\n                                        Show\n                                        <select class=\"form-control input-sm\" name=\"example_length\">\n                                            <option value=\"10\">10</option>\n                                        </select>\n                                        entries\n                                    </label>\n                                </div>\n                            </div>\n                            <div class=\"col-md-4\">\n                                <div class=\"dataTables_filter\">\n                                    <label>\n                                        Search:\n                                        <input type=\"search\" class=\"form-control input-sm\">\n                                    </label>\n                                    <a class=\"btn btn-primary\" [routerLink] = \"['/backend/settings/roles/new']\"><i class=\"fa fa-file\"></i> New</a>\n                                    <a class=\"btn btn-danger\" (click)=\"deleteRoles()\"><i class=\"fa fa-times\"></i> Delete</a>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-sm-12\">\n                                <table class=\"table table-bordered table-striped\">\n                                    <thead>\n                                    <tr>\n                                        <th style=\"width: 30px;\"></th>\n                                        <th>\n                                            <a>Nome</a>\n                                        </th>\n                                        <th style=\"width: 50px;\"></th>\n                                    </tr>\n                                    </thead>\n                                    <tbody>\n                                        <tr *ngFor=\"let role of listaRole\">\n                                            <td>\n                                                <input type=\"checkbox\" (change)=\"eventChange($event,role)\" [(ngModel)] = \"role.state\">\n                                            </td>\n                                            <td>\n                                                {{role.name}}\n                                            </td>\n                                            <td>\n                                                <a [routerLink] = \"['/backend/settings/roles',role.id]\"><i class=\"fa fa-edit\" style=\"color:orange; font-size: 16px;\"></i></a>\n                                            </td>\n                                        </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-sm-5\">\n                                <div class=\"dataTables_info\">Showing 1 to 10 of 57 entries</div>\n                            </div>\n                            <div class=\"col-sm-7\">\n                                <div class=\"dataTables_paginate\">\n                                    <ul class=\"pagination\">\n                                        <li class=\"page-item\">\n                                            <a class=\"page-link\" href=\"#\" aria-label=\"Previous\"><span aria-hidden=\"true\">«</span></a>\n                                        </li>\n                                        <li class=\"page-item active\">\n                                            <a class=\"page-link\" href=\"#\">1</a>\n                                        </li>\n                                        <li class=\"page-item\">\n                                            <a class=\"page-link\" href=\"#\">2</a>\n                                        </li>\n                                        <li class=\"page-item\">\n                                            <a class=\"page-link\" href=\"#\" aria-label=\"Next\"><span aria-hidden=\"true\">»</span></a>\n                                        </li>\n                                    </ul>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<router-outlet></router-outlet>"

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Settings/component/Roles/roles.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RolesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_settings_service__ = __webpack_require__("../../../../../src/plugins/Hardel/Settings/Services/settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/**
 * Created by hernan on 30/10/2017.
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



var RolesComponent = (function () {
    function RolesComponent(c_Service, router) {
        var _this = this;
        this.c_Service = c_Service;
        this.router = router;
        this.myRoot = '/backend/settings/roles';
        this.isRoot = false;
        this.listaRoleDelete = [];
        this.router.events.subscribe(function (val) {
            if (val instanceof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* NavigationEnd */]) {
                if (_this.myRoot === val.url) {
                    _this.isRoot = true;
                }
                else {
                    _this.isRoot = false;
                }
            }
        });
        this.retrieveListOfRoles();
        this.c_Service.updateRoles$.subscribe(function () {
            _this.retrieveListOfRoles();
        });
    }
    RolesComponent.prototype.ngOnInit = function () {
    };
    RolesComponent.prototype.retrieveListOfRoles = function () {
        var _this = this;
        if (!this.c_Service.checkRolesExist()) {
            this.c_Service.getRolesFrom().subscribe(function (roles) {
                _this.listaRole = roles;
                _this.listaRole.forEach(function (role) {
                    role.state = false;
                });
                _this.c_Service.setRoles(_this.listaRole);
            });
        }
        else {
            this.listaRole = this.c_Service.getRoles();
            this.listaRole.forEach(function (item) {
                if (!item.hasOwnProperty('state')) {
                    item.state = false;
                }
            });
        }
    };
    /**
     * function to push or splice item into Deleted List of Roles
     * @param ev
     * @param data
     */
    RolesComponent.prototype.eventChange = function (ev, data) {
        if (ev.target.checked) {
            this.listaRoleDelete.push(data);
        }
        else {
            var index = this.listaRoleDelete.indexOf(data);
            if (index > -1) {
                this.listaRoleDelete.splice(index, 1);
            }
        }
    };
    RolesComponent.prototype.deleteRoles = function () {
        var _this = this;
        if (this.listaRoleDelete.length > 0) {
            if (confirm('Do you really want delete this Roles?')) {
                this.c_Service.deleteRoles(this.listaRoleDelete).subscribe(function (data) {
                    _this.listaRoleDelete = [];
                    _this.listaRole = data;
                    _this.c_Service.setRoles(_this.listaRole);
                });
            }
        }
    };
    return RolesComponent;
}());
RolesComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-roles-component',
        template: __webpack_require__("../../../../../src/plugins/Hardel/Settings/component/Roles/roles.component.html"),
        styles: ['']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__Services_settings_service__["a" /* SettingsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__Services_settings_service__["a" /* SettingsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["d" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["d" /* Router */]) === "function" && _b || Object])
], RolesComponent);

var _a, _b;
//# sourceMappingURL=roles.component.js.map

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Settings/component/Users/users.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"tabbable-custom\" *ngIf=\"isRoot === true\">\n    <ul class=\"nav nav-tabs\">\n        <li>\n            <a [routerLink]=\"['/backend/settings/roles']\" data-toggle=\"tab\"> Roles</a>\n        </li>\n        <li class=\"active\">\n            <a  href=\"#tab_1\" data-toggle=\"tab\"> Users</a>\n        </li>\n    </ul>\n    <div class=\"tab-content\">\n        <div class=\"tab-pane active\" id=\"tab_1\">\n            <div class=\"box\">\n                <div class=\"box-header\">\n\n                </div>\n                <div class=\"box-body\">\n                    <div class=\"wrapper\">\n                        <div class=\"row\">\n                            <div class=\"col-md-8\">\n                                <div class=\"dataTables_length\">\n                                    <label>\n                                        Show\n                                        <select class=\"form-control input-sm\" name=\"example_length\">\n                                            <option value=\"10\">10</option>\n                                        </select>\n                                        entries\n                                    </label>\n                                </div>\n                            </div>\n                            <div class=\"col-md-4\">\n                                <div class=\"dataTables_filter\">\n                                    <label>\n                                        Search:\n                                        <input type=\"search\" class=\"form-control input-sm\">\n                                    </label>\n                                    <a class=\"btn btn-primary\" [routerLink] = \"['/backend/settings/users/new']\"><i class=\"fa fa-file\"></i> New</a>\n                                    <a class=\"btn btn-danger\" (click)=\"deleteUsers()\"><i class=\"fa fa-times\"></i> Delete</a>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-sm-12\">\n                                <table class=\"table table-bordered table-striped\">\n                                    <thead>\n                                    <tr>\n                                        <th style=\"width: 30px;\"></th>\n                                        <th>\n                                            <a>Nome</a>\n                                        </th>\n                                        <th>\n                                            <a>Email</a>\n                                        </th>\n                                        <th style=\"width: 50px;\"></th>\n                                    </tr>\n                                    </thead>\n                                    <tbody>\n                                    <tr *ngFor=\"let user of listaUser\">\n                                        <td>\n                                            <input type=\"checkbox\" (change)=\"eventChange($event,user)\" [(ngModel)] = \"user.state\">\n                                        </td>\n                                        <td>\n                                            {{user.name}}\n                                        </td>\n                                        <td>\n                                            {{user.email}}\n                                        </td>\n                                        <td>\n                                            <a [routerLink] = \"['/backend/settings/users',user.id]\"><i class=\"fa fa-edit\" style=\"color:orange; font-size: 16px;\"></i></a>\n                                        </td>\n                                    </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-sm-5\">\n                                <div class=\"dataTables_info\">Showing 1 to 10 of 57 entries</div>\n                            </div>\n                            <div class=\"col-sm-7\">\n                                <div class=\"dataTables_paginate\">\n                                    <ul class=\"pagination\">\n                                        <li class=\"page-item\">\n                                            <a class=\"page-link\" href=\"#\" aria-label=\"Previous\"><span aria-hidden=\"true\">«</span></a>\n                                        </li>\n                                        <li class=\"page-item active\">\n                                            <a class=\"page-link\" href=\"#\">1</a>\n                                        </li>\n                                        <li class=\"page-item\">\n                                            <a class=\"page-link\" href=\"#\">2</a>\n                                        </li>\n                                        <li class=\"page-item\">\n                                            <a class=\"page-link\" href=\"#\" aria-label=\"Next\"><span aria-hidden=\"true\">»</span></a>\n                                        </li>\n                                    </ul>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<router-outlet></router-outlet>"

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Settings/component/Users/users.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_settings_service__ = __webpack_require__("../../../../../src/plugins/Hardel/Settings/Services/settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/**
 * Created by hernan on 09/11/2017.
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



var UsersComponent = (function () {
    function UsersComponent(s_Service, router) {
        var _this = this;
        this.s_Service = s_Service;
        this.router = router;
        this.myRoot = '/backend/settings/users';
        this.isRoot = false;
        this.listaUserDelete = [];
        this.router.events.subscribe(function (val) {
            if (val instanceof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* NavigationEnd */]) {
                if (_this.myRoot === val.url) {
                    _this.isRoot = true;
                }
                else {
                    _this.isRoot = false;
                }
            }
        });
        this.retrieveListOfUsers();
        this.s_Service.updateUsers$.subscribe(function () {
            _this.retrieveListOfUsers();
        });
    }
    UsersComponent.prototype.ngOnInit = function () {
    };
    UsersComponent.prototype.retrieveListOfUsers = function () {
        var _this = this;
        if (!this.s_Service.checkUsersExist()) {
            this.s_Service.getUsersFrom().subscribe(function (users) {
                _this.listaUser = users;
                _this.listaUser.forEach(function (user) {
                    user.state = false;
                });
                _this.s_Service.setUsers(_this.listaUser);
            });
        }
        else {
            this.listaUser = this.s_Service.getUsers();
            this.listaUser.forEach(function (item) {
                if (!item.hasOwnProperty('state')) {
                    item.state = false;
                }
            });
        }
    };
    /**
     * function to push or splice item into Deleted List of Roles
     * @param ev
     * @param data
     */
    UsersComponent.prototype.eventChange = function (ev, data) {
        if (ev.target.checked) {
            this.listaUserDelete.push(data);
        }
        else {
            var index = this.listaUserDelete.indexOf(data);
            if (index > -1) {
                this.listaUserDelete.splice(index, 1);
            }
        }
    };
    UsersComponent.prototype.deleteUsers = function () {
        var _this = this;
        if (this.listaUserDelete.length > 0) {
            if (confirm('Do you really want delete this Roles?')) {
                this.s_Service.deleteUsers(this.listaUserDelete).subscribe(function (data) {
                    _this.listaUserDelete = [];
                    _this.listaUser = data;
                    _this.s_Service.setUsers(_this.listaUser);
                });
            }
        }
    };
    return UsersComponent;
}());
UsersComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'settings-users',
        template: __webpack_require__("../../../../../src/plugins/Hardel/Settings/component/Users/users.component.html"),
        styles: ['']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__Services_settings_service__["a" /* SettingsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__Services_settings_service__["a" /* SettingsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["d" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["d" /* Router */]) === "function" && _b || Object])
], UsersComponent);

var _a, _b;
//# sourceMappingURL=users.component.js.map

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Settings/component/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_component__ = __webpack_require__("../../../../../src/plugins/Hardel/Settings/component/settings.component.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__settings_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Role_role_component__ = __webpack_require__("../../../../../src/plugins/Hardel/Settings/component/Role/role.component.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__Role_role_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Roles_roles_component__ = __webpack_require__("../../../../../src/plugins/Hardel/Settings/component/Roles/roles.component.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__Roles_roles_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__NewRole_rolenew_component__ = __webpack_require__("../../../../../src/plugins/Hardel/Settings/component/NewRole/rolenew.component.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__NewRole_rolenew_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Users_users_component__ = __webpack_require__("../../../../../src/plugins/Hardel/Settings/component/Users/users.component.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_4__Users_users_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__NewUser_usernew_component__ = __webpack_require__("../../../../../src/plugins/Hardel/Settings/component/NewUser/usernew.component.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_5__NewUser_usernew_component__["a"]; });






//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Settings/component/settings.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content-box\">\n    <div class=\"content-header\">\n        <h1>Settings</h1>\n        <breadcrumbs></breadcrumbs>\n    </div>\n    <div class=\"content\">\n        <router-outlet></router-outlet>\n        <div class=\"portlet\" *ngIf=\"isRoot === true\">\n            <div class=\"portlet-title\">\n                <div class=\"caption\">\n                    <i class=\"fa fa-database\"></i>\n                    <span>Overviews</span>\n                </div>\n                <div class=\"actions\">\n                </div>\n            </div>\n            <div class=\"portlet-body\">\n                <div class=\"tiles\">\n                    <a [routerLink]=\"['/backend/settings/users']\">\n                        <div class=\"tile double bg-cyan\">\n                            <div class=\"tile-body\">\n                                <i class=\"fa fa-users fa-6\"></i>\n                            </div>\n                            <div class=\"tile-object\">\n                                <div class=\"name\">\n                                    Users\n                                </div>\n                            </div>\n                        </div>\n                    </a>\n                    <a [routerLink]=\"['/backend/settings/roles']\">\n                        <div class=\"tile bg-orange\">\n                            <div class=\"tile-body\">\n                                    <i class=\"fa fa-list fa-6\"></i>\n                            </div>\n                            <div class=\"tile-object\">\n                                <div class=\"name\">\n                                    Roles\n                                </div>\n                            </div>\n                        </div>\n                    </a>\n                </div>\n            </div>\n        </div>\n\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Settings/component/settings.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
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
    function SettingsComponent(router) {
        var _this = this;
        this.router = router;
        this.myRoot = '/backend/settings';
        this.isRoot = true;
        //trigger the event for the overview
        this.router.events.subscribe(function (val) {
            if (val instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* NavigationEnd */]) {
                if (_this.myRoot === val.url) {
                    _this.isRoot = true;
                }
                else {
                    _this.isRoot = false;
                }
            }
        });
    }
    SettingsComponent.prototype.ngOnInit = function () {
    };
    return SettingsComponent;
}());
SettingsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-settings',
        template: __webpack_require__("../../../../../src/plugins/Hardel/Settings/component/settings.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* Router */]) === "function" && _a || Object])
], SettingsComponent);

var _a;
//# sourceMappingURL=settings.component.js.map

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Settings/settings.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsModule", function() { return SettingsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__settings_routing__ = __webpack_require__("../../../../../src/plugins/Hardel/Settings/settings.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_settings_service__ = __webpack_require__("../../../../../src/plugins/Hardel/Settings/Services/settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_backend_module___ = __webpack_require__("../../../../../src/app/backend-module/index.ts");
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
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_1__settings_routing__["b" /* routing */],
            __WEBPACK_IMPORTED_MODULE_6__app_backend_module___["c" /* BreadCrumbModule */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_2__Services_settings_service__["a" /* SettingsService */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_1__settings_routing__["a" /* routedComponents */]]
    })
], SettingsModule);

//# sourceMappingURL=settings.module.js.map

/***/ }),

/***/ "../../../../../src/plugins/Hardel/Settings/settings.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return routing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routedComponents; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__component__ = __webpack_require__("../../../../../src/plugins/Hardel/Settings/component/index.ts");
/**
 * Created by hernan on 17/10/2017.
 */


var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__component__["d" /* SettingsComponent */], data: { breadcrumb: 'Settings' }, children: [
            { path: 'roles', component: __WEBPACK_IMPORTED_MODULE_1__component__["c" /* RolesComponent */], data: { breadcrumb: 'Roles' }, children: [
                    { path: 'new', component: __WEBPACK_IMPORTED_MODULE_1__component__["b" /* RoleNewComponent */], data: { breadcrumb: 'New Role' } },
                    { path: ':id', component: __WEBPACK_IMPORTED_MODULE_1__component__["a" /* RoleComponent */], data: { breadcrumb: 'Role' } },
                ] },
            { path: 'users', component: __WEBPACK_IMPORTED_MODULE_1__component__["f" /* UsersComponent */], data: { breadcrumb: 'Users' }, children: [
                    { path: 'new', component: __WEBPACK_IMPORTED_MODULE_1__component__["e" /* UserNewComponent */], data: { breadcrumb: 'New User' } },
                ] }
        ] }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["e" /* RouterModule */].forChild(routes);
var routedComponents = [__WEBPACK_IMPORTED_MODULE_1__component__["d" /* SettingsComponent */], __WEBPACK_IMPORTED_MODULE_1__component__["c" /* RolesComponent */], __WEBPACK_IMPORTED_MODULE_1__component__["a" /* RoleComponent */], __WEBPACK_IMPORTED_MODULE_1__component__["b" /* RoleNewComponent */], __WEBPACK_IMPORTED_MODULE_1__component__["f" /* UsersComponent */], __WEBPACK_IMPORTED_MODULE_1__component__["e" /* UserNewComponent */]];
//# sourceMappingURL=settings.routing.js.map

/***/ })

});
//# sourceMappingURL=settings.module.chunk.js.map