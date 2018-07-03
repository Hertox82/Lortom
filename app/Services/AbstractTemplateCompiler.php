<?php
/**
 * User: hernan
 * Date: 23/04/2018
 * Time: 15:33
 */

namespace App\Services;


use App\Services\Traits\ActionCommand;
use File;

abstract class AbstractTemplateCompiler extends BaseTemplate
{
    use ActionCommand;

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