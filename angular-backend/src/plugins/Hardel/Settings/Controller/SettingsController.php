<?php

/**
 * User: hernan
 * Date: 03/11/2017
 * Time: 12:16
 */

namespace Plugins\Hardel\Settings\Controller;

use App\Http\Controllers\Controller;
use App\LortomPermission;
use App\LortomRole;
use Illuminate\Http\Request;
class SettingsController extends Controller
{
    public function getPermissions(Request $request)
    {
        $listaPermission = LortomPermission::all();

        $obj = array_map(function($item){
            return ['id' => $item['id'], 'name' => $item['name']];
        },$listaPermission->toArray());

        return response()->json(['permissions' => $obj]);
    }

    public function getRoles(Request $request)
    {
        $listaRoles = LortomRole::all();

        $sanitizedList = array_filter(array_map_collection(function($role){
            if($role instanceof LortomRole)
            {
                $listaPermission = array_filter(array_map(function($perm){
                    if($perm instanceof LortomPermission)
                    {
                        return [
                            'id'    => $perm->id,
                            'name'  => $perm->name
                        ];
                    }
                },$role->permissions()->toArray()));
                return [
                    'id'            => $role->id,
                    'name'          => $role->name,
                    'permissions'   => $listaPermission
                ];
            }
        },$listaRoles));

        return response()->json(['roles' => $sanitizedList]);
    }
}