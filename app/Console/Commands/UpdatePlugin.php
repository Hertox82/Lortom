<?php
/**
 * Created by PhpStorm.
 * User: hernan
 * Date: 19/10/2017
 * Time: 10:39
 */

namespace App\Console\Commands;


use LTFramework\Services\PluginUpdateCompiler;
use Illuminate\Console\Command;
use File;

class UpdatePlugin extends Command
{
    protected $signature = "lortom-plugin:update {--vendor-name=} {--no-routing} {--silent}";

    protected $description= "This command update the plugin selected";

    /**
     * @var \LTFramework\Services\PluginUpdateCompiler
     */
    protected $compiler;

    public function __construct(PluginUpdateCompiler $compiler)
    {
        parent::__construct();

        $this->compiler = $compiler;
    }

    public function handle()
    {
        $VendorName = $this->option('vendor-name');
        $routing = $this->option('no-routing');
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

        if(!$silent)
        {
            if ($this->confirm("This is the Vendor = {$vendor}, the Name= {$name} of plugin that you choice to UPDATE, Do you wish to continue?")) {
                    $this->DoSomething($vendor,$name,$routing,$silent);
            }
        }
        else {
            $this->DoSomething($vendor,$name,$routing,$silent);
        }
    }

    protected function DoSomething($vendor,$name,$routing,$silent) {
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

            //update references on Plugin and App config
            $this->compiler->setVendorName($vendor, $name)->update();

            if (!$routing) {
                //after all update the routing into the angular-backend/src/app/app.routing.ts
                $this->callSilent('lortom-routing:enable');

            }



            if(!$silent) {
                $this->call('lortom-permission:update', ['--vendor-name' => $vendor . ',' . $name]);
            }
            else {
                $this->callSilent('lortom-permission:update', ['--vendor-name' => $vendor . ',' . $name,'--silent' => true]);
            }

            $this->info("\n");
            $this->info("Ok! this Plugin : {$name} is updated!");
        } else {
            $this->info("this Vendor: {$vendor} not exist! Please select other Vendor for your plugin");
        }
    }
}