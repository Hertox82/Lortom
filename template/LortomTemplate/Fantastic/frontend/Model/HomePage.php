<?php

/**
 * User: hernan
 * Date: 01/12/2017
 * Time: 14:47
 */

namespace LortomTemplate\Model;

use Plugins\Hardel\Website\Model\LortomComponent;
use Plugins\Hardel\Website\Model\LortomMenu;
use Plugins\Hardel\Website\Model\LortomPages;

class HomePage
{
    public static function topBanner($data,$idComponent)
    {
        $LComponent = LortomComponent::find($idComponent);

        $variable = $LComponent->getVariableFromAppearance();

        $lista = [];
        foreach ($variable as $v)
        {
            if($v == 'topLogo') {
                $lista[$v] = './images/logo.png';
            }
            else if($v == 'topImg') {
                $lista[$v] = './images/foglia-pasticche.png';
            }
        }

        return $lista;

    }

    public static function navBar($data,$idComponent)
    {
        $LMenu = LortomMenu::where([['idParent','_root'],['idPage','!=',null]])->get();

        $lista = [];
        foreach ($LMenu as $m){

            $label = $m->name;
            $Page = LortomPages::find($m->idPage);
            $select = ($Page->id === $data['id']) ? :false;
            $href = $Page->slug;

            $lista [] = ['href'=> $href, 'label' => $label, 'selected' => $select];
        }

        return ['menuList' => $lista];
    }
}