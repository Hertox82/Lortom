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
        $lista = [
            [
                'name'  => 'Dashboard',
                'href'  => '/backend/dashboard',
                'icon'  => 'fa fa-dashboard',
                'active' => true,
            ],
            [
                'name'  => 'Settings',
                'href'  => '/backend/settings',
                'icon'  => 'fa fa-cogs',
                'active' => false,
            ],
            [
                'name'  => 'Plugin',
                'href'  => '/backend/plugin',
                'icon'  => 'fa fa-plug',
                'active' => false,
            ],
        ];
        return response()->json(['menulista' => $lista]);
    }
}