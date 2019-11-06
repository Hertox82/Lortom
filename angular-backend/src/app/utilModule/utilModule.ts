import { ModuleWithProviders, NgModule } from '@angular/core';
import { UtilService } from './util-service';

@NgModule()
export class UtilModule {
    static forRoot(): ModuleWithProviders  {
        return {
            ngModule: UtilModule,
            providers: [UtilService]
        };
    }
}
