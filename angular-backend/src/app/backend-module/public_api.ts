

import {NavbarComponent,NavbarItemComponent} from "./navbar";
import {MenuItemsComponent,MenuItemComponent,SubMenuItemComponent} from "./menu-items";
import {LoginComponent,LogoutComponent} from "./login";
import {UserModelComponent,UserSideComponent} from "./user-module/";

export {BreadCrumbModule,BreadCrumbsComponent} from "./breadcrumbs";
export {UserModule} from "./user-module";

export const BackendImportComponent = [
    NavbarComponent,
    NavbarItemComponent,
    MenuItemsComponent,
    MenuItemComponent,
    SubMenuItemComponent,
    LoginComponent,
    LogoutComponent,
];

export const BackendExportComponent = [
    NavbarComponent,
    MenuItemsComponent,
    LoginComponent,
    LogoutComponent,
    UserSideComponent,
    UserModelComponent,
];
