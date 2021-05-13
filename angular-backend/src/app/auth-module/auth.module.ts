import { NgModule, ModuleWithProviders } from '@angular/core';
import { AuthService } from './auth.service';

@NgModule({})
export class AuthModule {
    static forRoot(): ModuleWithProviders<AuthModule> {
        return {
            ngModule: AuthModule,
            providers: [AuthService]
        };
    }
}
