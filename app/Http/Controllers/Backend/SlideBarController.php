<?php
/**
 * User: hernan
 * Date: 16/10/2017
 * Time: 16:39
 */
namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Services\Classes\LortomAuth;
use Illuminate\Http\Request;
use Cookie;
use Session;

class SlideBarController extends Controller
{

    protected $auth;

    public function __construct(LortomAuth $auth)
    {
        $this->auth = $auth;
    }

    public function populate(Request $request)
    {
        $listaPlugin = config('plugins');

        //ReSort the list of plugins
        usort($listaPlugin['plugins'],["App\\Http\\Controllers\\Backend\\SlideBarController","sort"]);
        $lista = [];

        foreach ($listaPlugin['plugins'] as $plug)
        {
            $lista[] = [
                'name'      => $plug['PluginName'],
                'href'      => '/backend'.$plug['routingPath'],
                'icon'      => $plug['icon'],
                'subMenu'   => $this->setSubMenu(@$plug['subMenu'])
            ];
        }



        return response()->json(['menulista' => $lista]);
    }

    public function login(Request $request)
    {
        return view('login');
    }

    public function requestLogin(Request $request)
    {
        $input = $request->only(['username','password']);

        if(!$this->auth->authenticate($input))
        {
            //errore durante il login, da fare in json
            return response()->json(['error' => 'username or password not find']);
        }

        $token = encrypt($rawToken = $this->auth->setToken());

        $response = ['token' => $token, 'rawToken' => $rawToken];

       $config = config('session');

        return response()->json($response)->withCookie(Cookie::make('l_t',$rawToken,10,$config['path'],$config['domain'],$config['secure'],false,false,'Lax'));
    }

    static function sort($a,$b)
    {
        $a = $a['position'];
        $b = $b['position'];

        if ($a == $b) return 0;
        return ($a < $b) ? -1 : 1;
    }

    private function setSubMenu($lista)
    {
        if(is_null($lista))
            return [];


        $return = [];
        foreach ($lista as $sub)
        {
            $return[] = [
                  'name'    => $sub['Name'],
                  'href'    => '/backend'.$sub['subPath']
            ];
        }

        return $return;
    }
}