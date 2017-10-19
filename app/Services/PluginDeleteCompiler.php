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
        File::deleteDirectory($this->basePluginPath);

        //Delete from config/plugins.php
        $this->deleteFromPlugins();

        //Delete from config/app.php
        $this->deleteFromApp();
    }


    /**
     * This function delete References of Plugin from config/plugins.php
     */
    public function deleteFromPlugins()
    {
        //load the plugins.php
        $pl_load = require config_path('plugins.php');

        //store in this variable the array plugins
        $listPlugins = $pl_load['plugins'];

        $listPlugins = $this->removeDataFromPlugins($listPlugins);

        //now recompile the plugins.php
        $this->compilePlugin($listPlugins);

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