<?php
/**
 * Created by PhpStorm.
 * User: hernan
 * Date: 19/10/2017
 * Time: 15:07
 */

namespace App\Services;

use File;

class PluginUpdateCompiler extends AbstractPlugin
{

    public function update()
    {
        //store the path into the variable
        $this->basePluginPath = $this->basePath.$this->vendor.'/'.$this->name;

        $path = $this->basePluginPath.'/plugin_config.php';
        //retrive the content of file
        $plugSelfConfig = File::get($path);

        //delete and update and compile the config/plugins.php
        $this->compilePlugin($plugSelfConfig,true);

        //I need to know the index of Elements into the plugins in order to set the Service Provider
        $i = $this->getIndexFromPlugins();

        //retrive the Name of ServiceProvider
        $ServiceProvider =  @$this->getArrayDataPlugins()['plugins'][$i]['serviceProvider'];


        if($ServiceProvider != $this->getNameServiceProvider())
        {
            $this->ServiceProvider = $this->getNameServiceProvider();
        }
        else {
            $this->ServiceProvider = $ServiceProvider;
        }


        $appConfig = require config_path('app.php');

        //cycle through the array in order to find the ServiceProvider to delete it.
        $appConfig = $this->removeDataFromApp($appConfig);

        $appConfig['providers'][] = $ServiceProvider;

        $this->compileServiceInApp($appConfig);

    }

    public function updatePermission(){

        $this->updatePermissionByCompiler();
    }

   public function migration($kind)
   {
       $function = "migration{$kind}ByCompiler";

       $this->$function();
   }
}