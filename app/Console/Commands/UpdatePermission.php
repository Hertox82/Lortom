<?php
/**
 * Created by PhpStorm.
 * User: hernan
 * Date: 08/11/2017
 * Time: 17:09
 */

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\PluginUpdateCompiler;
use File;

class UpdatePermission extends Command
{
    protected $signature = "lortom-permission:update {--vendor-name=}";

    protected $description= "This command update the permission of selected plugin";

    /**
     * @var \App\Services\PluginUpdateCompiler
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

        $vendor = '';
        $name = '';

        if(is_null($VendorName))
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

        if($this->confirm("This is the Vendor = {$vendor}, the Name= {$name} of plugin that you choice to UPDATE, Do you wish to continue?"))
        {

            $name = str_replace('-',' ',$name);
            $name = ucwords($name);
            $name = str_replace(' ','',$name);

            $pathPlugin = __DIR__.'/../../../angular-backend/src/plugins/';

            if(File::exists($pathPlugin.$vendor))
            {
                $pathVendor = $pathPlugin.$vendor.'/';

                if(!File::exists($pathVendor.$name))
                {
                    $this->info("This Plugin: {$name} in this Vendor: {$vendor} note exist! Please select other Name for your plugin");
                    return;
                }

                //update references on Plugin and App config
               $this->compiler->setVendorName($vendor,$name)->updatePermission();

                $this->info("\n");
                $this->info("Ok! this Plugin : {$name} is updated!");
            }
            else
            {
                $this->info("this Vendor: {$vendor} not exist! Please select other Vendor for your plugin");
            }

        }
    }
}