<?php

use LTFramework\Services\LortomSeeder as Seeder;

class LortomUserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    protected $register = true;

    public function run()
    {
        DB::table('lt_user')->insert([
            'id'            => 1,
            'name'          => 'Hernan Ariel De Luca',
            'email'         => 'hadeluca@lortom.com',
            'password'      => bcrypt('lortom_dev'),
            'created_at'    => date("Y-m-d H:i:s"),
            'updated_at'    => date("Y-m-d H:i:s")
        ]);
    }

}
