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
                'name' => $plug['PluginName'],
                'href' => '/backend'.$plug['routingPath'],
                'icon' => $plug['icon']
            ];
        }



        return response()->json(['menulista' => $lista]);
    }

    static function sort($a,$b)
    {
        $a = $a['position'];
        $b = $b['position'];

        if ($a == $b) return 0;
        return ($a < $b) ? -1 : 1;
    }
}