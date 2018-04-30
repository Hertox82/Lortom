<?php
/**
 * User: hernan
 * Date: 26/04/2018
 * Time: 15:53
 */

namespace App\Console\Commands;

use App\Console\Commands\LortomCommand as Command;
use App\Services\TemplateDeleteCompiler;
use App\Services\Traits\ActionCommand;
use App\Exceptions\VNException;

class DeleteTemplate extends Command{

    use ActionCommand;

    protected $signature = "lortom-template:delete {--vendor-name= : Pass the Vendor,Name to delete a Template!} {--silent}";

    protected $description = "In Order to delete a template digit --vendor-name=Vendor,Name";

    /**
     * @var \App\Services\TemplateDeleteCompiler
     */
    protected $compiler;

    public function __construct(TemplateDeleteCompiler $compiler)
    {
        parent::__construct();
        $this->compiler = $compiler;
    }

    public function handle() {
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
                $this->execDelete($vendor,$name);
            }
            else {
                $this->info("Ok, try again! see ya!");
            }

        } else {
            $this->execDelete($vendor,$name);
        }
    }

    protected function execDelete($vendor, $name) {
        // get the Name sanitize
        $name = $this->extrapolateName($name);
        // check if folder really exist
        $this->checkIfPathNotExists($vendor,$name,"Template");

        $this->compiler->setVendorName($vendor,$name)
            ->deleteAutoloadFromComposer()
            ->deleteBaseDirectory();

        // final info
        $this->info('Please, be sure to make the composer dump-autoload!');
    }
}