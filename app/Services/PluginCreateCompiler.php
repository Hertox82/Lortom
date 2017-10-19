<?php
/**
 * User: hernan
 * Date: 18/10/2017
 * Time: 11:52
 */

namespace App\Services;

use File;

class PluginCreateCompiler extends AbstractPlugin
{

    protected $componentDir  = '/component/';

    protected $controllerDir = '/Controller/';

    protected $providersDir  = '/Providers/';

    /**
     * Chunk of function for progress bar
     * @return $this
     */
    public function writingDirectory()
    {
        $this->basePluginPath = $this->createBasePluginDirectory();

        return $this;
    }

    /**
     * Chunk of function for progress bar
     * @return $this
     */
    public function writingFileComponent()
    {
        //create file into component
        $this->createFileComponent($this->basePluginPath.$this->componentDir);

        return $this;
    }

    /**
     *
     * @return $this
     */
    public function writingFileController()
    {
        //create file into controller
        $this->createFileController($this->basePluginPath.$this->controllerDir);

        return $this;
    }

    public function writingFileProviders()
    {
        //create file into Providers
        $this->createFileProviders($this->basePluginPath.$this->providersDir);

        return $this;
    }

    public function writingFileTs()
    {
        //create name.routing.ts and name.module.ts
        $this->createFileTs($this->basePluginPath.'/');

        return $this;
    }

    public function writingFilePhp()
    {
        //create routes.php and plugin_config.php
        $this->createFilePhp($this->basePluginPath.'/');

        return $this;
    }

    public function writingConfigPlugins()
    {
        //Insert configuration on plugins.php
        $this->insertConfigPlugin($this->basePluginPath.'/');

        return $this;
    }

    public function writingConfigApp()
    {

        //Insert into config/app.php  the ServiceProvider
        $this->insertServiceInApp($this->basePluginPath.'/');

        return $this;
    }


    /**
     * Function Check if the Base Directory of plugin exist if not exist create them
     */
    private function createBasePluginDirectory()
    {
        if(! File::exists($this->basePath.$this->vendor))
        {
            File::makeDirectory($this->basePath.$this->vendor,0777,true);
        }

        $basePluginPath = $this->basePath.$this->vendor.'/'.$this->name;

        if(!File::exists($basePluginPath))
        {
            File::makeDirectory($basePluginPath,0777,true);
        }

        $this->createSubFolder($basePluginPath);

        return $basePluginPath;

    }

    /**
     * Function check if subfolder of plugin exist, if not exist create them
     * @param $path
     */
    private function createSubFolder($path)
    {
        //Check if exist component folder
        if(! File::exists($path.$this->componentDir))
        {
            File::makeDirectory($path.$this->componentDir,0777,true);
        }

        //Check if exist Controller folder
        if(! File::exists($path.$this->controllerDir))
        {
            File::makeDirectory($path.$this->controllerDir,0777,true);
        }

        //Check if exist Providers folder
        if(! File::exists($path.$this->providersDir))
        {
            File::makeDirectory($path.$this->providersDir,0777,true);
        }
    }

    /**
     * Function to create File into the folder component
     * @param $path
     */
    private function createFileComponent($path)
    {
        //create name.component.html
        //read the stub
        $fileStubComponentHtml = __DIR__.'/stub/component/plugin-name.component.html.stub';
        //create the file
        $fileHtml = $path.strtolower($this->name).'.component.html';
        File::put($fileHtml,$this->setStub($fileStubComponentHtml)->getStub());

        //create name.component.ts

        $fileStubComponentTs = __DIR__.'/stub/component/plugin-name.component.ts.stub';
        $fileTs = $path.strtolower($this->name).'.component.ts';
        File::put($fileTs,
            $this->setStub($fileStubComponentTs)
            ->replaceWith('#pluginname#',strtolower($this->name))
            ->replaceWith('#Name#',$this->name)
                ->getStub());
    }

