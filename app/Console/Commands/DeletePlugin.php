<?php
/**
 * Created by PhpStorm.
 * User: hernan
 * Date: 19/10/2017
 * Time: 10:39
 */

namespace App\Console\Commands;


use LTFramework\Services\PluginDeleteCompiler;
use Illuminate\Console\Command;
use File;

class DeletePlugin extends Command
{
    protected $signature = "lortom-plugin:delete {--vendor-name= : This is the safe mode to delete plugin in Lortom} {--silent}";


    protected $description = "This command delete all folder and clean all configuration from your Plugin";

    /**
     * @var \LTFramework\Services\PluginDeleteCompiler
     */
    protected $compiler;

    public function __construct(PluginDeleteCompiler $compiler)
    {
        parent::__construct();

        $this->compiler = $compiler;

    }

    public function handle()
    {
        $VendorName = $this->option('vendor-name');
        $silent = $this->option('silent');

        $vendor = '';
        $name = '';

        if(is_null($VendorName) and !$silent)
        {
            $vendor = $this->ask('Vendor Name?');
            $name   = $this->ask('Name of Plugin?');
        }
        else
        {
            $vendorName = explode(',',$VendorName);

            if(count($vendorName) != 2)
            {
                $vendor = $this->ask('Vendor Name?');
                $name   = $this->ask('Name of Plugin?');
            }
            else
            {
                $vendor = $vendorName[0];
                $name   = $vendorName[1];
            }
        }

        if(!$silent) {
            if ($this->confirm("This is the Vendor = {$vendor}, the Name= {$name} of plugin that you choice to DELETE, Do you wish to continue?")) {
                $this->DoSomething($vendor,$name);
            }
        }
        else {
            $this->DoSomething($vendor,$name);
        }
    }

    protected function DoSomething($vendor, $name) {
        $name = str_replace('-', ' ', $name);
        $name = ucwords($name);
        $name = str_replace(' ', '', $name);

        $pathPlugin = __DIR__ . '/../../../angular-backend/src/plugins/';

        if (File::exists($pathPlugin . $vendor)) {
            $pathVendor = $pathPlugin . $vendor . '/';

            if (!File::exists($pathVendor . $name)) {
                $this->info("This Plugin: {$name} in this Vendor: {$vendor} note exist! Please select other Name for your plugin");
                return;
            }

            // In Order to delete all references we want to check if the plugin also have DatabaseMigration

            //Delete folder of plugin, delete references from config/plugins.php and config/app.php
            $this->compiler->setVendorName($vendor, $name)->delete();

            //after all update the routing into the angular-backend/src/app/app.routing.ts
            $this->callSilent('lortom-routing:enable');

            $this->info("\n");
            $this->info("Ok! this Plugin : {$name} no longer lives here");
        } else {
            $this->info("this Vendor: {$vendor} not exist! Please select other Vendor for your plugin");
        }
    }
}