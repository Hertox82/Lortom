<?php
/**
 * User: hernan
 * Date: 02/05/2018
 * Time: 09:40
 */


namespace App\Console\Commands;

use App\Console\Commands\LortomCommand as Command;
use App\Exceptions\VNException;
use App\Services\TemplateAddPlugCompiler;

class AddTempPlugin extends Command{

    /**
     * This is a command in order to create a Template
     * @var string
     */
    protected $signature = "lortom-template:add-plugin {--vendor-name= : Pass the Vendor,Name for your Template!} {--silent} {--name-plugin= : Pass the Vendor, Name of Plugin}";

    /**
     * This is description of our command
     * @var string
     */
    protected $description = 'In Order to add a plugin into a template digit --vendor-name=Vendor,Name (for template) --name-plugin=Vendor,Name (for plugin)';

    /**
     * @var \App\Services\TemplateAddPlugCompiler;
     */
    protected $compiler;


    public function __construct(TemplateAddPlugCompiler $compiler)
    {
        parent::__construct();

        $this->compiler = $compiler;
    }

    public function handle()
    {
        $silent = $this->option('silent');
        //check the Vendor-Name format
        try {
            //get vendor and name
            list($vendorT, $nameT) = $this->extrapolateVendorName($this->option('vendor-name'),$silent);
            list($vendorP, $nameP) = $this->extrapolateVendorName($this->option('name-plugin'),$silent,"Plugin");


        }catch (VNException $e) {
            $this->error($e->getMessage());
            return;
        }

        if(!$silent) {
            if($this->confirm("This is the Vendor = {$vendorT}, the Name= {$nameT} of template that you choice, Do you wish to continue?")) {
                //send to function Vendor,Name of template and Vendor,Name of Plugin
                $this->execAddPlugin(compact("vendorT","nameT","vendorP","nameP"));
            }
            else {
                $this->info("Ok, try again! see ya!");
            }

        } else {
            //send to function Vendor,Name of template and Vendor,Name of Plugin
            $this->execAddPlugin(compact("vendorT","nameT","vendorP","nameP"));
        }

    }

    protected function execAddPlugin($params) {
        extract($params,EXTR_SKIP);

        // get the Name sanitize
        $nameT = $this->extrapolateName($nameT);
        $nameP = $this->extrapolateName($nameP);

        //check if plugin exist fisically
        $this->checkIfPathNotExists($vendorT,$nameT,"Template");
        $this->checkIfPathNotExists($vendorP,$nameP, "Plugin");

        try {
            $this->compiler->setVendorName($vendorT,$nameT)
                ->setBasePath()
                ->writingPluginInConfig($vendorP,$nameP);
        } catch (VNException $e)
        {
            $this->error($e->getMessage());
            return;
        }
        $this->info("Added {$vendorP} - {$nameP} into this Template: {$vendorT} - {$nameT}");
    }
}