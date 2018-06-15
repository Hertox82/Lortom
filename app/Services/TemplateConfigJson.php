<?php
/**
 * User: hernan
 * Date: 02/05/2018
 * Time: 12:24
 */

namespace App\Services;

use File;

class TemplateConfigJson  {

    protected $pathConfigJson;

    protected $data;

    public function __construct($templatePath)
    {
        $this->pathConfigJson = $templatePath.'/config.json';

        $this->load();
    }

    /**
     * This function load the config.json into data array
     */
    public function load() {

        $this->data = (File::exists($this->pathConfigJson)) ? json_decode(File::get($this->pathConfigJson), true) : [];
    }

    public function __get($key) {
        if($key == 'plugins')
            return (isset($this->data[$key]['require'])) ?  $this->data[$key]['require']: [];
        else
            return isset($this->data[$key]) ? $this->data[$key] : '';

    }

    public function __set($key,$value) {
        if($key == 'plugins')
           $this->data[$key]['require'] = $value;
        else
            $this->data[$key] = $value;
    }

    /**
     * This function return if Template has a kind of Plugins
     * @param $vendor
     * @param $name
     * @return bool
     */
    public function hasPlugin($vendor,$name) {

        return key_exists($this->formatPluginName($vendor,$name),$this->data['plugins']['require']);
    }

    /**
     * This function return the Plugin
     * @param $vendor
     * @param $name
     * @return null
     */
    public function getPlugin($vendor,$name) {
        $key = $this->formatPluginName($vendor,$name);

        return isset($this->data['plugins']['require'][$key]) ? $this->data['plugins']['require'][$key] : null;
    }

    /**
     * This function set the Plugin into config.json
     * @param $vendor
     * @param $name
     * @param $version
     */
    public function setPlugin($vendor, $name, $version)
    {
        $key = $this->formatPluginName($vendor,$name);

        $this->data['plugins']['require'][$key] = $version;
    }

    /**
     * This function unset the Plugin inside the config.json
     * @param $vendor
     * @param $name
     */
    public function unsetPlugin($vendor,$name) {

        $key = $this->formatPluginName($vendor,$name);

        unset( $this->data['plugins']['require'][$key]);
    }

    /**
     * This function format the vendor @ name of the plugin
     * @param $vendor
     * @param $name
     * @return string
     */
    protected function formatPluginName($vendor,$name) {
        return "{$vendor}@{$name}";
    }

    /**
     * This function save the data into the config.json
     */
    public function save() {

        $encoded = json_encode($this->data,JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

        File::put($this->pathConfigJson,$encoded);
    }

    public function printJSON() {
        pr($this->data);
    }

}