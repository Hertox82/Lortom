<?php
/**
 * User: hernan
 * Date: 24/04/2018
 * Time: 15:29
 */


namespace App\Services\Traits;

use File;



trait ActionCommand {

    protected $stub= '';

    /**
     * Create template directories
     * @param $path
     */
    protected function createDirIfNotExist($path) {
        //Check if exist component folder
        if(! File::exists($path))
        {
            File::makeDirectory($path,0777,true);
        }
    }

    /**
     * Delete template directories
     * @param $path
     */
    protected function deleteDir($path) {
        if(is_dir($path)) {
            File::deleteDirectory($path);
        }
    }


    /**
     * Function Check if the Base Directory  exist if not exist create them
     */
    protected function createTemplateDirectory($basePathVendor, $baseVendorNamePath)
    {
        //create the vendor folder
        $this->createDirIfNotExist($basePathVendor);

        //create the name of template folder
        $this->createDirIfNotExist($baseVendorNamePath);
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
     * Function return the Stub
     * @return string
     */
    protected function getStub()
    {
        return $this->stub;
    }

    /**
     * This function write into a file
     * @param $file
     * @param $content
     */
    protected function compile($file, $content)
    {
        File::put($file,$content);
    }

}