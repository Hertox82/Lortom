<?php
/**
 * User: hernan
 * Date: 18/10/2017
 * Time: 11:11
 */

namespace App\Console\Commands;

use App\Services\PluginCreateCompiler;
use Illuminate\Console\Command;
use File;

class CreatePlugin extends Command
{
    /**
     * Command to create plugin inside Backend Lortom
     * @var string
     */
    protected $signature = 'lortom-plugin:create {--vendor-name= : Pass the Vendor,Name for your plugin!}';

    protected $description = 'In Order to create a plugin digit --vendor-name=Vendor,Name';

    /**
     * @var \App\Services\PluginCreateCompiler
     */
    protected $compiler;

    public function __construct(PluginCreateCompiler $compiler)
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

        if($this->confirm("This is the Vendor = {$vendor}, the Name= {$name} of plugin that you choice, Do you wish to continue?"))
        {

            $name = str_replace('-',' ',$name);
            $name = ucwords($name);
            $name = str_replace(' ','',$name);

            $pathPlugin = __DIR__.'/../../../angular-backend/src/plugins/';

            if(File::exists($pathPlugin.$vendor))
            {
                $pathVendor = $pathPlugin.$vendor.'/';

                if(File::exists($pathVendor.$name))
                {
                    $this->info("This Plugin: {$name} in this Vendor: {$vendor} already exist! Please select other Name for your plugin");
                    return;
                }
            }

            $this->line('Ok, now is time to Create your Plugin!');

            $bar = $this->output->createProgressBar(9);

            $compiler = $this->compiler->setVendorName($vendor,$name);
            $bar->advance();

            $compiler = $compiler->writingDirectory();
            $bar->advance();

            $compiler = $compiler->writingFileComponent();
            $bar->advance();

            $compiler = $compiler->writingFileController();
            $bar->advance();

            $compiler = $compiler->writingFileProviders();
            $bar->advance();

            $compiler = $compiler->writingFileTs();
            $bar->advance();

            $compiler = $compiler->writingFilePhp();
            $bar->advance();

            $compiler = $compiler->writingConfigPlugins();
            $bar->advance();

            $compiler->writingConfigApp();
            $bar->advance();

            $bar->finish();

            $this->info("\n");
            $this->info('Well Done! Now you have a new Plugin for LORTOM');
        }
    }
}