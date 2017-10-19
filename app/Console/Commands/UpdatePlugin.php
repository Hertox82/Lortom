<?php
/**
 * Created by PhpStorm.
 * User: hernan
 * Date: 19/10/2017
 * Time: 10:39
 */

namespace App\Console\Commands;


use Illuminate\Console\Command;
use File;

class UpdatePlugin extends Command
{
    protected $signature = "lortom-plugin:update {--vendor-name=}";

    protected $description= "This command update the plugin selected";


    public function handle()
    {

    }
}