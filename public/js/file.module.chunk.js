webpackJsonp(["file.module"],{

/***/ "./src/plugins/Hardel/File/component/File/file.component.css":
/***/ (function(module, exports) {

module.exports = "\n\n.file-dnd img {\n    width: 340px;\n}"

/***/ }),

/***/ "./src/plugins/Hardel/File/component/File/file.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content-box\">\n   <!-- <div class=\"content-header\">\n        <h1>Media</h1>\n        <breadcrumbs></breadcrumbs>\n    </div> -->\n    <div class=\"content\">\n        <form class=\"form\" *ngIf=\"notFound == false\">\n            <div class=\"portlet\">\n                <div class=\"portlet-title\">\n                    <div class=\"caption\">\n                        <i class=\"fa fa-database\"></i>\n                        <span>General Definitions</span>\n                    </div>\n                    <div class=\"actions\">\n                        <button class=\"btn darkorange\" (click)=\"editMode()\">\n                            <i class=\"fa fa-edit\"></i>\n                            Edit\n                        </button>\n                    </div>\n                </div>\n                <div class=\"portlet-body\">\n                    <div class=\"portlet-form-body\">\n                        <div class=\"container\">\n                            <div class=\"row\">\n                                <div class=\"col-12\">\n                                    <div class=\"form-group flex-group\">\n                                        <label for=\"nome\" class=\"col-md-2 control-label\">Nome</label>\n                                        <div class=\"col-md-4\">\n                                            <input type=\"text\" class=\"form-control\" name=\"nome\" [ngModel] = \"cFile.file.name\" placeholder=\"Nome\" id=\"nome\" *ngIf=\"isEdit === false; else editName\" readonly>\n                                            <ng-template #editName>\n                                                <input type=\"text\" class=\"form-control\" name=\"nome\" placeholder=\"Nome\" id=\"nome\" [(ngModel)] = \"cFile.file.name\" >\n                                            </ng-template>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"col-12\">\n                                    <div class=\"form-group flex-group\">\n                                        <label for=\"nome\" class=\"col-md-2 control-label\">Immagine</label>\n                                        <div class=\"col-md-4 file-dnd\">\n                                            <img src=\"{{cFile.file.img}}\" alt=\"{{cFile.file.name}}\">\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-12\">\n                    <button class=\"btn orange\" (click)=\"saveEdit()\">Save</button>\n                    <button class=\"btn red\" >Reset</button>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>"

/***/ }),

/***/ "./src/plugins/Hardel/File/component/File/file.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by hernan on 07/11/2018.
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
var files_services_1 = __webpack_require__("./src/plugins/Hardel/File/Services/files.services.ts");
var FileComponent = (function () {
    function FileComponent(sFileSer, router, nav) {
        var _this = this;
        this.sFileSer = sFileSer;
        this.router = router;
        this.nav = nav;
        this.notFound = false;
        this.isEdit = false;
        this.sub = this.router.params.subscribe(function (params) {
            _this.id = +params['id'];
            _this.cFile = _this.sFileSer.getFilesById(_this.id);
            _this.cloneFile();
        });
    }
    FileComponent.prototype.ngOnInit = function () { };
    /**
     * This function clone the file
     */
    FileComponent.prototype.cloneFile = function () {
        this.cFileClone = Object.assign({}, this.cFile);
        this.cFileClone.file = Object.assign({}, this.cFile.file);
        if (this.cFile.ListObj !== undefined) {
            this.cFileClone.ListObj = [];
            for (var i = 0; i < this.cFile.ListObj.length; i++) {
                this.cFileClone.ListObj.push(this.cFile.ListObj[i]);
            }
        }
    };
    /**
     * This function clone the copyFile
     */
    FileComponent.prototype.cloneCopyFile = function () {
        this.cFile = Object.assign({}, this.cFileClone);
        this.cFile.file = Object.assign({}, this.cFileClone.file);
        if (this.cFileClone.ListObj !== undefined) {
            this.cFile.ListObj = [];
            for (var i = 0; i < this.cFileClone.ListObj.length; i++) {
                this.cFile.ListObj.push(this.cFileClone.ListObj[i]);
            }
        }
    };
    FileComponent.prototype.editMode = function () {
        this.isEdit = !this.isEdit;
    };
    /**
     * this function edit the File
     */
    FileComponent.prototype.saveEdit = function () {
        var _this = this;
        if (this.cFile.file.name !== this.cFileClone.file.name) {
            // send via API the modification
            if (this.cFile.file.name.length === 0) {
                alert('You must write a File Name, please!');
                this.cloneCopyFile();
                return;
            }
            this.sFileSer.editFile(this.cFile).subscribe(function (file) {
                _this.cFile = file;
                _this.cloneFile();
                _this.sFileSer.updateFileInList(_this.cFile);
                _this.editMode();
            });
        }
    };
    FileComponent = __decorate([
        core_1.Component({
            selector: 'app-file-edit',
            template: __webpack_require__("./src/plugins/Hardel/File/component/File/file.component.html"),
            styles: [__webpack_require__("./src/plugins/Hardel/File/component/File/file.component.css")]
        }),
        __metadata("design:paramtypes", [files_services_1.FilesServices, router_1.ActivatedRoute, router_1.Router])
    ], FileComponent);
    return FileComponent;
}());
exports.FileComponent = FileComponent;


