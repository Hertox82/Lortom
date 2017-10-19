<?php
/**
 * Created by PhpStorm.
 * User: hernan
 * Date: 19/10/2017
 * Time: 11:34
 */

namespace App\Services;

use File;

abstract class AbstractPlugin
{
    /**
     * the Vendor of Plugin
     * @var
     */
    protected $vendor;

    /**
     * The Name of Plugin
     * @var
     */
    protected $name;

    /**
     * the Base path of all Plugins
     * @var string
     */
    protected $basePath;

    /**
     * this variable store the path of Plugin
     * @var string
     */
    protected $basePluginPath = '';

    /**
     * variable that store the Stub of every file
     * @var string
     */
    protected $stub = '';


    public function __construct()
    {

        $this->basePath = app_path().'/../angular-backend/src/plugins/';
    }


    /**
     * Function that set Vendor and Name of Plugin
     * @param $vendor
     * @param $name
     * @return $this
     */
    public function setVendorName($vendor, $name)
    {
        $this->vendor = $vendor;
        $this->name = $name;

        return $this;
    }


    /**
     * This function compile the Service Provider into config/app.php
     * @param array $appConfig
     */
    protected function compileServiceInApp($appConfig = [])
    {
        $pathApp = config_path('app.php');
        $appStub = __DIR__.'/stub/app_config.php.stub';
        File::put($pathApp,$this->setStub($appStub)
            ->replaceWith('#timezone#',"'{$appConfig['timezone']}'")
            ->replaceWith('#locale#',"'{$appConfig['locale']}'")
            ->replaceWith('#fallback_locale#',"'{$appConfig['fallback_locale']}'")
            ->replaceWith('#cipher#',"'{$appConfig['cipher']}'")
            ->replaceWith('#providers#',$this->createStubService($appConfig['providers']))
            ->replaceWith('#aliases#',$this->createStubAliases($appConfig['aliases']))
            ->getStub());
    }

    /**
     * This function provide to create a stub for Providers
     * @param $listaTotale
     * @return string
     */
    protected function createStubService($listaTotale)
    {
        $stub = "";

        $i=0;

        $length= count($listaTotale);


        foreach ($listaTotale as $service)
        {
            $stub.= "       {$service}::class";
            if($i<($length -1))
            {
                $stub.=",";
            }
            $stub.="\n";
            $i++;
        }
        return $stub;
    }

    /**
     * This function provide to rigenerate aliases for config/app.php
     * @param $listaAliases
     * @return string
     */
    protected function createStubAliases($listaAliases)
    {
        $stub = "";

        $i=0;

        $length=count($listaAliases);

        foreach ($listaAliases as $key => $value)
        {
            $stub.= "        '{$key}' => {$value}::class ";
            if($i<($length -1))
            {
                $stub.=",";
            }
            $stub.="\n";
            $i++;

        }
        return $stub;
    }

    /**
     * Function return the Stub
     * @return string
     */
    protected function getStub()
    {
        return $this->stub;
    }

    /**
     * Function to clear and set the Stub
     * @param $fileStub
     * @return $this
     */
    protected function setStub($fileStub)
    {
        $this->stub = '';
        $this->stub = File::get($fileStub);
        return $this;
    }

    /**
     * Function to reduce time to replace the placeholder
     * @param $search
     * @param $replace
     * @return $this
     */
    protected function replaceWith($search,$replace)
    {
        $this->stub = str_replace($search,$replace,$this->stub);

        return $this;
    }


    /**
     * This function return the Namespace in order to print into the Stub
     * @return string
     */
    protected function getNamespacePhp()
    {
        $nameSpace = "Plugins\\{$this->vendor}\\{$this->name}";

        return $nameSpace;
    }

    /**
     * This function help to get the Name of Service Provider of Plugin
     * @return string
     */
    protected function getNameServiceProvider()
    {
        return $this->getNamespacePhp()."\\Providers\\{$this->vendor}{$this->name}ServiceProvider";
    }

    /**
     * This function cycle to the arrayElem in order to find it and return index and All Element
     * @param $arrayElem
     * @return array
     */
    protected function getElementFromPlugins($arrayElem)
    {
        $length = count($arrayElem);

        //search for the plugins and remove it from array
        for($i=0; $i<$length;$i++)
        {
            if($arrayElem[$i]['vendor'] === $this->vendor && $arrayElem[$i]['PluginName'] === $this->name)
            {
                return [$i,$arrayElem[$i]];
            }
        }
    }
}