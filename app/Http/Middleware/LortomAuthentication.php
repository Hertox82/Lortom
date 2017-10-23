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
use Illuminate\Support\Facades\Route;

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

        $token = $request->bearerToken();

        //In caso negativo fare redirect nella pagina di login
        if(strlen($token) == 0)
        {
            return redirect('backend/login');
        }


        //in caso positivo fare l'autenticazione del token

        //in caso sia scaduto fare redirect nella pagina di login

        //in caso non sia scaduto allora procedere con la richiesta
        $response = $next($request);


        return $response;
    }
}