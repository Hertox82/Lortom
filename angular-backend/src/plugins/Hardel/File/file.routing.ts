
import {RouterModule, Routes} from '@angular/router';
import {FilesComponent} from './component/Files/files.component';
import {ModuleWithProviders} from '@angular/core';
import {FileComponent} from './component/File/file.component';
import {FileNewComponent} from './component/NewFile/filenew.component';


const routes: Routes = [
    {path: '', component: FilesComponent, data : { breadcrumb : 'Media'}, children: [
        {path: 'new', component: FileNewComponent, data: {breadcrumb: 'New Media'}},
        {path: ':id', component: FileComponent, data: {breadcrumb : 'Edit Media'}}
      ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
