<?php
/**
 * Created by PhpStorm.
 * User: hernan
 * Date: 18/10/2017
 * Time: 10:02
 */

namespace App\Services;

use File;

class PluginRoutingCompiler
{
    /**
     * This file is to store the Config Plugin Data
     * @var array
     */
    private $data = [];

    /**
     * This is the main file to compile
     * @var string
     */
    private $fileName = 'app.routing.ts';



    public function write($data = []){

        $this->data = [];

        $this->data = $data;

        $appRouting = $this->compile();

        $path = app_path().'/../angular-backend/src/app/';

        $fullPath = $path.$this->fileName;

        File::put($fullPath,$appRouting);
    }

    private function compile()
    {
        $stub = "import {Routes, RouterModule} from \"@angular/router\"; \n";
        $stub.= "import {ModuleWithProviders} from \"@angular/core\"; \n";

        // Qui va ciclato l'array e va inserito dentro il contenuto di data

        $stub.= "\n";
        $stub.= "const routes: Routes = [ \n";
        $stub.= "       {path: 'backend', redirectTo:'backend/dashboard', pathMatch: 'full'}, \n";
        $i= 0;
        $length = count($this->data);
        foreach ($this->data as $plug)
        {
            $moduleName = $plug['moduleName'];
            $moduleName = str_replace('.',' ',$moduleName);
            $moduleName = str_replace(' ','',ucwords($moduleName));

            $stub.= "       {path: 'backend{$plug['routingPath']}' , loadChildren:'../plugins/{$plug['vendor']}/{$plug['PluginName']}/{$plug['moduleName']}#{$moduleName}'}";

            if($i < ($length-1)){
                $stub.= ",";
            }
            $stub.="\n";
            $i++;
        }

        $stub.= "]; \n";

        $stub.= "export const routing: ModuleWithProviders = RouterModule.forRoot(routes);";

        return $stub;
    }
}