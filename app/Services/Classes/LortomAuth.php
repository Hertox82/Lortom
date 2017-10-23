<?php
/**
 * User: hernan
 * Date: 23/10/2017
 * Time: 15:32
 */

namespace App\Services\Classes;



use  App\LortomUser;
use Hash;

class LortomAuth
{

    protected $username;

    protected $password;

    public function authenticate($input)
    {
        array_walk_recursive($input,["App\\Services\\Classes\\LortomAuth",'saveInput']);

        $query = LortomUser::where([['email',$this->username]])->first();

        if(is_null($query))
            return false;
        else{
            if(Hash::check($this->password,$query->password))
            {
                return $query;
            }
            else
            {
                return false;
            }
        }
    }


    protected function saveInput($item, $key)
    {
        $fn = ucfirst($key);
        $function = "set{$fn}";
        $this->$function($item);
    }

    protected function setUsername($value)
    {
        $this->username = $value;
    }

    protected function setPassword($value)
    {
        $this->password = $value;
    }
}