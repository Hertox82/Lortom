

import {NavbarComponent, NavbarItemComponent} from './navbar';
import {MenuItemsComponent, MenuItemComponent, SubMenuItemComponent} from './menu-items';
import {LoginComponent, LogoutComponent} from './login';
import {UserModelComponent, UserSideComponent} from './user-module/';
import {NotFoundComponent} from './notfoundpage';

export {BreadCrumbModule, BreadCrumbsComponent} from './breadcrumbs';
export {EditorModule, EditorComponent} from './Editor';
export {UserModule} from './user-module';

export const BackendImportComponent = [
    NavbarComponent,
    NavbarItemComponent,
    MenuItemsComponent,
    MenuItemComponent,
    SubMenuItemComponent,
    LoginComponent,
    LogoutComponent,
    NotFoundComponent
];

export const BackendExportComponent = [
    NavbarComponent,
    MenuItemsComponent,
    LoginComponent,
    LogoutComponent,
    UserSideComponent,
    UserModelComponent,
    NotFoundComponent,
];
