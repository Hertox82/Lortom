<?php
/**
 * User: hernan
 * Date: 17/04/2018
 * Time: 10:24
 */

namespace App\Console\Commands;

use App\Exceptions\VNException;
use App\Console\Commands\LortomCommand as Command;
use App\Services\TemplateCreateCompiler;
use File;

class CreateTemplate extends Command
{
    /**
     * This is a command in order to create a Template
     * @var string
     */
    protected $signature = "lortom-template:create {--vendor-name= : Pass the Vendor,Name for your Template!} {--silent}";

    protected $description = 'In Order to create a template digit --vendor-name=Vendor,Name';

    /**
     * @var \App\Services\TemplateCreateCompiler
     */
    protected $compiler;


    public function __construct(TemplateCreateCompiler $compiler)
    {
        parent::__construct();
        $this->compiler = $compiler;
    }

    public function handle()
    {
        //check the Vendor-Name format
        try {
            //get vendor and name
            list($vendor, $name) = $this->getVendorName();

        }catch (VNException $e) {
            $this->error($e->getMessage());
            return;
        }
        $silent = $this->option('silent');

        if(!$silent) {
            if($this->confirm("This is the Vendor = {$vendor}, the Name= {$name} of template that you choice, Do you wish to continue?")) {
                $this->exeCreate($vendor,$name);
            }
            else {
                $this->info("Ok, try again! see ya!");
            }

        } else {
            $this->exeCreate($vendor,$name);
        }

    }

    protected function exeCreate($vendor, $name) {
        //get the Name sanitize
        $name = $this->extrapolateName($name);
        //check if folder really exist
        $this->checkIfPathNotExists($vendor,$name,"Template");

        $this->compiler->setVendorName($vendor, $name)
            ->writingDirectory()
            ->writingConfigJSON()
            ->writingModelClass()
            ->writingAutoload();

        $this->info('Please, be sure to make the composer dump-autoload!');
    }

}