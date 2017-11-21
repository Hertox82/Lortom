<?php

namespace Plugins\Hardel\Website\Model;


use Illuminate\Database\Eloquent\Model;

class LortomPages extends Model
{
    protected $table = 'lt_pages';


    public static function gVal($field)
    {
        $return = [];

        if($field == 'state')
        {
            $return[] = ['id' => 1, 'label' => 'Attivo'];
            $return[] = ['id' => 2, 'label' => 'Non Attivo'];
        }

        return $return;
    }


    public static function gValBack($id,$field)
    {

        $list = self::gVal($field);

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
}