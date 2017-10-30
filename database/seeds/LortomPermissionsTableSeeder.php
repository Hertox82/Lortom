<?php
/**
 * User: hernan
 * Date: 30/10/2017
 * Time: 15:10
 */

use Illuminate\Database\Seeder;

class LortomPermissionsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('lt_permissions')->insert([
            'id'            => 1,
            'name'          => 'Hardel.Dashboard',
            'created_at'    => date("Y-m-d H:i:s"),
            'updated_at'    => date("Y-m-d H:i:s")
        ]);

        DB::table('lt_permissions')->insert([
            'id'            => 2,
            'name'          => 'Hardel.Settings',
            'created_at'    => date("Y-m-d H:i:s"),
            'updated_at'    => date("Y-m-d H:i:s")
        ]);

        DB::table('lt_permissions')->insert([
            'id'            => 3,
            'name'          => 'Hardel.Settings.Roles',
            'created_at'    => date("Y-m-d H:i:s"),
            'updated_at'    => date("Y-m-d H:i:s")
        ]);

        DB::table('lt_permissions')->insert([
            'id'            => 4,
            'name'          => 'Hardel.Plugin',
            'created_at'    => date("Y-m-d H:i:s"),
            'updated_at'    => date("Y-m-d H:i:s")
        ]);
    }
}