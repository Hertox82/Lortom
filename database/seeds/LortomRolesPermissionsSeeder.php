<?php
/**
 * User: hernan
 * Date: 30/10/2017
 * Time: 15:21
 */

use Illuminate\Database\Seeder;


class LortomRolesPermissionsSeeder extends Seeder
{
    public function run(){

        DB::table('lt_roles_permissions')->insert([
            'idRole'            => 1,
            'idPermission'      => 1,
        ]);

        DB::table('lt_roles_permissions')->insert([
            'idRole'            => 1,
            'idPermission'      => 2,
        ]);

        DB::table('lt_roles_permissions')->insert([
            'idRole'            => 1,
            'idPermission'      => 3,
        ]);

        DB::table('lt_roles_permissions')->insert([
            'idRole'            => 1,
            'idPermission'      => 4,
        ]);
    }
}