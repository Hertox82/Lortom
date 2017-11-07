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
use DB;
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

    public function saveRole(Request $request)
    {
        //get the input from request
        $input = $request->all();

        //Asking to DB to find this Role
        $Role = LortomRole::find($input['id']);

        $data = [];

        //If Role exist
        if($Role){

            //Check if changed the name
           if($Role->name !== $input['name'])
            {
                $Role->name = $input['name'];
                $Role->save();
            }

            //Delete all references
            DB::table('lt_roles_permissions')->where('idRole',$Role->id)->delete();

            //sanitize the array of Permission
            $insert = array_filter(array_map(function($item)use($input){
                return [
                    'idRole'        => $input['id'],
                    'idPermission'  => $item['id']
                ];
            },$input['permissions']));

            //Naturally, only if insert not empty, insert the data into DB
            if(!empty($insert))
             DB::table('lt_roles_permissions')->insert($insert);

            //prepare data for response
            $data = [
                'id'            => $Role->id,
                'name'          => $Role->name,
                'permissions'   => array_filter(array_map_collection(function($perm){
                    if($perm instanceof LortomPermission)
                    {
                        return [
                            'id'    => $perm->id,
                            'name'  => $perm->name
                        ];
                    }
                },$Role->permissions()->toArray()))
            ];

        }
        return response()->json(['role' => $data]);
    }
}