<?php
/**
 * User: hernan
 * Date: 16/10/2017
 * Time: 16:39
 */
namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SlideBarController extends Controller
{

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

        $auth = new  \App\Services\Classes\LortomAuth();

        $obj = $auth->authenticate($input);

        if(!$obj)
        {
            return redirect()->route('login')->withErrors(['error' => 'username or password not find']);
        }

        pr($obj,1);


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