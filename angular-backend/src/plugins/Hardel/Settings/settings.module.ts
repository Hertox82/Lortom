/**
 * Created by hernan on 17/10/2017.
 */


import {NgModule} from "@angular/core";
import {SettingsComponent} from "./component/settings.component";
import {routing} from "./settings.routing";

@NgModule({
    imports:[routing],
    declarations: [SettingsComponent]
})

export class SettingsModule {}