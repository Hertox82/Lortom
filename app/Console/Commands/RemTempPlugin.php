<?php
/**
 * User: hernan
 * Date: 02/05/2018
 * Time: 16:52
 */


namespace App\Console\Commands;

use App\Console\Commands\LortomCommand as Command;
use LTFramework\Services\TemplatePlugCompiler;
use App\Exceptions\VNException;


class RemTempPlugin extends Command{


    protected $signature = "lortom-template:rm-plugin {--vendor-name= : Pass the Vendor,Name for your Template!} {--silent} {--name-plugin= : Pass the Vendor, Name of Plugin}";

    protected $description = "In Order to remove a plugin into a template digit --vendor-name=Vendor,Name (for template) --name-plugin=Vendor,Name (for plugin)";

    /**
     * @var \LTFramework\Services\TemplatePlugCompiler;
     */
    protected $compiler;


    public function __construct(TemplatePlugCompiler $compiler)
    {
        parent::__construct();

        $this->compiler = $compiler;
    }

    public function handle() {
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
                $this->execRmPlugin(compact("vendorT","nameT","vendorP","nameP"));
            }
            else {
                $this->info("Ok, try again! see ya!");
            }

        } else {
            //send to function Vendor,Name of template and Vendor,Name of Plugin
            $this->execRmPlugin(compact("vendorT","nameT","vendorP","nameP"));
        }
    }

    public function execRmPlugin($params) {
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
                ->deletingPluginInConfig($vendorP,$nameP);
        } catch (VNException $e)
        {
            $this->error($e->getMessage());
            return;
        }
        $this->info("Remove {$vendorP} - {$nameP} into this Template: {$vendorT} - {$nameT}");
    }
}