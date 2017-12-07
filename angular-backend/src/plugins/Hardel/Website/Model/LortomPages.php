<?php

namespace Plugins\Hardel\Website\Model;


use Illuminate\Database\Eloquent\Model;
use DB;

class LortomPages extends Model
{
    protected $table = 'lt_pages';


    public static function getFieldValue($field)
    {
        $return = [];

        if($field == 'state')
        {
            $return[] = ['id' => 1, 'label' => 'Attivo'];
            $return[] = ['id' => 2, 'label' => 'Non Attivo'];
        }

        return $return;
    }


    public static function getFieldValueById($id,$field)
    {

        $list = self::getFieldValue($field);

        foreach ($list as $val)
        {
            if($val['id'] === $id)
            {
                return $val;
            }
        }

        return [];
    }

    public function components()
    {
        return $this->belongsToMany('Plugins\Hardel\Website\Model\LortomComponent','lt_page_component','idPage','idComponent')->get();
    }

    public function checkPropertyEdit($key, &$array)
    {
        if($key === 'state')
        {
            if($this->state !== $array[$key]['id'])
                $this->state = $array[$key]['id'];
        }
        else {
            if($this->$key != $array[$key])
                $this->$key = $array[$key];
        }
    }

    public function checkPropertySave($key, &$array)
    {

        if($key === 'state')
        {
            $this->state = $array[$key]['id'];
        }
        else {
            $this->$key = $array[$key];
        }

    }

    public function getPageComponents()
    {
        return json_decode(json_encode($this->getListComponents()),true);
    }

    protected function getListComponents()
    {
        return  DB::table('lt_page_component')
            ->where('idPage',$this->id)
            ->join('lt_components','lt_components.id','=','lt_page_component.idComponent')
            ->select([
                'lt_page_component.id AS id',
                'lt_components.id AS idComponent',
                'lt_components.name AS name',
                'lt_page_component.Object AS Object',
                'lt_page_component.function AS functions',
            ])->get();
    }
}