<?php
/**
 * Created by PhpStorm.
 * User: hernan
 * Date: 19/10/2017
 * Time: 15:07
 */

namespace App\Services;



class PluginUpdateCompiler extends AbstractPlugin
{
    public function update()
    {
        //before update the file i need to delete reference on plugins.php
        $pl_load = require config_path('plugins.php');

        //store in this variable the array plugins
        $listPlugins = $pl_load['plugins'];

        //remove the old reference from config/plugins.php
        $listPlugins = $this->removeDataFromPlugins($listPlugins);

        $this->basePluginPath = $this->basePath.$this->vendor.'/'.$this->name;

        $path = $this->basePluginPath.'/plugin_config.php';
        $plugSelfConfig = require  $path;

        if(strlen($this->ServiceProvider) == 0)
        {
            $this->ServiceProvider = $plugSelfConfig['plugins']['serviceProvider'];
        }

        //added to the array the new references
        $listPlugins[] = $plugSelfConfig['plugins'];

        //and finally write the config/plugins.php
        $this->compilePlugin($listPlugins);

        $appConfig = require config_path('app.php');

        //cycle through the array in order to find the ServiceProvider to delete it.
        $appConfig = $this->removeDataFromApp($appConfig);

        $appConfig['providers'][] = $plugSelfConfig['plugins']['serviceProvider'];

        $this->compileServiceInApp($appConfig);
    }
}