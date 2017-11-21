<?php
/**
 * User: hernan
 * Date: 16/11/2017
 * Time: 09:17
 */


namespace Plugins\Hardel\Website\Model;


use Illuminate\Database\Eloquent\Model;

class LortomElement extends Model
{
    protected $table = 'lt_elements';


    public function checkPropertyEdit($key, &$array)
    {
        if($key === 'functions')
        {
            if($this->function != $array[$key])
                $this->function = $array[$key];
        }
        else
        {
            if($this->$key != $array[$key])
                $this->$key = $array[$key];
        }
    }

    public function checkPropertySave($key, &$array)
    {
        if($key === 'functions')
        {
            $this->function = $array[$key];
        }
        else
        {
            $this->$key = $array[$key];
        }
    }
}