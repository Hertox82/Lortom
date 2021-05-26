<?php

namespace Database\Seeders;

use LTFramework\Services\LortomSeeder as Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call($this->all());

    }
}
