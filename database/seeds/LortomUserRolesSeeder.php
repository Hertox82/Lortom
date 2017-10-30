<?php
/**
 * User: hernan
 * Date: 30/10/2017
 * Time: 15:18
 */

use Illuminate\Database\Seeder;

class LortomUserRolesSeeder extends Seeder
{
    public function run()
    {
        DB::table('lt_users_roles')->insert([
            'idUser'    => 1,
            'idRole'    => 1
        ]);
    }
}