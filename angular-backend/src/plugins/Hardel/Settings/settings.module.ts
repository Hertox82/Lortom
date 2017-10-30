/**
 * Created by hernan on 17/10/2017.
 */


import {NgModule} from "@angular/core";
import {SettingsComponent} from "./component/settings.component";
import {RolesComponent} from "./component/Roles/roles.component";
import {routing,routedComponents} from "./settings.routing";

@NgModule({
    imports:[routing],
    declarations: [routedComponents]
})

export class SettingsModule {}