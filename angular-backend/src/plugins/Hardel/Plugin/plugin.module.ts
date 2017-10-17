/**
 * Created by hernan on 17/10/2017.
 */

import {NgModule} from "@angular/core";
import {PluginComponent} from "./component/plugin.component";
import {routing} from "./plugin.routing";
@NgModule({
    imports: [routing],
    declarations:[PluginComponent]
})

export class PluginModule {}