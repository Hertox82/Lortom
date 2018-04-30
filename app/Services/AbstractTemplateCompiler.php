<?php
/**
 * User: hernan
 * Date: 23/04/2018
 * Time: 15:33
 */

namespace App\Services;


use App\Services\Traits\ActionCommand;
use File;

abstract class AbstractTemplateCompiler
{
    use ActionCommand;

    /**
     * the Vendor of Template
     * @var
     */
    protected $vendor;

    /**
     * The Name of Template
     * @var
     */
    protected $name;

    /**
     * the Base path of all Template
     * @var string
     */
    protected $basePath;


    /**
     * the Base path of Template
     * @var string
     */
    protected $baseTemplatePath;



    public function __construct()
    {
        $this->basePath = app_path().'/../template/';
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
    protected function setBasePath(){

        $this->baseTemplatePath = $this->basePath.$this->vendor.'/'.$this->name;

        return $this;
    }

    /**
     * This function create the base directories of template
     * @return $this
     */
    public function createBaseDirectory() {

        $this->setBasePath();

        $this->createTemplateDirectory($this->basePath.$this->vendor,$this->baseTemplatePath);

        return $this;
    }

    /**
     * This function delete the Template Folders
     * @return $this
     */
    public function deleteBaseDirectory() {

        //set the basePath Lortom/template/
        $this->setBasePath();
        //delete the folder relative to Template
        $this->deleteDir($this->baseTemplatePath);
        //if the vendor hasn't any other folder, delete it
        if($this->isEmptyFolder($this->basePath.$this->vendor)) {
            $this->deleteDir($this->basePath.$this->vendor);
        }

        return $this;
    }

}