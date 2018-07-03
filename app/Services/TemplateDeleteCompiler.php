<?php
/**
 * User: hernan
 * Date: 30/04/2018
 * Time: 09:54
 */

namespace App\Services;


class TemplateDeleteCompiler extends AbstractTemplateCompiler {

    public function deleteAutoloadFromComposer() {
        //leggere l'autoload da cancellare
        $ConfigJson = json_decode(file_get_contents($this->basePath.'/'.$this->vendor.'/'.$this->name.'/config.json'), true);

        //adding in a list all type of autoload psr-0, psr-2, psr-4
        $listTypeAutoload = $ConfigJson['frontend']['autoload'];

        //reading the composer.json in ordert to find autoload
        $composerJson = json_decode(file_get_contents(base_path().'/composer.json'),true);

        // list of type: psr-0, psr-2, psr-4
        $listOfType = array_keys($listTypeAutoload);

        //remove the classes from autoload
        foreach ($listOfType as $type) {
            $classes = $listTypeAutoload[$type];
            if(isset($composerJson['autoload'][$type])) {
                foreach ($classes as $key => $value) {
                    if(isset($composerJson['autoload'][$type][$key])) {
                        unset($composerJson['autoload'][$type][$key]);
                    }
                }
            }
        }
        //compile de composer.json
        $encoded = json_encode($composerJson,JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

        //writing contento into file.
        file_put_contents(base_path().'/composer.json',$encoded);

        return $this;
    }
}