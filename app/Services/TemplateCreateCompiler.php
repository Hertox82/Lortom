<?php
/**
 * User: hernan
 * Date: 24/04/2018
 * Time: 14:43
 */

namespace App\Services;


class TemplateCreateCompiler extends AbstractTemplateCompiler {

    protected  $modelPath = '/frontend/Model';

    /**
     * Function check if subfolder of template exist, if not exist create them
     * @param $path
     */
    protected function createSubFolder($path)
    {
        //Check if exist model folder
        $this->createDirIfNotExist($path.$this->modelPath);
    }

    /**
     * Function dedicated to the creation of folders
     * @return $this
     */
    public function writingDirectory()
    {
        $this->createBaseDirectory()->createSubFolder($this->baseTemplatePath);

        return $this;
    }

    /**
     * this function compile the file config.json into the folder
     * @return $this
     */
    public function writingConfigJSON() {
        $this->compileConfigJson();

        return $this;
    }

    /**
     * This function write model Class into the right folder
     * @return $this
     */
    public function writingModelClass() {
        $this->compileModelClass();

        return $this;
    }

    /**
     * This function write into composer.json, in autoload the Classes php
     * @return $this
     */
    public function writingAutoload() {

        $this->compileComposerJson();
        return $this;
    }

    /**
     * This function exec composer dump-autoload
     */
    public function execDumpAutoload() {
        $this->dumpAutoload();
    }


    /**
     * This function create the file config.json into a Template Folder
     */
    protected function compileConfigJson() {
        //read the stub of config.json, write into a specific file
       $this->compile($this->baseTemplatePath.'/config.json',$this->setStub(__DIR__.'/stub/template/config.json.stub')
        ->replaceWith("#vendor#",$this->vendor)
        ->replaceWith("#name#",$this->name)->getStub());
    }

    protected function compileModelClass() {
        $this->compile($this->baseTemplatePath.$this->modelPath.'/HomePage.php',$this->setStub(__DIR__.'/stub/template/home-model.php.stub')
        ->replaceWith("#namespace#",$this->getNamespacePhp())
            ->getStub());
    }

    /**
     * This function return the Namespace in order to print into the Stub
     * @return string
     */
    protected function getNamespacePhp()
    {
        $nameSpace = "{$this->vendor}\\Model";

        return $nameSpace;
    }


    /**
     * This function compile into composer.json the autoload Classes of Template
     */
    protected function compileComposerJson() {
        //read config.json
        $ConfigJson = json_decode(file_get_contents($this->basePath.'/'.$this->vendor.'/'.$this->name.'/config.json'), true);
        //adding in a list all type of autoload psr-0, psr-2, psr-4
        $listTypeAutoload = $ConfigJson['frontend']['autoload'];

        $composerJson = json_decode(file_get_contents(base_path().'/composer.json'),true);

        $listOfType = array_keys($listTypeAutoload);

        //insert inside the composer.json the new entry
        foreach ($listOfType as $type) {
            $classes = $listTypeAutoload[$type];
            if(isset($composerJson['autoload'][$type]))
            {
                $classes = $listTypeAutoload[$type];
                $composerJson['autoload'][$type] =  array_merge($composerJson['autoload'][$type],$classes);

            } else {
                $composerJson['autoload'][$type] =  $classes;
            }
        }
        $encoded = json_encode($composerJson,JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

        file_put_contents(base_path().'/composer.json',$encoded);

    }
}