/***/ }),

/***/ "./src/plugins/Hardel/File/component/Files/files.component.css":
/***/ (function(module, exports) {

module.exports = ".box-file {\n    width: 150px;\n    height: 150px;\n    margin-top: 10px;\n    margin-right: 20px;\n    display: inline;\n    cursor: pointer;\n    position: relative;\n}\n\n\n.box-file img {\n    width: 150px;\n    height: 150px;\n    margin-bottom:10px;\n}\n\n\n.box-file .delete {\n    position:absolute;\n    top:-80px;\n    right: -15px;\n    color:white;\n    text-decoration: none;\n    cursor: pointer;\n}"

/***/ }),

/***/ "./src/plugins/Hardel/File/component/Files/files.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content-box\">\n    <div class=\"content-header\">\n        <h1>Media</h1>\n       <ng-template #bread></ng-template>\n    </div>\n    <div class=\"tabbable-custom\" *ngIf=\"isRoot === true\">\n            <ul class=\"nav nav-tabs\">\n                <li class=\"active\">\n                    <a href=\"#tab_1\" data-toggle=\"tab\"> Media</a>\n                </li>\n            </ul>\n            <div class=\"tab-content\">\n                <div class=\"tab-pane active\" id=\"tab_1\">\n                    <div class=\"box\">\n                        <div class=\"box-body\">\n                            <div class=\"wrapper\">\n                                <div class=\"row\">\n                                    <div class=\"col-md-8\">\n                                        <a class=\"btn btn-primary\" [routerLink]=\"['/backend/file/new']\"><i class=\"fa fa-file\"></i> New Media</a>\n                                    </div>\n                                </div>\n                                <div class=\"row\">\n                                    <div class=\"col-md-12\">\n                                        <div class=\"content\">\n                                            <div class=\"box-file\" *ngFor=\"let file of listOfFile\">\n                                                <a [routerLink] = \"['/backend/file/',file.file.id]\">\n                                                    <img src=\"{{file.file.img}}\" alt=\"{{file.file.name}}\"> \n                                                </a>\n                                                <a class=\"btn btn-danger delete\" data-toggle=\"buttons\" (click)=\"deleteFile(file)\"><i class=\"fa fa-times\"></i></a>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n   \n</div>\n\n<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/plugins/Hardel/File/component/Files/files.component.ts":
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
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var files_services_1 = __webpack_require__("./src/plugins/Hardel/File/Services/files.services.ts");
var breadcrumbs_1 = __webpack_require__("./src/app/backend-module/breadcrumbs/index.ts");
var FilesComponent = (function () {
    function FilesComponent(fserv, actRoute, rt, resolv) {
        var _this = this;
        this.fserv = fserv;
        this.actRoute = actRoute;
        this.rt = rt;
        this.resolv = resolv;
        this.myRoot = '/backend/file';
        this.listOfFile = [];
        this.isRoot = true;
        this.rt.events.forEach(function (event) {
            if (event instanceof router_1.NavigationEnd) {
                _this.navEnd = event;
            }
        });
        this.sub = this.rt.events.subscribe(function (val) {
            if (val instanceof router_1.NavigationEnd) {
                // this.br.setBreadCrumbs(val,this.actRoute.root);
                if (_this.myRoot === val.url) {
                    _this.isRoot = true;
                }
                else {
                    _this.isRoot = false;
                }
                _this.loadComponent();
            }
        });
    }
    FilesComponent.prototype.ngAfterViewInit = function () {
        this.loadComponent();
    };
    /**
     * This function load dynamically the Breadcrumb component
     */
    FilesComponent.prototype.loadComponent = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.breadCmp !== undefined) {
                var breadComp = _this.resolv.resolveComponentFactory(breadcrumbs_1.BreadCrumbsComponent);
                _this.breadCmp.clear();
                var breadRef = _this.breadCmp.createComponent(breadComp).instance;
                breadRef.setBreadCrumbs(_this.navEnd, _this.actRoute.root);
            }
        });
    };
    FilesComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    FilesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.fserv.getFilesFrom().subscribe(function (res) {
            _this.listOfFile = res;
            _this.fserv.setFiles(res);
        });
    };
    FilesComponent.prototype.editFile = function (file) {
        console.log(file);
    };
    FilesComponent.prototype.deleteFile = function (file) {
        var _this = this;
        // call Api in order to delete references from Database and Server
        // when response come, delete file from listOfArray
        this.fserv.deleteFile(file).subscribe(function (response) {
            _this.listOfFile = response;
            _this.fserv.deleteFileFromCache();
            _this.fserv.setFiles(response);
        });
    };
    __decorate([
        core_1.ViewChild('bread', { read: core_1.ViewContainerRef }),
        __metadata("design:type", core_1.ViewContainerRef)
    ], FilesComponent.prototype, "breadCmp", void 0);
    FilesComponent = __decorate([
        core_1.Component({
            selector: 'app-files',
            template: __webpack_require__("./src/plugins/Hardel/File/component/Files/files.component.html"),
            styles: [__webpack_require__("./src/plugins/Hardel/File/component/Files/files.component.css")]
        }),
        __metadata("design:paramtypes", [files_services_1.FilesServices,
            router_1.ActivatedRoute,
            router_1.Router,
            core_1.ComponentFactoryResolver])
    ], FilesComponent);
    return FilesComponent;
}());
exports.FilesComponent = FilesComponent;


