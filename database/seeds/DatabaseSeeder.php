<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        $this->call(LortomUserTableSeeder::class);
        $this->call(LortomRolesTableSeeder::class);
        $this->call(LortomPermissionsTableSeeder::class);
        $this->call(LortomUserRolesSeeder::class);
        $this->call(LortomRolesPermissionsSeeder::class);

    }
}
