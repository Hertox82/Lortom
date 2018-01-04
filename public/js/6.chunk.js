webpackJsonp([6],{

/***/ "./src/plugins/Hardel/Settings/Services/settings.interfaces.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=settings.interfaces.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Settings/Services/settings.service.ts":
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
var http_1 = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
__webpack_require__("./node_modules/rxjs/Rx.js");
var Subject_1 = __webpack_require__("./node_modules/rxjs/Subject.js");
var master_service_1 = __webpack_require__("./src/services/master.service.ts");
var SettingsService = (function (_super) {
    __extends(SettingsService, _super);
    function SettingsService(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this._updateRoles = new Subject_1.Subject();
        _this.updateRoles$ = _this._updateRoles.asObservable();
        _this._updateUsers = new Subject_1.Subject();
        _this.updateUsers$ = _this._updateUsers.asObservable();
        // write the api route for setting
        var urls = [
            { namePath: 'getPermission', path: 'permissions' },
            { namePath: 'getRoles', path: 'roles' },
            { namePath: 'saveRole', path: 'role' },
            { namePath: 'getUsers', path: 'users' },
            { namePath: 'saveUser', path: 'user' }
        ];
        //Add the Api to the ApiManager
        _this.apiManager.addListUrlApi(urls);
        return _this;
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
    SettingsService.prototype.updateRoleInList = function (role) {
        this.updateItemInList(role, 'listOfRoles');
    };
    SettingsService.prototype.updateUserInList = function (user) {
        this.updateItemInList(user, 'listOfUsers');
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
        this.setItem('roles', roles);
        this.listOfRoles = roles;
    };
    /**
     * This function set the Users
     * @param users
     */
    SettingsService.prototype.setUsers = function (users) {
        this.setItem('users', users);
        this.listOfUsers = users;
    };
    /**
     * This function is to set new role into the listOfRoles
     * @param role
     */
    SettingsService.prototype.setRole = function (role) {
        var roles = this.getRoles();
        roles.push(role);
        this.deleteRoleFromCache();
        this.setRoles(roles);
    };
    /**
     * This function is to set new User into the listOfUsers
     * @param user
     */
    SettingsService.prototype.setUser = function (user) {
        var users = this.getUsers();
        users.push(user);
        this.deleteUserFromCache();
        this.setUsers(users);
    };
    /**
     * This function delete listOfRoles from Cache
     */
    SettingsService.prototype.deleteRoleFromCache = function () {
        this.deleteItem('roles', 'listOfRoles');
    };
    /**
     * This function delete listOfUsers from Cache
     */
    SettingsService.prototype.deleteUserFromCache = function () {
        this.deleteItem('users', 'listOfUsers');
    };
    /**
     * This function check if Dataset of Roles exist
     * @returns {boolean}
     */
    SettingsService.prototype.checkRolesExist = function () {
        return this.checkItemExist('roles');
    };
    /**
     * This function check if Dataset of Users exist
     * @returns {boolean}
     */
    SettingsService.prototype.checkUsersExist = function () {
        return this.checkItemExist('users');
    };
    /**
     * This function return Role passing a property
     * @param name
     * @param value
     * @returns {Role}
     */
    SettingsService.prototype.getRoleByProperty = function (name, value) {
        return this.getItemByProperty(name, value, 'roles', 'listOfRoles');
    };
    /**
     * This function return User passing a property
     * @param name
     * @param value
     * @returns {User}
     */
    SettingsService.prototype.getUserByProperty = function (name, value) {
        return this.getItemByProperty(name, value, 'users', 'listOfUsers');
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
     * This function return a Role Array
     * @returns {Role[]}
     */
    SettingsService.prototype.getRoles = function () {
        return this.getItem('roles', 'listOfRoles');
    };
    /**
     * This function return a User Array
     * @returns {User[]}
     */
    SettingsService.prototype.getUsers = function () {
        return this.getItem('users', 'listOfUsers');
    };
    /**
     * This function call API in order to Update the Role
     * @param role
     * @returns {Observable<R>}
     */
    SettingsService.prototype.saveRole = function (role) {
        return this.http.put(this.apiManager.getPathByName('saveRole'), role, this.getOptions())
            .map(function (response) {
            return response.json().role;
        });
    };
    /**
     * This function call API in order to update the User
     * @param user
     * @returns {Observable<R>}
     */
    SettingsService.prototype.saveUser = function (user) {
        return this.http.put(this.apiManager.getPathByName('saveUser'), user, this.getOptions())
            .map(function (response) {
            return response.json().user;
        });
    };
    /**
     * This function call API in order to create new Role
     * @param role
     * @returns {Observable<R>}
     */
    SettingsService.prototype.newRole = function (role) {
        return this.http.post(this.apiManager.getPathByName('saveRole'), role, this.getOptions())
            .map(function (response) {
            return response.json().role;
        });
    };
    /**
     * This function call API in order to create new User
     * @param user
     * @returns {Observable<R>}
     */
    SettingsService.prototype.newUser = function (user) {
        return this.http.post(this.apiManager.getPathByName('saveUser'), user, this.getOptions())
            .map(function (response) {
            return response.json().user;
        });
    };
    /**
     * This function call API in order to delete Array of Role
     * @param roles
     * @returns {Observable<R>}
     */
    SettingsService.prototype.deleteRoles = function (roles) {
        return this.http.put(this.apiManager.getPathByName('getRoles'), roles, this.getOptions())
            .map(function (response) {
            return response.json().roles;
        });
    };
    /**
     * This function call API in order to delete Array of User
     * @param users
     * @returns {Observable<R>}
     */
    SettingsService.prototype.deleteUsers = function (users) {
        return this.http.put(this.apiManager.getPathByName('getUsers'), users, this.getOptions())
            .map(function (response) {
            return response.json().roles;
        });
    };
    /**
     * This function emit an Event
     */
    SettingsService.prototype.updateListOfRoles = function () {
        this._updateRoles.next();
    };
    /**
     * This function emit an Event
     */
    SettingsService.prototype.updateListOfUsers = function () {
        this._updateUsers.next();
    };
    return SettingsService;
}(master_service_1.MasterService));
SettingsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], SettingsService);
exports.SettingsService = SettingsService;
var _a;
//# sourceMappingURL=settings.service.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Settings/component/NewRole/rolenew.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form\">\n    <div class=\"portlet\">\n        <div class=\"portlet-title\">\n            <div class=\"caption\">\n                <i class=\"fa fa-database\"></i>\n                <span>General Definitions</span>\n            </div>\n            <div class=\"actions\">\n            </div>\n        </div>\n        <div class=\"portlet-body\">\n            <div class=\"portlet-form-body\">\n                <div class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"nome\" class=\"col-md-2 control-label\">Nome</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"nome\" placeholder=\"Nome\" id=\"nome\" [(ngModel)] = \"role.name\" >\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"portlet\">\n        <div class=\"portlet-title\">\n            <div class=\"caption\">\n                <i class=\"fa fa-list\"></i>\n                <span>Permissions</span>\n            </div>\n            <div class=\"actions\">\n                <button class=\"btn cyan\" data-toggle=\"modal\" data-target=\"#addModal\">\n                    <i class=\"fa fa-plus\"></i>\n                    Add\n                </button>\n            </div>\n        </div>\n        <div class=\"portlet-body\">\n            <div class=\"box\">\n                <div class=\"box-header\">\n\n                </div>\n                <div class=\"box-body\">\n                    <div class=\"wrapper\">\n                        <div class=\"row\">\n                            <div class=\"col-sm-12\">\n                                <table class=\"table table-bordered table-striped\" *ngIf=\"role.permissions.length > 0\">\n                                    <thead>\n                                    <tr>\n                                        <th>\n                                            <a>Nome</a>\n                                        </th>\n                                        <th style=\"width: 50px;\"></th>\n                                    </tr>\n                                    </thead>\n                                    <tbody>\n                                    <tr *ngFor=\"let permission of role.permissions\">\n                                        <td>\n                                            {{permission.name}}\n                                        </td>\n                                        <td>\n                                            <a class=\"td_orange\" (click)=\"erasePermission(permission)\" *ngIf=\"isEdit == true\"><i class=\"fa fa-window-close-o\"></i></a>\n                                        </td>\n                                    </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-12\">\n            <button class=\"btn orange\" (click)=\"saveMode()\">Save</button>\n            <button class=\"btn red\" (click)=\"resetMode()\">Reset</button>\n        </div>\n    </div>\n    <div id=\"addModal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"addModal\"  aria-hidden=\"true\">\n        <div class=\"modal-dialog\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <div class=\"modal-title\">\n                        Searching For Permission\n                        <button class=\"close\" data-dismiss = \"modal\" aria-label=\"hidden\"><i class=\"fa fa-times\"></i></button>\n                    </div>\n                </div>\n                <div class=\"modal-body\">\n                    <div class=\"row\">\n                        <div class=\"col-md-12\">\n                            <div class=\"form-group flex-group\">\n                                <label class=\"col-md-4\">Name</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control input-sm\" name=\"query\" [(ngModel)]=\"query\" (keyup)=\"filter()\" autocomplete=\"off\">\n                                    <div class=\"suggestions\" *ngIf=\"filteredList.length > 0\">\n                                        <ul>\n                                            <li class=\"suggestion-li\" *ngFor=\"let item of filteredList\">\n                                                <a (click)=\"addPermissions(item)\">{{item.name}}</a>\n                                            </li>\n                                        </ul>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"modal-footer\">\n                    <div class=\"m-footer\">\n\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</form>"

/***/ }),