/***/ }),

/***/ "./src/plugins/Hardel/File/component/NewFile/filenew.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/plugins/Hardel/File/component/NewFile/filenew.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"portlet\">\n    <div class=\"portlet-title\">\n        <div class=\"caption\">\n            <i class=\"fa fa-database\"></i>\n            <span>General Definitions</span>\n        </div>\n        <div class=\"actions\">\n            <a class=\"btn btn-success white\" role=\"button\">Save</a>\n        </div>\n    </div>\n    <div class=\"portlet-body\">\n        <div class=\"portlet-form-body\">\n            <div class=\"container\">\n                <div class=\"row\">\n                    <div class=\"col-md-12\">\n                        <lt-filednd\n                        (uploadFile)=\"updateFile($event)\"\n                        (deletedFile)=\"deletedFile($event)\"\n                        [listOfFile]=\"listOfFile\"\n                        ></lt-filednd>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/plugins/Hardel/File/component/NewFile/filenew.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Hernan
 * 15-11-2018
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
var files_services_1 = __webpack_require__("./src/plugins/Hardel/File/Services/files.services.ts");
var FileNewComponent = (function () {
    function FileNewComponent(srvFile) {
        this.srvFile = srvFile;
        this.listOfFile = [];
    }
    FileNewComponent.prototype.ngOnInit = function () { };
    FileNewComponent.prototype.updateFile = function (file) {
        var _this = this;
        this.srvFile.saveFile(file[0].file).subscribe(function (response) {
            console.log(response);
            _this.srvFile.setFile(response);
        });
    };
    FileNewComponent.prototype.deletedFile = function (files) {
        console.log('delete file');
        console.log(files);
    };
    FileNewComponent = __decorate([
        core_1.Component({
            selector: 'app-file-new',
            template: __webpack_require__("./src/plugins/Hardel/File/component/NewFile/filenew.component.html"),
            styles: [__webpack_require__("./src/plugins/Hardel/File/component/NewFile/filenew.component.css")]
        }),
        __metadata("design:paramtypes", [files_services_1.FilesServices])
    ], FileNewComponent);
    return FileNewComponent;
}());
exports.FileNewComponent = FileNewComponent;


/***/ }),

/***/ "./src/plugins/Hardel/File/file.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var files_component_1 = __webpack_require__("./src/plugins/Hardel/File/component/Files/files.component.ts");
var file_routing_1 = __webpack_require__("./src/plugins/Hardel/File/file.routing.ts");
var breadcrumbs_1 = __webpack_require__("./src/app/backend-module/breadcrumbs/index.ts");
var common_1 = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
var file_component_1 = __webpack_require__("./src/plugins/Hardel/File/component/File/file.component.ts");
var files_services_1 = __webpack_require__("./src/plugins/Hardel/File/Services/files.services.ts");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var filenew_component_1 = __webpack_require__("./src/plugins/Hardel/File/component/NewFile/filenew.component.ts");
var lt_drag_and_drop_1 = __webpack_require__("./node_modules/lt-drag-and-drop/esm5/lt-drag-and-drop.js");
var FileModule = (function () {
    function FileModule() {
    }
    FileModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                file_routing_1.routing,
                breadcrumbs_1.BreadCrumbModule,
                lt_drag_and_drop_1.LtFiledndModule
            ],
            entryComponents: [
                breadcrumbs_1.BreadCrumbsComponent
            ],
            providers: [
                files_services_1.FilesServices
            ],
            declarations: [
                files_component_1.FilesComponent,
                file_component_1.FileComponent,
                filenew_component_1.FileNewComponent
            ]
        })
    ], FileModule);
    return FileModule;
}());
exports.FileModule = FileModule;


/***/ }),

/***/ "./src/plugins/Hardel/File/file.routing.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var files_component_1 = __webpack_require__("./src/plugins/Hardel/File/component/Files/files.component.ts");
var file_component_1 = __webpack_require__("./src/plugins/Hardel/File/component/File/file.component.ts");
var filenew_component_1 = __webpack_require__("./src/plugins/Hardel/File/component/NewFile/filenew.component.ts");
var routes = [
    { path: '', component: files_component_1.FilesComponent, data: { breadcrumb: 'Media' }, children: [
            { path: 'new', component: filenew_component_1.FileNewComponent, data: { breadcrumb: 'New Media' } },
            { path: ':id', component: file_component_1.FileComponent, data: { breadcrumb: 'Edit Media' } }
        ]
    }
];
exports.routing = router_1.RouterModule.forChild(routes);


/***/ })

});
//# sourceMappingURL=file.module.chunk.js.map