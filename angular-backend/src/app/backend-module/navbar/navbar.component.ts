import {Component, OnInit} from '@angular/core';
import {NavbarItem} from './public_api';
import { AuthService } from '@Lortom/app/auth-module/auth.service';

@Component({
    selector : 'app-navbar',
    templateUrl : './navbar.component.html',
    styles : ['']
})
export class NavbarComponent implements OnInit {
    navbarItems: NavbarItem [];
    navbarItemsDelete: NavbarItem [] = [];
    constructor(private sMenu: AuthService) {
        this.navbarItems = [
            {name : 'fa fa-envelope', href: '', subMenu: [], permission: ''},
            {name : 'fa fa-bell', href: '', subMenu: [], permission : ''},
            {name : 'fa fa-cogs', href: '/backend/settings', subMenu: [], permission: 'Hardel.Settings'},
            {name : 'fa fa-user', href: '', subMenu: [
                {name: 'Edit My Profile', href: '/backend/profile/edit'},
                {name: 'Logout', href: '/backend/logout'}
            ], permission: ''}
        ];

        this.navbarItems.forEach((nav: NavbarItem) => {
            if (nav.permission.length > 0) {
                if (!sMenu.hasPermission(nav.permission)) {
                    this.navbarItemsDelete.push(nav);
                }
            }
        });

        this.navbarItemsDelete.forEach((nav: NavbarItem) => {
           const index = this.navbarItems.indexOf(nav);

           if (index > -1) {
               this.navbarItems.splice(index, 1);
           }
        });
    }
    ngOnInit() {}
}
