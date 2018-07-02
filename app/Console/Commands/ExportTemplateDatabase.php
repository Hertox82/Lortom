<?php
/**
 * User: hernan
 * Date: 28/06/2018
 * Time: 15:59
 */

namespace App\Console\Commands;

use App\Console\Commands\LortomCommand as Command;
use File;
use Illuminate\Support\Facades\Artisan;


class ExportTemplateDatabase extends Command {

    protected $signature = "lortom-template:expdb";

    protected $description = "In Order export component from db, it will take the active template";


    public function handle() {

        //search the active template and pass the right path to place the migration and seeder
        $TemplateBasePath = ltpm()->basePathActiveTemplate();
        $this->info('check for active template');

        //check if path exists
        $databasePath = $TemplateBasePath.'/database';

        $migrations = $databasePath.'/migrations';

        $this->line('prova delle prove');
        $this->comment('finding folder to export migrations and seeds');
        if(!$this->checkIfExist($databasePath,$migrations)) {
            File::makeDirectory($databasePath,0777,true);
            if(!$this->checkIfExist($databasePath,$migrations)) {
                File::makeDirectory($migrations,0777,true);
            }
        }

        $seeder = $databasePath.'/seeder';

        if(!$this->checkIfExist($databasePath,$seeder))
            File::makeDirectory($seeder,0777,true);


        //passing runtime the path of current template
        config(['dbexporter.exportPath.migrations' => $migrations.'/']);
        config(['dbexporter.exportPath.seeds' => $seeder.'/']);
        config(['dbexporter.exportPath.seeder.namespace' => 'namespace '.ltpm()->getNamespaceActiveTemplate().';']);
        $this->info('processing at runtime...');

        $selectTable = 'lt_pages,lt_components,lt_page_component';

        Artisan::call('dbexp:all',['--select'=> $selectTable]);

        $this->comment('Finish to export migrations and seeds');
    }

}