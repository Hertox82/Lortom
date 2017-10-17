/**
 * Created by hernan on 17/10/2017.
 */

import { NgModule } from '@angular/core';
import {DashBoardComponent} from "./component/dashboard.component";
import {routing} from "./dashboard.routing";


@NgModule({
    imports: [routing],
    declarations: [
        DashBoardComponent
    ],
})

export class DashBoardModule {}



