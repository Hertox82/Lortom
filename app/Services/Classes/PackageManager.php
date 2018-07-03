<?php
/**
 * User: hernan
 * Date: 18/06/2018
 * Time: 09:51
 */

namespace App\Services\Classes;

use File;

class PackageManager {


    /**
     * This is a TemplateConfig JSON
     * @var null
     */
    protected $TemplateConfigJSON = null;

    /**
     * This is a Composer JSON
     * @var null
     */
    protected $ComposerJSON = null;

    /**
     * This is a Ltpm Config JSON
     * @var null
     */
    protected $LtpmConfigJSON = null;

    /**
     * This function load the Composer JSON
     * @return mixed|null
     */
    public function loadComposerJson() {
        $composerFile = base_path().'/composer.json';

        $this->ComposerJSON =  (File::exists($composerFile)) ? json_decode(File::get($composerFile),true) : null;

        return $this->ComposerJSON;
    }

    /**
     * This function Load Template Config JSON (from Template)
     * @param $vendor
     * @param $name
     * @return mixed|null
     */
    public function loadTemplateConfigJson($vendor, $name) {
        $templateFile =$this->getTemplateFolder($vendor,$name)."/config.json";

        $this->TemplateConfigJSON = (File::exists($templateFile)) ? json_decode(File::get($templateFile),true) : null;

        return $this->TemplateConfigJSON;
    }

    /**
     * This function return the Template folder path
     * @param $vendor
     * @param $name
     * @return string
     */
    public function getTemplateFolder($vendor,$name) {
        return template_path()."/{$vendor}/{$name}";
    }

    /**
     * This function write Composer JSON
     * @param $data
     */
    public function writeComposerJson($data) {
        $string = json_encode($data,JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        $composerFile = base_path().'/composer.json';
        File::put($composerFile,$string);
    }

    /**
     * This function return the File Name of compressed Plugin/Template
     * @param $vendor
     * @param $name
     * @param $version
     * @param bool $isPlugin
     * @return string
     */
    public function getFileName($vendor,$name,$version,$isPlugin = true) {

        return ($isPlugin) ?  "{$vendor}-{$name}-{$version}.tgz" : "{$vendor}-{$name}-{$version}_t.tgz";
    }


    /**
     * This function return a List of Plugin
     * @param $vendor
     * @param $name
     * @return array
     */
    public function getListOfPluginsInTemplate($vendor, $name) {
        if(!$this->TemplateConfigJSON)
            $this->loadTemplateConfigJson($vendor,$name);

        $listPls = ($this->TemplateConfigJSON) ? $this->TemplateConfigJSON['plugins']['require'] : [];

        $return = [];

        foreach ($listPls as $vendorName => $version) {
            list($vendor,$name) = explode("@",$vendorName,2);

            $return[] = ['vendor' => $vendor, 'name' => $name, 'version' => $version];
        }

        return $return;
    }


    /**
     * This function return a list of Type Autoload for Composer JSON
     * @param $vendor
     * @param $name
     * @return mixed
     */
    public function getAutoloadInfo($vendor, $name) {
        if(!$this->TemplateConfigJSON)
            $this->loadTemplateConfigJson($vendor,$name);

        return ($this->TemplateConfigJSON) ? $this->TemplateConfigJSON['frontend']['autoload'] : [];
    }


    /**
     * This function write the Autoload of Template into Composer
     * @param $vendor
     * @param $name
     */
    public function addAutoloadInComposer($vendor, $name) {

        $this->addAndRemoveAutoloadFromComposer($vendor,$name);
    }


    /**
     * This function remove the Autoload of Template from Composer.json
     * @param $vendor
     * @param $name
     */
    public function removeAutoloadFromComposer($vendor, $name) {

        $this->addAndRemoveAutoloadFromComposer($vendor,$name,false);
    }


    public function getModelsFromActiveTemplate() {

        $templateActive = $this->getActiveTemplate();

        $this->loadTemplateConfigJson($templateActive['vendor'],$templateActive['name']);

        $result = [];

        foreach ($this->TemplateConfigJSON['models'] as $Class) {
            $function = new \ReflectionClass($Class);

            $listOfObject = $function->getMethods(\ReflectionMethod::IS_STATIC);
            $label = explode('\\',$Class);
            $label = $label[count($label)-1];

            $result[$Class]['label'] = $label;
            foreach ($listOfObject as $object) {
                $result[$Class]['functions'][] = $object->name;
            }
        }

        return $result;
    }

    protected function getActiveTemplate() {

        $this->config();

        return getObjectFromValueKey($this->LtpmConfigJSON['template'],'active',true);
    }

    protected function addAndRemoveAutoloadFromComposer($vendor,$name,$add=true){
        //load info "autoload" from config.json into the Template Folder
        $AutoLoadInfo = $this->getAutoloadInfo($vendor,$name);

        //if the Composer.json not yet loaded, try to load it.
        if(!$this->ComposerJSON)
            $this->loadComposerJson();

        // get the Key (ex: psr-4 etc etc)
        $listOfTypes = array_keys($AutoLoadInfo);

        // Iterate over the type of autoload
        foreach ($listOfTypes as $type) {
            if(isset($this->ComposerJSON['autoload'][$type])) {
                $NameComposer = array_keys($this->ComposerJSON['autoload'][$type]);
                $NameConfigJSON = array_keys($AutoLoadInfo[$type]);
                foreach ($NameConfigJSON as $name) {

                    if(!$add) {
                        if (in_array($name, $NameComposer)) {
                            unset($this->ComposerJSON['autoload'][$type][$name]);
                        }
                    } else {
                        if(!in_array($name,$NameComposer))
                        {
                            $this->ComposerJSON['autoload'][$type][$name] = $AutoLoadInfo[$type][$name];
                        }
                    }
                }
            }
        }

        $this->writeComposerJson($this->ComposerJSON);
    }

    /**
     * This function return ltpm.config.json in array
     * @return mixed|null
     */
    public function config() {
        $path = base_path().'/ltpm.config.json';

        $this->LtpmConfigJSON = (File::exists($path)) ? json_decode(File::get($path),true) : null;

        return $this->LtpmConfigJSON;
    }

    /**
     * This function return basePathActiveTemplate
     * @return string
     */
    public function basePathActiveTemplate() {

        $templateActive = $this->getActiveTemplate();

        return $this->getTemplateFolder($templateActive['vendor'],$templateActive['name']);
    }


    /**
     * Return the Namespace of Active Template
     * @return string
     */
    public function getNamespaceActiveTemplate() {

        $templateActive = $this->getActiveTemplate();

        $vendor = $templateActive['vendor'];
        $name = $templateActive['name'];

        return "$vendor\\$name";
    }

    /**
     * This function return Active Template Config json
     * @return mixed|null
     */
    public function getActiveTemplateConfigJSON() {

        $templateActive = $this->getActiveTemplate();

        return $this->loadTemplateConfigJson($templateActive['vendor'],$templateActive['name']);
    }
}