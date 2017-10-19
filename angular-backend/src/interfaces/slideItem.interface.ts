/**
 * Created by hernan on 16/10/2017.
 */

export interface SlideItem {
    name : string;
    href : string;
    icon : string;
    subMenu : SlideSubMenu[]
}

export interface SlideSubMenu
{
    name: string;
    href: string;
}


