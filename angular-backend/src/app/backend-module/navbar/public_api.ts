

export interface NavbarSubmenu
{
    name: string,
    href: string
}

export interface NavbarItem
{
    name : string,
    href : string,
    subMenu : NavbarSubmenu []
}