    /**
     * Function to create Controller.php into the folder Controller
     * @param $path
     */
    private function createFileController($path)
    {
        $fileStubController = __DIR__.'/stub/Controller/plugin-name.php.stub';
        $namespaceController = $this->getNamespacePhp()."\\Controller";
        $nameFile = $path.$this->name.'Controller.php';
        File::put($nameFile,
            $this->setStub($fileStubController)
                 ->replaceWith('#namespace#',$namespaceController)
                 ->replaceWith('#name#',$this->name)
                 ->getStub());
    }

    /**
     * Function  to create ServiceProvider.php into the Folder Providers
     * @param $path
     */
    private function createFileProviders($path)
    {
        $fileStubController = __DIR__.'/stub/Providers/plugin-name.php.stub';
        $namespaceController = $this->getNamespacePhp()."\\Providers";
        $nameFile = $path.$this->vendor.$this->name.'ServiceProvider.php';
        File::put($nameFile,
            $this->setStub($fileStubController)
                 ->replaceWith('#namespace#',$namespaceController)
                 ->replaceWith('#vendor-name#',$this->vendor.$this->name)
                 ->getStub());
    }

    /**
     * This function create file name.module.ts and name.routing.ts
     * @param $path
     */
    private function createFileTs($path)
    {
        //create name.module.ts
        $fileStubModule = __DIR__.'/stub/plugin-name.module.ts.stub';
        $nameFile = $path.strtolower($this->name).'.module.ts';
        File::put($nameFile,
            $this->setStub($fileStubModule)
        ->replaceWith('#Name#',$this->name)
        ->replaceWith("#pluginname#",strtolower($this->name))
        ->getStub());

        //create name.routing.ts
        $fileStubRouting =  __DIR__.'/stub/plugin-name.routing.ts.stub';
        $nameFile = $path.strtolower($this->name).'.routing.ts';
        File::put($nameFile,$this->setStub($fileStubRouting)
            ->replaceWith('#Name#',$this->name)
            ->replaceWith("#pluginname#",strtolower($this->name))
            ->getStub());

    }

    /**
     * This function create file plugin_config.php and routes.php
     * @param $path
     */
    private function createFilePhp($path)
    {
        //create plugin_config.php
        $fileStubConfigPlug = __DIR__.'/stub/plugin_config.php.stub';
        $nameFile = $path.'plugin_config.php';
        $namespaceClass = $this->getNameServiceProvider();
        File::put($nameFile,
            $this->setStub($fileStubConfigPlug)
        ->replaceWith('#Vendor#',$this->vendor)
        ->replaceWith('#Name#',$this->name)
        ->replaceWith('#pluginname#',strtolower($this->name))
        ->replaceWith('#Namespaceclass#',$namespaceClass)
        ->getStub());

        //create routes.php
        $fileStubRoutes = __DIR__.'/stub/routes.php.stub';
        $nameFile = $path.'routes.php';
        File::put($nameFile,
            $this->setStub($fileStubRoutes)->getStub());

    }



    /**
     * Function insert the configuration of Plugin into the file plugins.php
     * @param $path
     */
    private function insertConfigPlugin($path)
    {
        $file = $path.'plugin_config.php';
        $plugin_load = require $file;

        if(!file_exists(config_path('plugins.php')))
        {
            $Plugins = new PluginsConfigCompiler();
            $list[] = $plugin_load['plugins'];
            $Plugins->extrapolate($list);
        }
        else
        {
            $path = config_path('plugins.php');
            $pluginsConfig = require $path;
            $Plugins = new PluginsConfigCompiler();
            if(! $Plugins->isPluginInserted($this->vendor,$this->name,$pluginsConfig['plugins'])) {
                $pluginsConfig['plugins'][] = $plugin_load['plugins'];
                $Plugins->extrapolate($pluginsConfig['plugins']);
            }
        }
    }

    /**
     * This function insert into config/app.php into the providers, the ServiceProviders of Plugin
     * @param $basePath
     */
    private function insertServiceInApp($basePath)
    {
        $file = $basePath.'plugin_config.php';
        $plugin_load = require $file;

        $appConfig = require config_path('app.php');

        $appConfig['providers'][] = $plugin_load['plugins']['serviceProvider'];

        $this->compileServiceInApp($appConfig);

    }
}