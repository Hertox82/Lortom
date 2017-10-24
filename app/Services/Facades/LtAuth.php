<?php
/**
 * Created by PhpStorm.
 * User: hernan
 * Date: 24/10/2017
 * Time: 13:00
 */

namespace App\Services\Facades;

use Illuminate\Support\Facades\Facade;

class LtAuth extends Facade
{

    protected static function getFacadeAccessor()
    {
        return 'ltAuth';
    }
}