<?php
/**
 * User: hernan
 * Date: 26/04/2018
 * Time: 15:53
 */

namespace App\Console\Commands;

use App\Console\Commands\LortomCommand as Command;
use LTFramework\Services\TemplateDeleteCompiler;
use App\Services\Traits\ActionCommand;
use App\Exceptions\VNException;
use File;

class DeleteTemplate extends Command{

    use ActionCommand;

    protected $signature = "lortom-template:delete {--vendor-name= : Pass the Vendor,Name to delete a Template!} {--silent}";

    protected $description = "In Order to delete a template digit --vendor-name=Vendor,Name";

    /**
     * @var \LTFramework\Services\TemplateDeleteCompiler
     */
    protected $compiler;

    public function __construct(TemplateDeleteCompiler $compiler)
    {
        parent::__construct();
        $this->compiler = $compiler;
    }

    public function handle() {

        $silent = $this->option('silent');
        try {
            //get vendor and name
            list($vendor, $name) = $this->extrapolateVendorName($this->option('vendor-name'),$silent);

        }catch (VNException $e) {
            $this->error($e->getMessage());
            return;
        }


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

        $compiler = $this->compiler->setVendorName($vendor,$name)
            ->deleteAutoloadFromComposer()
            ->deleteBaseDirectory();

        //remove info from ltpm.config.json
        $this->removeTemplateFromLtpm($vendor,$name,$compiler->getVersion());


        // final info
        $this->info('Please, be sure to make the composer dump-autoload!');
    }

    protected function removeTemplateFromLtpm($vendor,$name,$version) {
        $ltpm = base_path().'/ltpm.config.json';
        if(File::exists($ltpm)) {
            $ltpmJSON =  json_decode(File::get($ltpm),true);

            for($i=0;$i<count($ltpmJSON['template']);$i++) {
                $template = $ltpmJSON['template'][$i];

                if($template['name'] === $name and $template['vendor'] === $vendor and $template['version'] === $version) {
                    break;
                }
            }

            unset($ltpmJSON['template'][$i]);

            $encoded = json_encode($ltpmJSON,JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
            File::put($ltpm,$encoded);
        }
    }
}