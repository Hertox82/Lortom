/**
 * Created by hernan on 26/10/2017.
 */


export interface NavbarItem
{
    name : string,
    href : string,
    subMenu : NavbarSubmenu []
}

export interface NavbarSubmenu
{
    name: string,
    href: string
}