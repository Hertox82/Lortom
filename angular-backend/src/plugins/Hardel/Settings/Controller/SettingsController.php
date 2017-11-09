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
use App\LortomUser;
use Illuminate\Http\Request;
use DB;
class SettingsController extends Controller
{
    /**
     * This function return all Permissions
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getPermissions(Request $request)
    {
        $listaPermission = LortomPermission::all();

        $obj = array_map(function($item){
            return ['id' => $item['id'], 'name' => $item['name']];
        },$listaPermission->toArray());

        return response()->json(['permissions' => $obj]);
    }

    /**
     * This function return all Roles
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getRoles(Request $request)
    {
        $sanitizedList = $this->sanitizeRoles();

        return response()->json(['roles' => $sanitizedList]);
    }

    public function getUsers(Request $request)
    {
        $sanitizedList = $this->sanitizeUsers();

        return response()->json(['users' => $sanitizedList]);
    }

    /**
     * This function update the Role
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
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
            $insert = $this->sanitizePermission($input);

            //Naturally, only if insert not empty, insert the data into DB
            if(!empty($insert))
             DB::table('lt_roles_permissions')->insert($insert);

            //prepare data for response
            $data = $this->getRoleSerialized($Role);

        }
        return response()->json(['role' => $data]);
    }

    /**
     * This function create new Role
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function newRole(Request $request)
    {
        $input = $request->all();

        $data = [];
        if($input['id'] == -1)
        {
            $name = $input['name'];
            $role = new LortomRole();

            $role->name = $name;
            $role->setCreatedAt(date("Y-m-d H:i:s"));
            $role->setUpdatedAt(date("Y-m-d H:i:s"));

            $role->save();

            $input['id'] = $role->id;
            $insert = $this->sanitizePermission($input);

            //Naturally, only if insert not empty, insert the data into DB
            if(!empty($insert))
                DB::table('lt_roles_permissions')->insert($insert);

            $data = $this->getRoleSerialized($role);

        }

        return response()->json(['role' => $data]);
    }

    /**
     * This function delete role by passed list
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteRoles(Request $request)
    {
        $input = $request->all();

        foreach ($input as $role)
        {
            $idRole = $role['id'];
            //delete relationship with permissions
            DB::table('lt_roles_permissions')->where('idRole',$idRole)->delete();
            //delete relationship with users
            DB::table('lt_users_roles')->where('idRole',$idRole)->delete();
            //delete role
            DB::table('lt_roles')->where('id',$idRole)->delete();
        }

       $sanitizedList = $this->sanitizeRoles();

        return response()->json(['roles' => $sanitizedList]);
    }

    /**
     * This function is to sanitize Permission
     * @param $input
     * @return array
     */
    private function sanitizePermission($input)
    {
        $insert = array_filter(array_map(function($item)use($input){
            return [
                'idRole'        => $input['id'],
                'idPermission'  => $item['id']
            ];
        },$input['permissions']));

        return $insert;
    }

    /**
     * This function is to sanitize Roles
     * @return array
     */
    private function sanitizeRoles()
    {
        $listaRoles = LortomRole::all();

        $sanitizedList = array_filter(array_map_collection(function($role){
            if($role instanceof LortomRole)
            {
                /*$listaPermission = array_filter(array_map(function($perm){
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
                ];*/
                return $this->getRoleSerialized($role);
            }
        },$listaRoles));

        return $sanitizedList;
    }

    private function sanitizeUsers()
    {
        $listaUsers = LortomUser::all();

        $listaPulita = array_filter(array_map_collection(function($user){
            if($user instanceof LortomUser)
            {
                //pr($user->roles(),1);
                return $this->getUserSerialized($user);
            }
        },$listaUsers));

        return $listaPulita;
    }

    private function getUserSerialized(LortomUser $user)
    {
        $roles = $user->getRoles();

        if(count($roles)>0) {
            $role = $roles[0];
            if ($role instanceof LortomRole) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $this->getRoleSerialized($role)
                ];
            }
        }
        else{
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ];
        }

    }

    /**
     * This function Serialize the Role
     * @param LortomRole $role
     * @return array
     */
    private function getRoleSerialized(LortomRole $role)
    {
        return [
            'id'            => $role->id,
            'name'          => $role->name,
            'permissions'   => array_filter(array_map_collection(function($perm){
                if($perm instanceof LortomPermission)
                {
                    return [
                        'id'    => $perm->id,
                        'name'  => $perm->name
                    ];
                }
            },$role->permissions()->toArray()))
        ];
    }
}