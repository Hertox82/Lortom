<?php
/**
 * Created by PhpStorm.
 * User: hernan
 * Date: 23/10/2017
 * Time: 10:57
 */

namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Encryption\Encrypter;
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

            $response->headers->set('X-FRAME-OPTIONS','DENY');
            return $response;
        }
        // Verificare prima se il token è in sessione
        $token = (strlen($request->cookie('l_t')) == 0) ? @$_COOKIE['l_t'] : $request->cookie('l_t');

        //pr($token);
        $token = (strlen($token) > 0) ? $token : '';

        $config = config('session');

        if(strlen($token) == 0)
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

                    $response->headers->set('X-FRAME-OPTIONS','DENY');
                    return $response->withCookie(Cookie::make('l_t',$token,1000,$config['path'],$config['domain'],$config['secure'],false,false,'Lax'));
                }
                else if($check === false)
                {
                    $token = LtAuth::refreshToken();
                    $response = $next($request);

                    $response->headers->set('X-FRAME-OPTIONS','DENY');
                    return $response->withCookie(Cookie::make('l_t',$token,1000,$config['path'],$config['domain'],$config['secure'],false,false,'Lax'));
                }
                else
                {
                    unset($_COOKIE['l_t']);
                    setcookie('l_t',null,-1,'/');
                    return redirect('backend/login');
                }
            }

        }
        else
        {
            //autentica il token
            if($check = LtAuth::validateToken($token))
            {
                $response = $next($request);
                $response->headers->set('X-FRAME-OPTIONS','DENY');
                return $response->withCookie(Cookie::make('l_t',$token,1000,$config['path'],$config['domain'],$config['secure'],false,false,'Lax'));
            }
            else if($check === false)
            {
                $token = LtAuth::refreshToken();
                $response = $next($request);

                $response->headers->set('X-FRAME-OPTIONS','DENY');
                return $response->withCookie(Cookie::make('l_t',$token,1000,$config['path'],$config['domain'],$config['secure'],false,false,'Lax'));
            }
            else
            {
                unset($_COOKIE['l_t']);
                setcookie('l_t',null,-1,'/');
                return redirect('backend/login');
            }
        }

    }
}