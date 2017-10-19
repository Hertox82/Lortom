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
    private function deleteFromPlugins()
    {
        //load the plugins.php
        $pl_load = require config_path('plugins.php');

        //store in this variable the array plugins
        $listPlugins = $pl_load['plugins'];

        //recive from getElementFromPlugins the index and the element of this plugin
        list($i,$el) = $this->getElementFromPlugins($listPlugins);

        //store in this variable the ServiceProvider
        $this->ServiceProvider = $el['serviceProvider'];

        //remove the element from array
        array_splice($listPlugins,$i,1);

        //now recompile the plugins.php
        $compiler = new PluginsConfigCompiler();
        $compiler->extrapolate($listPlugins);

    }

    /**
     * This function delete references of Plugin from config/app.php
     */
    private function deleteFromApp()
    {
        //Check if developer pass manually the name of ServiceProvider

        $appConfig = require config_path('app.php');

        //cycle through the array in order to find the ServiceProvider to delete it.

        foreach ($appConfig as $item => $valore)
        {

            if($item == 'providers')
            {
                $length = count($appConfig[$item]);
                for($i=0;$i<$length; $i++)
                {
                    if($appConfig[$item][$i] == $this->ServiceProvider)
                    {
                        array_splice($appConfig[$item],$i,1);
                        break;
                    }
                }
            }
        }

        //Recompile the file app.php
        $this->compileServiceInApp($appConfig);
    }

}