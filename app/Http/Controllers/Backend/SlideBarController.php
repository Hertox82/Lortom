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

        $lista = [];

        $route = [];

        $route[] = [
            'path'          => 'backend',
            'redirectTo'    => 'backend/dashboard',
            'pathMatch'     => 'full'
        ];

        foreach ($listaPlugin['plugins'] as $plug)
        {
            $lista[] = [
                'name' => $plug['PluginName'],
                'href' => '/backend'.$plug['routingPath'],
                'icon' => $plug['icon']
            ];

            $moduleName = $plug['moduleName'];
            $moduleName = str_replace('.',' ',$moduleName);
            $moduleName = str_replace(' ','',ucwords($moduleName));
            $route[] = [
                'path'          => 'backend'.$plug['routingPath'],
                'loadChildren'  => '../plugins/'.$plug['vendor'].'/'.$plug['PluginName'].'/'.$plug['moduleName'].'#'.$moduleName
            ];
        }

        return response()->json(['menulista' => $lista, 'route' => $route]);
    }
}