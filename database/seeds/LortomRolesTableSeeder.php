<?php
/**
 * User: hernan
 * Date: 30/10/2017
 * Time: 12:41
 */

use Illuminate\Database\Seeder;

class LortomRolesTableSeeder extends Seeder
{
    public function run(){
        DB::table('lt_roles')->insert([
            'id'        => 1,
            'name'      => 'Admin',
            'created_at'    => date("Y-m-d H:i:s"),
            'updated_at'    => date("Y-m-d H:i:s")
        ]);

        DB::table('lt_roles')->insert([
           'id'         => 2,
            'name'      => 'Web Operator',
            'created_at'    => date("Y-m-d H:i:s"),
            'updated_at'    => date("Y-m-d H:i:s")
        ]);
    }
}