/***/ "./src/plugins/Hardel/Settings/component/NewRole/rolenew.component.ts":
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
var settings_service_1 = __webpack_require__("./src/plugins/Hardel/Settings/Services/settings.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
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
            check: false,
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
    core_1.Component({
        selector: 'settings-new-role',
        template: __webpack_require__("./src/plugins/Hardel/Settings/component/NewRole/rolenew.component.html"),
        styles: ['']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof settings_service_1.SettingsService !== "undefined" && settings_service_1.SettingsService) === "function" && _a || Object, typeof (_b = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _b || Object])
], RoleNewComponent);
exports.RoleNewComponent = RoleNewComponent;
var _a, _b;
//# sourceMappingURL=rolenew.component.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Settings/component/NewUser/usernew.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form\">\n    <div class=\"portlet\">\n        <div class=\"portlet-title\">\n            <div class=\"caption\">\n                <i class=\"fa fa-database\"></i>\n                <span>General Definitions</span>\n            </div>\n            <div class=\"actions\">\n            </div>\n        </div>\n        <div class=\"portlet-body\">\n            <div class=\"portlet-form-body\">\n                <div class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"nome\" class=\"col-md-2 control-label\">Nome</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"nome\" placeholder=\"Nome\" id=\"nome\" [(ngModel)] = \"user.name\" >\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"nome\" class=\"col-md-2 control-label\">Email</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"email\" placeholder=\"Email\" id=\"email\" [(ngModel)] = \"user.email\" >\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"nome\" class=\"col-md-2 control-label\">Password</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"password\" class=\"form-control\" name=\"password\" placeholder=\"Password\" id=\"password\" [(ngModel)] = \"user.password\" >\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"portlet\">\n        <div class=\"portlet-title\">\n            <div class=\"caption\">\n                <i class=\"fa fa-list\"></i>\n                <span>Role</span>\n            </div>\n            <div class=\"actions\">\n                <button class=\"btn cyan\" data-toggle=\"modal\" data-target=\"#addModal\">\n                    <i class=\"fa fa-plus\"></i>\n                    Add\n                </button>\n            </div>\n        </div>\n        <div class=\"portlet-body\">\n            <div class=\"box\">\n                <div class=\"box-header\">\n\n                </div>\n                <div class=\"box-body\">\n                    <div class=\"wrapper\">\n                        <div class=\"row\">\n                            <div class=\"col-sm-12\">\n                                <table class=\"table table-bordered table-striped\" *ngIf=\"user.role !== undefined\">\n                                    <thead>\n                                    <tr>\n                                        <th>\n                                            <a>Nome</a>\n                                        </th>\n                                        <th style=\"width: 50px;\"></th>\n                                    </tr>\n                                    </thead>\n                                    <tbody>\n                                    <tr>\n                                        <td>\n                                            {{user.role.name}}\n                                        </td>\n                                        <td>\n                                            <a class=\"td_orange\" (click)=\"eraseRole(user.role)\"><i class=\"fa fa-window-close-o\"></i></a>\n                                        </td>\n                                    </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-12\">\n            <button class=\"btn orange\" (click)=\"saveMode()\">Save</button>\n            <button class=\"btn red\" (click)=\"resetMode()\">Reset</button>\n        </div>\n    </div>\n    <div id=\"addModal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"addModal\"  aria-hidden=\"true\">\n        <div class=\"modal-dialog\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <div class=\"modal-title\">\n                        Searching For Permission\n                        <button class=\"close\" data-dismiss = \"modal\" aria-label=\"hidden\"><i class=\"fa fa-times\"></i></button>\n                    </div>\n                </div>\n                <div class=\"modal-body\">\n                    <div class=\"row\">\n                        <div class=\"col-md-12\">\n                            <div class=\"form-group flex-group\">\n                                <label class=\"col-md-4\">Name</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control input-sm\" name=\"query\" [(ngModel)]=\"query\" (keyup)=\"filter()\" autocomplete=\"off\">\n                                    <div class=\"suggestions\" *ngIf=\"filteredList.length > 0\">\n                                        <ul>\n                                            <li class=\"suggestion-li\" *ngFor=\"let item of filteredList\">\n                                                <a (click)=\"addRole(item)\">{{item.name}}</a>\n                                            </li>\n                                        </ul>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"modal-footer\">\n                    <div class=\"m-footer\">\n\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</form>"

