import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {LoginComponent, LogoutComponent} from './backend-module/login';
import {UserModelComponent} from './backend-module/user-module';
import {NotFoundComponent} from './backend-module/notfoundpage';

const routes: Routes = [
       {path: 'backend', redirectTo: 'backend/dashboard', pathMatch: 'full'},
              {path: 'backend/login', component: LoginComponent},
              {path: 'backend/logout', component: LogoutComponent},
              {path: 'backend/profile/edit', component : UserModelComponent },
              {path: 'backend/not-found', component: NotFoundComponent},
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
