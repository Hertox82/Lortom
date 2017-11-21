<?php
/**
 * User: hernan
 * Date: 16/11/2017
 * Time: 09:15
 */

namespace Plugins\Hardel\Website\Model;


use Illuminate\Database\Eloquent\Model;

class LortomComponent extends Model
{
    protected $table = 'lt_components';


    public function elements()
    {
        return $this->belongsToMany('Plugins\Hardel\Website\Model\LortomElement','lt_component_element','idComponent','idElement')->get();
    }

    public function checkPropertyEdit($key, &$array)
    {
        if($this->$key != $array[$key])
            $this->$key = $array[$key];

    }

    public function checkPropertySave($key, &$array)
    {
        $this->$key = $array[$key];
    }
}