/***/ }),

/***/ "./src/plugins/Hardel/Settings/component/NewUser/usernew.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var settings_service_1 = __webpack_require__("./src/plugins/Hardel/Settings/Services/settings.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var UserNewComponent = (function () {
    function UserNewComponent(nService, router) {
        this.nService = nService;
        this.router = router;
        this.listRole = [];
        this.filteredList = [];
        this.query = '';
        this.user = {
            id: -1,
            name: '',
            check: false,
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
     * This function delete Role from user.role
     * @param item
     */
    UserNewComponent.prototype.eraseRole = function (item) {
        // cancella il permesso
        this.listRole.push(item);
        delete this.user.role;
    };
    /**
     * This Function add Role at the moment to user.role
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
        return (v.email == v2.email) && (v.state == v2.state) && (v.name == v2.name);
    };
    /**
     * This function clone the User
     */
    UserNewComponent.prototype.cloneUser = function () {
        var permissions = [];
        this.copyUser = Object.assign({}, this.user);
        if (this.user.role !== undefined) {
            for (var _i = 0, _a = this.user.role.permissions; _i < _a.length; _i++) {
                var perm = _a[_i];
                permissions.push(perm);
            }
            var role = void 0;
            role = Object.assign({}, this.user.role);
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
    core_1.Component({
        selector: 'settings-new-user',
        template: __webpack_require__("./src/plugins/Hardel/Settings/component/NewUser/usernew.component.html"),
        styles: ['']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof settings_service_1.SettingsService !== "undefined" && settings_service_1.SettingsService) === "function" && _a || Object, typeof (_b = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _b || Object])
], UserNewComponent);
exports.UserNewComponent = UserNewComponent;
var _a, _b;
//# sourceMappingURL=usernew.component.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Settings/component/Role/role.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form\" *ngIf=\"notFound == true\">\n    <div class=\"portlet\">\n        <div class=\"portlet-title\">\n            <div class=\"caption\">\n                <i class=\"fa fa-database\"></i>\n                <span>General Definitions</span>\n            </div>\n            <div class=\"actions\">\n                <button class=\"btn darkorange\" (click)=\"editMode()\">\n                    <i class=\"fa fa-edit\"></i>\n                    Edit\n                </button>\n            </div>\n        </div>\n        <div class=\"portlet-body\">\n            <div class=\"portlet-form-body\">\n                <div class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"col-12\">\n                            <div class=\"form-group flex-group\">\n                                <label for=\"nome\" class=\"col-md-2 control-label\">Nome</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control\" name=\"nome\" [ngModel] = \"role.name\" placeholder=\"Nome\" id=\"nome\" *ngIf=\"isEdit === false; else editName\" readonly>\n                                    <ng-template #editName>\n                                        <input type=\"text\" class=\"form-control\" name=\"nome\" placeholder=\"Nome\" id=\"nome\" [(ngModel)] = \"role.name\" >\n                                    </ng-template>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"portlet\">\n        <div class=\"portlet-title\">\n            <div class=\"caption\">\n                <i class=\"fa fa-list\"></i>\n                <span>Permissions</span>\n            </div>\n            <div class=\"actions\">\n                <button class=\"btn cyan\" data-toggle=\"modal\" data-target=\"#addModal\" *ngIf=\"isEdit == true\">\n                    <i class=\"fa fa-plus\"></i>\n                    Add\n                </button>\n            </div>\n        </div>\n        <div class=\"portlet-body\">\n            <div class=\"box\">\n                <div class=\"box-header\">\n\n                </div>\n                <div class=\"box-body\">\n                    <div class=\"wrapper\">\n                        <div class=\"row\">\n                            <div class=\"col-sm-12\">\n                                <table class=\"table table-bordered table-striped\">\n                                    <thead>\n                                    <tr>\n                                        <th>\n                                            <a>Nome</a>\n                                        </th>\n                                        <th style=\"width: 50px;\"></th>\n                                    </tr>\n                                    </thead>\n                                    <tbody>\n                                    <tr *ngFor=\"let permission of role.permissions\">\n                                        <td>\n                                            {{permission.name}}\n                                        </td>\n                                        <td>\n                                            <a class=\"td_orange\" (click)=\"erasePermission(permission)\" *ngIf=\"isEdit == true\"><i class=\"fa fa-window-close-o\"></i></a>\n                                        </td>\n                                    </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-12\">\n            <button class=\"btn orange\" (click)=\"saveMode()\">Save</button>\n            <button class=\"btn red\" (click)=\"resetMode()\">Reset</button>\n        </div>\n    </div>\n    <div id=\"addModal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"addModal\"  aria-hidden=\"true\">\n        <div class=\"modal-dialog\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <div class=\"modal-title\">\n                        Searching For Permission \n                        <button class=\"close\" data-dismiss = \"modal\" aria-label=\"hidden\"><i class=\"fa fa-times\"></i></button>\n                    </div>\n                </div>\n                <div class=\"modal-body\">\n                    <div class=\"row\">\n                        <div class=\"col-md-12\">\n                            <div class=\"form-group flex-group\">\n                                <label class=\"col-md-4\">Name</label>\n                                <div class=\"col-md-4\">\n                                    <input type=\"text\" class=\"form-control input-sm\" name=\"query\" [(ngModel)]=\"query\" (keyup)=\"filter()\" autocomplete=\"off\">\n                                    <div class=\"suggestions\" *ngIf=\"filteredList.length > 0\">\n                                        <ul>\n                                            <li class=\"suggestion-li\" *ngFor=\"let item of filteredList\">\n                                                <a (click)=\"addPermissions(item)\">{{item.name}}</a>\n                                            </li>\n                                        </ul>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"modal-footer\">\n                    <div class=\"m-footer\">\n\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</form>"

/***/ }),

/***/ "./src/plugins/Hardel/Settings/component/Role/role.component.ts":
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
var settings_service_1 = __webpack_require__("./src/plugins/Hardel/Settings/Services/settings.service.ts");
var settings_interfaces_1 = __webpack_require__("./src/plugins/Hardel/Settings/Services/settings.interfaces.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
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
            check: false,
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
                _this.sService.updateRoleInList(_this.role);
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
    core_1.Input(),
    __metadata("design:type", typeof (_a = typeof settings_interfaces_1.Role !== "undefined" && settings_interfaces_1.Role) === "function" && _a || Object)
], RoleComponent.prototype, "role", void 0);
RoleComponent = __decorate([
    core_1.Component({
        selector: 'app-role',
        template: __webpack_require__("./src/plugins/Hardel/Settings/component/Role/role.component.html"),
        styles: ['']
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof settings_service_1.SettingsService !== "undefined" && settings_service_1.SettingsService) === "function" && _b || Object, typeof (_c = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _c || Object, typeof (_d = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _d || Object])
], RoleComponent);
exports.RoleComponent = RoleComponent;
var _a, _b, _c, _d;
//# sourceMappingURL=role.component.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Settings/component/Roles/roles.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"tabbable-custom\" *ngIf=\"isRoot === true\">\n    <ul class=\"nav nav-tabs\">\n        <li class=\"active\">\n            <a href=\"#tab_1\" data-toggle=\"tab\"> Roles</a>\n        </li>\n        <li>\n            <a [routerLink]=\"['/backend/settings/users']\" data-toggle=\"tab\"> Users</a>\n        </li>\n    </ul>\n    <div class=\"tab-content\">\n        <div class=\"tab-pane active\" id=\"tab_1\">\n            <div class=\"box\">\n                <div class=\"box-header\">\n\n                </div>\n                <div class=\"box-body\">\n                    <div class=\"wrapper\">\n                        <div class=\"row\">\n                            <div class=\"col-md-8\">\n                                <lt-entry-pagination\n                                [entry]=\"'50-5'\"\n                                (onEntry)=\"onPerPage($event)\"\n                                >\n                                </lt-entry-pagination>\n                            </div>\n                            <div class=\"col-md-4\">\n                                <div class=\"dataTables_filter\">\n                                    <label>\n                                        Search:\n                                        <input type=\"search\" class=\"form-control input-sm\">\n                                    </label>\n                                    <a class=\"btn btn-primary\" [routerLink] = \"['/backend/settings/roles/new']\"><i class=\"fa fa-file\"></i> New</a>\n                                    <a class=\"btn btn-danger\" (click)=\"deleteRoles()\"><i class=\"fa fa-times\"></i> Delete</a>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-sm-12\">\n                                <table class=\"table table-bordered table-striped\">\n                                    <thead>\n                                    <tr>\n                                        <th style=\"width: 30px;\"></th>\n                                        <th>\n                                            <a>Nome</a>\n                                        </th>\n                                        <th style=\"width: 50px;\"></th>\n                                    </tr>\n                                    </thead>\n                                    <tbody>\n                                        <tr *ngFor=\"let role of listToShow\">\n                                            <td>\n                                                <input type=\"checkbox\" (change)=\"eventChange($event,role)\" [(ngModel)] = \"role.check\">\n                                            </td>\n                                            <td>\n                                                {{role.name}}\n                                            </td>\n                                            <td>\n                                                <a [routerLink] = \"['/backend/settings/roles',role.id]\"><i class=\"fa fa-edit\" style=\"color:orange; font-size: 16px;\"></i></a>\n                                            </td>\n                                        </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                        <lt-pagination\n                            [pagesToShow]=\"3\"\n                            [perPage]=\"perPage\"\n                            [count]=\"listaRole.length\"\n                            [loading]=\"false\"\n                            [page]=\"actualPage\"\n                            (goNext)=\"onNext($event)\"\n                            (goPage)=\"onPage($event)\"\n                            (goPrev)=\"onPrev()\"\n                        ></lt-pagination>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/plugins/Hardel/Settings/component/Roles/roles.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by hernan on 30/10/2017.
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
var settings_service_1 = __webpack_require__("./src/plugins/Hardel/Settings/Services/settings.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var list_component_1 = __webpack_require__("./src/model/list.component.ts");
var RolesComponent = (function (_super) {
    __extends(RolesComponent, _super);
    function RolesComponent(c_Service, router) {
        var _this = _super.call(this) || this;
        _this.c_Service = c_Service;
        _this.router = router;
        _this.listaRole = [];
        _this.myRoot = '/backend/settings/roles';
        _this.isRoot = false;
        _this.onComponentInit({
            name: 'c_Service',
            permission: 'Hardel.Settings.Roles',
            upd: 'updateRoles$'
        }, 'router', 'retrieveListOfRoles');
        return _this;
    }
    RolesComponent.prototype.ngOnInit = function () { };
    RolesComponent.prototype.retrieveListOfRoles = function () {
        this.retrieveListOfData({
            name: 'c_Service',
            getData: 'getRoles',
            setData: 'setRoles',
            callApi: 'getRolesFrom',
            check: 'checkRolesExist'
        }, 'listaRole');
    };
    /**
     * function to push or splice item into Deleted List of Roles
     * @param ev
     * @param data
     */
    RolesComponent.prototype.eventChange = function (ev, data) {
        this.eventChangeData(ev, data);
    };
    RolesComponent.prototype.deleteRoles = function () {
        this.deleteData({
            name: 'c_Service',
            setData: 'setRoles',
            delFn: 'deleteRoles'
        }, 'listaRole', "Do you really want delete this Roles?");
    };
    return RolesComponent;
}(list_component_1.ListComponent));
RolesComponent = __decorate([
    core_1.Component({
        selector: 'app-roles-component',
        template: __webpack_require__("./src/plugins/Hardel/Settings/component/Roles/roles.component.html"),
        styles: ['']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof settings_service_1.SettingsService !== "undefined" && settings_service_1.SettingsService) === "function" && _a || Object, typeof (_b = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _b || Object])
], RolesComponent);
exports.RolesComponent = RolesComponent;
var _a, _b;
//# sourceMappingURL=roles.component.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Settings/component/User/user.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form\" *ngIf=\"notFound == true\">\n<div class=\"portlet\">\n    <div class=\"portlet-title\">\n        <div class=\"caption\">\n            <i class=\"fa fa-database\"></i>\n            <span>General Definitions</span>\n        </div>\n        <div class=\"actions\">\n            <button class=\"btn darkorange\" (click)=\"editMode()\">\n                <i class=\"fa fa-edit\"></i>\n                Edit\n            </button>\n        </div>\n    </div>\n    <div class=\"portlet-body\">\n        <div class=\"portlet-form-body\">\n            <div class=\"container\">\n                <div class=\"row\">\n                    <div class=\"col-12\">\n                        <div class=\"form-group flex-group\">\n                            <label for=\"nome\" class=\"col-md-2 control-label\">Nome</label>\n                            <div class=\"col-md-4\">\n                                <input type=\"text\" class=\"form-control\" name=\"nome\" [ngModel] = \"user.name\" placeholder=\"Nome\" id=\"nome\" *ngIf=\"isEdit === false; else editName\" readonly>\n                                <ng-template #editName>\n                                    <input type=\"text\" class=\"form-control\" name=\"nome\" placeholder=\"Nome\" id=\"nome\" [(ngModel)] = \"user.name\" >\n                                </ng-template>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"col-12\">\n                        <div class=\"form-group flex-group\">\n                            <label for=\"nome\" class=\"col-md-2 control-label\">Email</label>\n                            <div class=\"col-md-4\">\n                                <input type=\"text\" class=\"form-control\" name=\"email\" [ngModel] = \"user.email\" placeholder=\"Nome\" id=\"email\" readonly>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<div class=\"portlet\">\n    <div class=\"portlet-title\">\n        <div class=\"caption\">\n            <i class=\"fa fa-list\"></i>\n            <span>Role</span>\n        </div>\n        <div class=\"actions\">\n            <button class=\"btn cyan\" data-toggle=\"modal\" data-target=\"#addModal\" *ngIf=\"isEdit == true\">\n                <i class=\"fa fa-plus\"></i>\n                Add\n            </button>\n        </div>\n    </div>\n    <div class=\"portlet-body\">\n        <div class=\"box\">\n            <div class=\"box-header\">\n\n            </div>\n            <div class=\"box-body\">\n                <div class=\"wrapper\">\n                    <div class=\"row\">\n                        <div class=\"col-sm-12\">\n                            <table class=\"table table-bordered table-striped\" *ngIf=\"user.role !== undefined\">\n                                <thead>\n                                <tr>\n                                    <th>\n                                        <a>Nome</a>\n                                    </th>\n                                    <th style=\"width: 50px;\"></th>\n                                </tr>\n                                </thead>\n                                <tbody>\n                                <tr>\n                                    <td>\n                                        {{user.role.name}}\n                                    </td>\n                                    <td>\n                                        <a *ngIf=\"isEdit == true\" class=\"td_orange\" (click)=\"eraseRole(user.role)\"><i class=\"fa fa-window-close-o\"></i></a>\n                                    </td>\n                                </tr>\n                                </tbody>\n                            </table>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<div class=\"row\">\n    <div class=\"col-12\">\n        <button class=\"btn orange\" (click)=\"saveMode()\">Save</button>\n        <button class=\"btn red\" (click)=\"resetMode()\">Reset</button>\n    </div>\n</div>\n<div id=\"addModal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"addModal\"  aria-hidden=\"true\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <div class=\"modal-title\">\n                    Searching For Permission\n                    <button class=\"close\" data-dismiss = \"modal\" aria-label=\"hidden\"><i class=\"fa fa-times\"></i></button>\n                </div>\n            </div>\n            <div class=\"modal-body\">\n                <div class=\"row\">\n                    <div class=\"col-md-12\">\n                        <div class=\"form-group flex-group\">\n                            <label class=\"col-md-4\">Name</label>\n                            <div class=\"col-md-4\">\n                                <input type=\"text\" class=\"form-control input-sm\" name=\"query\" [(ngModel)]=\"query\" (keyup)=\"filter()\" autocomplete=\"off\">\n                                <div class=\"suggestions\" *ngIf=\"filteredList.length > 0\">\n                                    <ul>\n                                        <li class=\"suggestion-li\" *ngFor=\"let item of filteredList\">\n                                            <a (click)=\"addRole(item)\">{{item.name}}</a>\n                                        </li>\n                                    </ul>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"modal-footer\">\n                <div class=\"m-footer\">\n\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n</form>"

/***/ }),

/***/ "./src/plugins/Hardel/Settings/component/User/user.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by hernan on 10/11/2017.
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
var settings_interfaces_1 = __webpack_require__("./src/plugins/Hardel/Settings/Services/settings.interfaces.ts");
var settings_service_1 = __webpack_require__("./src/plugins/Hardel/Settings/Services/settings.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var UserComponent = (function () {
    function UserComponent(sService, router, nav) {
        var _this = this;
        this.sService = sService;
        this.router = router;
        this.nav = nav;
        this.listRoles = [];
        this.isEdit = false;
        this.notFound = false;
        this.filteredList = [];
        this.query = '';
        this.user = {
            id: -2,
            name: '',
            email: '',
            check: false,
            role: null
        };
        this.sub = this.router.params.subscribe(function (params) {
            _this.id = +params['id'];
            _this.user = _this.sService.getUserByProperty('id', _this.id);
            if (_this.user != null) {
                _this.notFound = true;
            }
            else {
                _this.nav.navigate(['/backend/not-found']);
            }
            _this.cloneUser();
        });
    }
    UserComponent.prototype.ngOnInit = function () {
        this.retriveRoles();
    };
    UserComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    /**
     * This function pass into edit Mode
     */
    UserComponent.prototype.editMode = function () {
        //passa in modalità edit
        this.isEdit = !this.isEdit;
    };
    /**
     * This function go to save Mode
     */
    UserComponent.prototype.saveMode = function () {
        var _this = this;
        //salva i cambiamenti
        if (this.user !== this.copyUser) {
            if (this.user.email.length == 0) {
                alert('You must write an email of User, please!');
                this.cloneCopyUser();
                return;
            }
            this.sService.saveUser(this.user).subscribe(function (user) {
                _this.user = user;
                _this.retriveRoles();
                _this.sService.updateUserInList(_this.user);
                _this.editMode();
            });
        }
    };
    /**
     * This function is to get Permission from API
     */
    UserComponent.prototype.retriveRoles = function () {
        var _this = this;
        this.sService.getRolesFrom().subscribe(function (roles) {
            _this.listRoles = roles;
            var index = _this.listRoles.indexOf(_this.user.role);
            if (index > -1) {
                _this.listRoles.splice(index, 1);
            }
        });
        this.cloneUser();
    };
    /**
     * This function reset the Information of Role
     */
    UserComponent.prototype.resetMode = function () {
        if (this.isEqual(this.user, this.copyUser)) {
            if (confirm('Are you sure you don\'t want to save this changement and restore it?')) {
                this.cloneCopyUser();
            }
        }
    };
    UserComponent.prototype.isEqual = function (v, v2) {
        return (v.email == v2.email) && (v.state == v2.state) && (v.name == v2.name);
    };
    /**
     * This function delete Role from user.role
     * @param item
     */
    UserComponent.prototype.eraseRole = function (item) {
        // cancella il permesso
        this.listRoles.push(item);
        delete this.user.role;
    };
    /**
     * This Function add Role at the moment to user.role
     * @param item
     */
    UserComponent.prototype.addRole = function (item) {
        //aggiunge un permesso
        this.filteredList = [];
        this.query = item.name;
        this.user.role = item;
        var index = this.listRoles.indexOf(item);
        if (index > -1) {
            this.listRoles.splice(index, 1);
        }
    };
    /**
     * This function filter permission for research
     */
    UserComponent.prototype.filter = function () {
        if (this.query !== "") {
            this.filteredList = this.listRoles.filter(function (el) {
                return el.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        }
    };
    /**
     * This function clone the User
     */
    UserComponent.prototype.cloneUser = function () {
        var permissions = [];
        this.copyUser = Object.assign({}, this.user);
        if (this.user.role !== undefined) {
            for (var _i = 0, _a = this.user.role.permissions; _i < _a.length; _i++) {
                var perm = _a[_i];
                permissions.push(perm);
            }
            var role = void 0;
            role = Object.assign({}, this.user.role);
            this.copyUser.role = role;
            this.copyUser.role.permissions = permissions;
        }
    };
    /**
     * This function clone the CopyUser
     */
    UserComponent.prototype.cloneCopyUser = function () {
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
    return UserComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", typeof (_a = typeof settings_interfaces_1.User !== "undefined" && settings_interfaces_1.User) === "function" && _a || Object)
], UserComponent.prototype, "user", void 0);
UserComponent = __decorate([
    core_1.Component({
        selector: 'settings-user',
        template: __webpack_require__("./src/plugins/Hardel/Settings/component/User/user.component.html"),
        styles: ['']
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof settings_service_1.SettingsService !== "undefined" && settings_service_1.SettingsService) === "function" && _b || Object, typeof (_c = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _c || Object, typeof (_d = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _d || Object])
], UserComponent);
exports.UserComponent = UserComponent;
var _a, _b, _c, _d;
//# sourceMappingURL=user.component.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Settings/component/Users/users.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"tabbable-custom\" *ngIf=\"isRoot === true\">\n    <ul class=\"nav nav-tabs\">\n        <li>\n            <a [routerLink]=\"['/backend/settings/roles']\" data-toggle=\"tab\"> Roles</a>\n        </li>\n        <li class=\"active\">\n            <a  href=\"#tab_1\" data-toggle=\"tab\"> Users</a>\n        </li>\n    </ul>\n    <div class=\"tab-content\">\n        <div class=\"tab-pane active\" id=\"tab_1\">\n            <div class=\"box\">\n                <div class=\"box-header\">\n\n                </div>\n                <div class=\"box-body\">\n                    <div class=\"wrapper\">\n                        <div class=\"row\">\n                            <div class=\"col-md-8\">\n                               <lt-entry-pagination\n                               [entry]=\"'50-5'\"\n                               (onEntry)=\"onPerPage($event)\"\n                               >\n                               </lt-entry-pagination>\n                            </div>\n                            <div class=\"col-md-4\">\n                                <div class=\"dataTables_filter\">\n                                    <label>\n                                        Search:\n                                        <input type=\"search\" class=\"form-control input-sm\">\n                                    </label>\n                                    <a class=\"btn btn-primary\" [routerLink] = \"['/backend/settings/users/new']\"><i class=\"fa fa-file\"></i> New</a>\n                                    <a class=\"btn btn-danger\" (click)=\"deleteUsers()\"><i class=\"fa fa-times\"></i> Delete</a>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-sm-12\">\n                                <table class=\"table table-bordered table-striped\">\n                                    <thead>\n                                    <tr>\n                                        <th style=\"width: 30px;\"></th>\n                                        <th>\n                                            <a>Nome</a>\n                                        </th>\n                                        <th>\n                                            <a>Email</a>\n                                        </th>\n                                        <th style=\"width: 50px;\"></th>\n                                    </tr>\n                                    </thead>\n                                    <tbody>\n                                    <tr *ngFor=\"let user of listToShow\">\n                                        <td>\n                                            <input type=\"checkbox\" (change)=\"eventChange($event,user)\" [(ngModel)] = \"user.check\">\n                                        </td>\n                                        <td>\n                                            {{user.name}}\n                                        </td>\n                                        <td>\n                                            {{user.email}}\n                                        </td>\n                                        <td>\n                                            <a [routerLink] = \"['/backend/settings/users',user.id]\"><i class=\"fa fa-edit\" style=\"color:orange; font-size: 16px;\"></i></a>\n                                        </td>\n                                    </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                        <lt-pagination\n                            [pagesToShow]=\"3\"\n                            [perPage]=\"perPage\"\n                            [count]=\"listaUser.length\"\n                            [loading]=\"false\"\n                            [page]=\"actualPage\"\n                            (goNext)=\"onNext($event)\"\n                            (goPage)=\"onPage($event)\"\n                            (goPrev)=\"onPrev()\"\n                        ></lt-pagination>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/plugins/Hardel/Settings/component/Users/users.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by hernan on 09/11/2017.
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
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var list_component_1 = __webpack_require__("./src/model/list.component.ts");
var settings_service_1 = __webpack_require__("./src/plugins/Hardel/Settings/Services/settings.service.ts");
var UsersComponent = (function (_super) {
    __extends(UsersComponent, _super);
    function UsersComponent(s_Service, router) {
        var _this = _super.call(this) || this;
        _this.s_Service = s_Service;
        _this.router = router;
        _this.listaUser = [];
        _this.myRoot = '/backend/settings/users';
        _this.isRoot = false;
        _this.onComponentInit({
            name: 's_Service',
            permission: 'Hardel.Settings.Users',
            upd: 'updateUsers$'
        }, 'router', 'retrieveListOfUsers');
        return _this;
    }
    UsersComponent.prototype.ngOnInit = function () { };
    UsersComponent.prototype.retrieveListOfUsers = function () {
        this.retrieveListOfData({
            name: 's_Service',
            getData: 'getUsers',
            setData: 'setUsers',
            callApi: 'getUsersFrom',
            check: 'checkUsersExist'
        }, 'listaUser');
    };
    /**
     * function to push or splice item into Deleted List of Roles
     * @param ev
     * @param data
     */
    UsersComponent.prototype.eventChange = function (ev, data) {
        this.eventChangeData(ev, data);
    };
    UsersComponent.prototype.deleteUsers = function () {
        this.deleteData({
            name: 's_Service',
            setData: 'setUsers',
            delFn: 'deleteUsers'
        }, 'listaUser', "Do you really want delete this Users?");
    };
    return UsersComponent;
}(list_component_1.ListComponent));
UsersComponent = __decorate([
    core_1.Component({
        selector: 'settings-users',
        template: __webpack_require__("./src/plugins/Hardel/Settings/component/Users/users.component.html"),
        styles: ['']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof settings_service_1.SettingsService !== "undefined" && settings_service_1.SettingsService) === "function" && _a || Object, typeof (_b = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _b || Object])
], UsersComponent);
exports.UsersComponent = UsersComponent;
var _a, _b;
//# sourceMappingURL=users.component.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Settings/component/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var settings_component_1 = __webpack_require__("./src/plugins/Hardel/Settings/component/settings.component.ts");
exports.SettingsComponent = settings_component_1.SettingsComponent;
var role_component_1 = __webpack_require__("./src/plugins/Hardel/Settings/component/Role/role.component.ts");
exports.RoleComponent = role_component_1.RoleComponent;
var roles_component_1 = __webpack_require__("./src/plugins/Hardel/Settings/component/Roles/roles.component.ts");
exports.RolesComponent = roles_component_1.RolesComponent;
var rolenew_component_1 = __webpack_require__("./src/plugins/Hardel/Settings/component/NewRole/rolenew.component.ts");
exports.RoleNewComponent = rolenew_component_1.RoleNewComponent;
var users_component_1 = __webpack_require__("./src/plugins/Hardel/Settings/component/Users/users.component.ts");
exports.UsersComponent = users_component_1.UsersComponent;
var usernew_component_1 = __webpack_require__("./src/plugins/Hardel/Settings/component/NewUser/usernew.component.ts");
exports.UserNewComponent = usernew_component_1.UserNewComponent;
var user_component_1 = __webpack_require__("./src/plugins/Hardel/Settings/component/User/user.component.ts");
exports.UserComponent = user_component_1.UserComponent;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Settings/component/settings.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content-box\">\n    <div class=\"content-header\">\n        <h1>Settings</h1>\n        <breadcrumbs></breadcrumbs>\n    </div>\n    <div class=\"content\">\n        <router-outlet></router-outlet>\n        <div class=\"portlet\" *ngIf=\"isRoot === true\">\n            <div class=\"portlet-title\">\n                <div class=\"caption\">\n                    <i class=\"fa fa-database\"></i>\n                    <span>Overviews</span>\n                </div>\n                <div class=\"actions\">\n                </div>\n            </div>\n            <div class=\"portlet-body\">\n                <div class=\"tiles\">\n                    <a [routerLink]=\"['/backend/settings/users']\">\n                        <div class=\"tile double bg-cyan\">\n                            <div class=\"tile-body\">\n                                <i class=\"fa fa-users fa-6\"></i>\n                            </div>\n                            <div class=\"tile-object\">\n                                <div class=\"name\">\n                                    Users\n                                </div>\n                            </div>\n                        </div>\n                    </a>\n                    <a [routerLink]=\"['/backend/settings/roles']\">\n                        <div class=\"tile bg-orange\">\n                            <div class=\"tile-body\">\n                                    <i class=\"fa fa-list fa-6\"></i>\n                            </div>\n                            <div class=\"tile-object\">\n                                <div class=\"name\">\n                                    Roles\n                                </div>\n                            </div>\n                        </div>\n                    </a>\n                </div>\n            </div>\n        </div>\n\n    </div>\n</div>"

/***/ }),

/***/ "./src/plugins/Hardel/Settings/component/settings.component.ts":
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
var settings_service_1 = __webpack_require__("./src/plugins/Hardel/Settings/Services/settings.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var SettingsComponent = (function () {
    function SettingsComponent(router, service) {
        var _this = this;
        this.router = router;
        this.service = service;
        this.myRoot = '/backend/settings';
        if (!this.service.hasPermissions('Hardel.Settings')) {
            this.router.navigate(['/backend/dashboard']);
        }
        this.isRoot = true;
        //trigger the event for the overview
        this.router.events.subscribe(function (val) {
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
    SettingsComponent.prototype.ngOnInit = function () {
    };
    return SettingsComponent;
}());
SettingsComponent = __decorate([
    core_1.Component({
        selector: 'app-settings',
        template: __webpack_require__("./src/plugins/Hardel/Settings/component/settings.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, typeof (_b = typeof settings_service_1.SettingsService !== "undefined" && settings_service_1.SettingsService) === "function" && _b || Object])
], SettingsComponent);
exports.SettingsComponent = SettingsComponent;
var _a, _b;
//# sourceMappingURL=settings.component.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Settings/settings.module.ts":
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
var settings_routing_1 = __webpack_require__("./src/plugins/Hardel/Settings/settings.routing.ts");
var settings_service_1 = __webpack_require__("./src/plugins/Hardel/Settings/Services/settings.service.ts");
var common_1 = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
var _1 = __webpack_require__("./src/app/backend-module/index.ts");
var uielement_module_1 = __webpack_require__("./src/app/backend-module/UIElement/uielement.module.ts");
var SettingsModule = (function () {
    function SettingsModule() {
    }
    return SettingsModule;
}());
SettingsModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            settings_routing_1.routing,
            _1.BreadCrumbModule,
            uielement_module_1.UIElementModule
        ],
        providers: [settings_service_1.SettingsService],
        declarations: [settings_routing_1.routedComponents]
    })
], SettingsModule);
exports.SettingsModule = SettingsModule;
//# sourceMappingURL=settings.module.js.map

/***/ }),

