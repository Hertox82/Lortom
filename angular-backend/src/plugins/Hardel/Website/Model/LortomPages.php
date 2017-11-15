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
}