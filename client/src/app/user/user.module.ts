import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
    { path: '', component: UserComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule
    ],
    declarations: [
    	UserComponent
    	],
    exports: [
        RouterModule
    ]
})
export class UserModule {  }