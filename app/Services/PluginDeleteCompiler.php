<?php
/**
 * Created by PhpStorm.
 * User: hernan
 * Date: 19/10/2017
 * Time: 11:30
 */

namespace App\Services;

use File;

class PluginDeleteCompiler extends AbstractPlugin
{
    protected $ServiceProvider;

    /**
     * This function delete all references of Plugin
     */
    public function delete()
    {
        //Delete Folder of Name plugin

        $this->basePluginPath = $this->basePath.$this->vendor.'/'.$this->name;
        if(is_dir($this->basePluginPath)) {
            File::deleteDirectory($this->basePluginPath);
        }

        $i= $this->getIndexFromPlugins();

        $this->ServiceProvider = @$this->getArrayDataPlugins()['plugins'][$i]['serviceProvider'];

        if(strlen($this->ServiceProvider) == 0)
        {
            $this->ServiceProvider = $this->getNameServiceProvider();
        }

        //Delete from config/plugins.php
        $this->deleteFromPlugins($i);

        //Delete from config/app.php
        $this->deleteFromApp();
    }


    /**
     * This function delete References of Plugin from config/plugins.php
     */
    public function deleteFromPlugins($i)
    {
        //now recompile the plugins.php
        $this->compilePlugin('',$i);
    }

    /**
     * This function delete references of Plugin from config/app.php
     */
    private function deleteFromApp()
    {
        //Check if developer pass manually the name of ServiceProvider

        $appConfig = require config_path('app.php');

        //cycle through the array in order to find the ServiceProvider to delete it.
        $appConfig = $this->removeDataFromApp($appConfig);
        //Recompile the file app.php
        $this->compileServiceInApp($appConfig);
    }

}