<?php
/**
 * Created by PhpStorm.
 * User: hernan
 * Date: 23/10/2017
 * Time: 10:57
 */

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use App\Services\Facades\LtAuth;
use Illuminate\Support\Facades\Cookie;

class LortomAuthentication
{

    public function handle(Request $request, Closure $next)
    {
        // Controllare se nell'header c'è il token JWT


        $currentPath = $request->path();



        if($currentPath === 'backend/login'){

            $response = $next($request);

            return $response;
        }
        // Verificare prima se il token è in sessione

        if(! session()->has('l_t'))
        {
            if(! isset($_COOKIE['l_t']))
            {
                $token = $request->bearerToken();

                //In caso negativo fare redirect nella pagina di login
                if(strlen($token) == 0)
                {
                    return redirect('backend/login');
                }
                else
                {
                    //autentica il token
                    if($check = LtAuth::validateToken($token))
                    {
                        $response = $next($request);
                        return $response;
                    }
                    else if($check === false)
                    {
                        $token = LtAuth::refreshToken();
                        $response = $next($request);
                        return $response->withCookie(Cookie::make('l_t',$token,1000,'/'));
                    }
                    else
                    {
                        unset($_COOKIE['l_t']);
                        setcookie('l_t',null,-1,'/');
                        session()->forget('l_t');
                        return redirect('backend/login');
                    }
                }

            }
            else
            {
                //autentica il token
                if($check = LtAuth::validateToken($_COOKIE['l_t']))
                {
                    session()->put('l_t',$_COOKIE['l_t']);
                    $request->session()->put('l_t',$_COOKIE['l_t']);
                    $response = $next($request);

                    return $response->withCookie(Cookie::make('l_t',$_COOKIE['l_t'],1000,'/'));
                }
                else if($check === false)
                {
                    $token = LtAuth::refreshToken();
                    $response = $next($request);
                    return $response->withCookie(Cookie::make('l_t',$token,1000,'/'));
                }
                else
                {
                    unset($_COOKIE['l_t']);
                    setcookie('l_t',null,-1,'/');
                    session()->forget('l_t');
                    return redirect('backend/login');
                }
            }
        }
        else
        {
            //autentica il token
            if($check = LtAuth::validateToken(LtAuth::getToken()))
            {
                $response = $next($request);
                return $response;
            }
            else if($check === false)
            {
                $token = LtAuth::refreshToken();
                $response = $next($request);
                return $response->withCookie(Cookie::make('l_t',$token,1000,'/'));
            }
            else
            {
                unset($_COOKIE['l_t']);
                setcookie('l_t',null,-1,'/');
                session()->forget('l_t');
                return redirect('backend/login');
            }
        }
    }
}