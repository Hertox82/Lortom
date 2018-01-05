import { NgModule } from '@angular/core';
import {ProvaComponent} from "./component/prova.component";
import {routing} from "./prova.routing";


@NgModule({
    imports: [routing],
    declarations: [
        ProvaComponent
    ],
})

export class ProvaModule {}