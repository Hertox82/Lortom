import {Component, OnInit} from "@angular/core";
import {NavbarItem} from "./public_api";

@Component({
    selector : 'app-navbar',
    templateUrl : './navbar.component.html',
    styleUrls : ['./navbar.component.css']
})
export class NavbarComponent implements OnInit
{
    navbarItems : NavbarItem [];
    constructor(){
        this.navbarItems = [
            {name : 'fa fa-envelope', href: '', subMenu: []},
            {name : 'fa fa-bell', href: '', subMenu: []},
            {name : 'fa fa-cogs', href: '/backend/settings', subMenu: []},
            {name : 'fa fa-user', href: '', subMenu: [
                {name: 'Edit My Profile', href:'/backend/profile/edit'},
                {name: 'Logout', href: '/backend/logout'}
            ]}
        ];
    }
    ngOnInit(){}
}



