<?php
/**
 * User: hernan
 * Date: 02/05/2018
 * Time: 11:20
 */

namespace App\Services;


use App\Exceptions\VNException;

class TemplatePlugCompiler extends AbstractTemplateCompiler {

    /**
     * @var \App\Services\PluginsConfigCompiler
     */
    protected $plugConfig;

    public function __construct(PluginsConfigCompiler $compiler)
    {
        parent::__construct();

        $this->plugConfig = $compiler;

    }

    public function writingPluginInConfig($vendorP,$nameP) {

        $listPlugin = $this->plugConfig->getArrayDataPlugins()['plugins'];
        $i = @$this->getIndexFromPlugins($vendorP,$nameP,$listPlugin);
        $version = $listPlugin[$i]['version'];

        if(!$this->configJson->hasPlugin($vendorP,$nameP)) {
            $this->configJson->setPlugin($vendorP,$nameP,$version);
        } else
        {
            $versionPlug = $this->configJson->getPlugin($vendorP,$nameP);
            if($version ==$versionPlug) {
                throw new VNException("Plugin already present into the Template with the same version");
            }
            else {
                $this->configJson->setPlugin($vendorP,$nameP,$version);
            }
        }
        $this->configJson->save();

        return $this;
    }


    public function deletingPluginInConfig($vendorP,$nameP) {

        if($this->configJson->hasPlugin($vendorP,$nameP)) {
            $this->configJson->unsetPlugin($vendorP,$nameP);
        }
        else {
            throw new VNException("Plugin not present into the Template");
        }

        $this->configJson->save();

        return $this;
    }

    /**
     * This function return index of Array Plugins
     * @return int
     */
    protected function getIndexFromPlugins($vendor,$name,$list)
    {
        return $this->plugConfig->getIndexFromPlugins($list,$vendor,$name);
    }


}