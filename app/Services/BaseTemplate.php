<?php
/**
 * User: hernan
 * Date: 02/05/2018
 * Time: 12:27
 */


namespace App\Services;


abstract class BaseTemplate {

    /**
     * This variable stored the Name of Template
     * @var string
     */
    protected $name;

    /**
     * This variable stored the Vendor of Template
     * @var string
     */
    protected $vendor;

    /**
     * This variable stored the base path
     * @var string
     */
    protected $basePath;

    /**
     * This variable stored the base path of Template
     * @var string
     */
    protected $baseTemplatePath;

    /**
     * @var \App\Services\TemplateConfigJson
     */
    protected $configJson;


    public function __construct()
    {
        $this->basePath = base_path().'/template/';
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
     * This function setting the path base of template
     * @return $this
     */
    public function  setBasePath(){

        $this->baseTemplatePath = $this->basePath.$this->vendor.'/'.$this->name;

        $this->configJson = new TemplateConfigJson($this->baseTemplatePath);

        return $this;
    }

    /**
     * This function return the Template folder path
     * @return string
     */
    public function getTemplatePath() {
        return $this->baseTemplatePath;
    }

    /**
     * This function return the Name of Template
     * @return string
     */
    public function getName() {
        return $this->name;
    }

    /**
     * This function return the Vendor of Template
     * @return string
     */
    public function getVendor() {
        return $this->vendor;
    }

    public function getVersion() {
        return $this->configJson->version;
    }

    public function getConfigJSON() {
        $this->configJson->printJSON();
    }
}