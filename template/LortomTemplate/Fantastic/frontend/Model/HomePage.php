<?php

namespace LortomTemplate\Model;

use Plugins\Hardel\Website\Model\LortomComponent;

/**
 * Created by PhpStorm.
 * User: hernan
 * Date: 01/12/2017
 * Time: 14:47
 */

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
}