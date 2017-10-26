<?php
/**
 * Created by PhpStorm.
 * User: hernan
 * Date: 24/10/2017
 * Time: 09:45
 */

namespace App\Services\Classes;

use App\LortomUser;
use Hash;
use Session;
use Illuminate\Support\Facades\Cookie;

class LortomUserProvider
{

    protected $username;

    protected $password;

    protected $user;

    protected $payload;

    public function validateLogin(array $input)
    {
        array_walk_recursive($input,[$this->getNameClass(),'saveInput']);

        return $this->isValidate();
    }

    protected function isValidate()
    {
        $query = LortomUser::where([['email',$this->username]])->first();

        if(is_null($query))
            return false;
        else{
            if(Hash::check($this->password,$query->password))
            {
                $this->user = $query;
                return true;
            }
            else
            {
                return false;
            }
        }
    }

    public function getToken()
    {
        $token = $this->retrieveTokenByCookies();

        if(!$token)
        {
            return null;
        }


        return $token;
    }

    protected function retrieveTokenByCookies()
    {
        return isset($_COOKIE['l_t']) ? $_COOKIE['l_t'] : null;
    }

    public function setToken()
    {

        $payload = [
            'sub'     => $this->user->email,
            'exp'     => 10,
            'iss'     => $_ENV['APP_NAME'],
            'created' => date('Y-m-d H:i:s')
        ];

        $token = JWT::encode($payload,'lortom_tomlor');

        return $token;
    }

    public function refreshToken()
    {
        $this->user = LortomUser::where([['email',$this->payload->sub]])->first();

        return $this->setToken();
    }

    public function validateToken($token)
    {
        //$token = decrypt($token);

        try {
            $payload = JWT::decode($token, 'lortom_tomlor');
        }catch (\UnexpectedValueException $e)
        {
            return null;
        }

        $this->payload = $payload;

        $nowTime = strtotime(date('Y-m-d H:i:s'));
        $created = strtotime($payload->created);
        $expiration = $created + $payload->exp;

        $check = $expiration - $nowTime;

        if($check >= 0)
        {
            // il token non è expirato
            return true;
        }
        else
        {
            //il token è expirato, bisogna farne uno nuovo
            return false;
        }
    }

    private function getNameClass()
    {
        return "App\\Services\\Classes\\LortomUserProvider";
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

    public function getUser()
    {
        return $this->user;
    }
}