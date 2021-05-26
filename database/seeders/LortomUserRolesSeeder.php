<?php
/**
 * User: hernan
 * Date: 30/10/2017
 * Time: 15:18
 */

namespace Database\Seeders;

use LTFramework\Services\LortomSeeder as Seeder;

class LortomUserRolesSeeder extends Seeder
{
    protected $register = true;

    public function run()
    {
        DB::table('lt_users_roles')->insert([
            'idUser'    => 1,
            'idRole'    => 1
        ]);
    }
}