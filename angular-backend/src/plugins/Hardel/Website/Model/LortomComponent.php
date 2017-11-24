<?php
/**
 * User: hernan
 * Date: 16/11/2017
 * Time: 09:15
 */

namespace Plugins\Hardel\Website\Model;


use Illuminate\Database\Eloquent\Model;
use DB;

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

    public function getElements()
    {
       return  DB::table('lt_component_element')
                  ->where('lt_component_element.idComponent',$this->id)
                  ->join('lt_elements','lt_elements.id','=','lt_component_element.idElement')
                  ->select([
                      'lt_component_element.id AS id',
                      'lt_elements.id AS idElement',
                      'lt_elements.name AS name',
                      'lt_elements.Object AS Object',
                      'lt_elements.function AS function',
                      'lt_elements.appearance AS appearance'
                  ])->get();
    }

}