/***/ "./src/plugins/Hardel/Settings/settings.routing.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by hernan on 17/10/2017.
 */
var router_1 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var component_1 = __webpack_require__("./src/plugins/Hardel/Settings/component/index.ts");
var routes = [
    { path: '', component: component_1.SettingsComponent, data: { breadcrumb: 'Settings' }, children: [
            { path: 'roles', component: component_1.RolesComponent, data: { breadcrumb: 'Roles' }, children: [
                    { path: 'new', component: component_1.RoleNewComponent, data: { breadcrumb: 'New Role' } },
                    { path: ':id', component: component_1.RoleComponent, data: { breadcrumb: 'Role' } },
                ] },
            { path: 'users', component: component_1.UsersComponent, data: { breadcrumb: 'Users' }, children: [
                    { path: 'new', component: component_1.UserNewComponent, data: { breadcrumb: 'New User' } },
                    { path: ':id', component: component_1.UserComponent, data: { breadcrumb: 'User' } }
                ] }
        ] }
];
exports.routing = router_1.RouterModule.forChild(routes);
exports.routedComponents = [component_1.SettingsComponent, component_1.RolesComponent, component_1.RoleComponent, component_1.RoleNewComponent, component_1.UsersComponent, component_1.UserNewComponent, component_1.UserComponent];
//# sourceMappingURL=settings.routing.js.map

/***/ })

});
//# sourceMappingURL=6.chunk.js.map