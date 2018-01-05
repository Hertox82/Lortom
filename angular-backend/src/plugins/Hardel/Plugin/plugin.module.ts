/**
 * Created by hernan on 17/10/2017.
 */

import {NgModule} from "@angular/core";
import {pluginComponent, routing} from "./plugin.routing";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {BreadCrumbModule} from "@Lortom-Backend/breadcrumbs";
import {UIElementModule} from "@Lortom/app/backend-module/UIElement/uielement.module";
import {PluginService} from "@Lortom/plugins/Hardel/Plugin/Service/plugin.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        routing,
        BreadCrumbModule,
        UIElementModule,
        NgbModule.forRoot()

    ],
    providers: [PluginService],
    declarations:[pluginComponent]
})

export class PluginModule {}