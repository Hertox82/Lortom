<?php
/**
 * User: hernan
 * Date: 17/10/2017
 * Time: 14:46
 */

namespace App\Services;

use File;

class PluginsConfigCompiler
{
    /**
     * chiave per scrivere sul file config plugins.php
     * @var string
     */
    private $storedKey = 'plugins';


    public function extrapolate($newContent = [])
    {
        // se il file è ancora da creare allora
        // è molto semplice

        $stub = "<?php \n";
        $stub.= "return [ \n";
        $stub.= "     '{$this->storedKey}' => [ \n";

        foreach ($newContent as $plug)
        {

            $stub.= "  [ \n";
            foreach ($plug as $key => $value)
            {
                if($key == 'serviceProvider')
                {
                    $stub .= "          '{$key}' => {$value}::class, \n";
                }
                else {
                    $stub .= "          '{$key}' => '{$value}', \n";
                }
            }
            $stub.= "     ], \n";
        }
        $stub.= "   ], \n";
        $stub.= "  ];";


        File::put(config_path().'/plugins.php',$stub);
    }



    public function isPluginInserted($vendor,$namePlugin,$list)
    {
        foreach ($list as $plug)
        {
            if($plug['vendor'] === $vendor && $plug['PluginName'] === $namePlugin)
            {
                return true;
            }
        }

        return false;
    }
}