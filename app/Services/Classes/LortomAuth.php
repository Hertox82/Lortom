<?php
/**
 * User: hernan
 * Date: 23/10/2017
 * Time: 15:32
 */

namespace App\Services\Classes;


use Illuminate\Contracts\Session\Session;

class LortomAuth
{

    protected $userProvider;

    public function __construct(LortomUserProvider $userProvider)
    {
        $this->userProvider = $userProvider;
    }

    public function authenticate($input)
    {
        return $this->userProvider->validateLogin($input);
    }


    public function getToken()
    {
        return $this->userProvider->getToken();
    }

    public function setToken()
    {
       return $this->userProvider->setToken();
    }

    public function validateToken($token)
    {
        return $this->userProvider->validateToken($token);
    }

    public function refreshToken()
    {
        return $this->userProvider->refreshToken();
    }

}