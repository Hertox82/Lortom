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

    /**
     * variabile dove viene salvato il precedente contenuto del plugins
     * @var null
     */
    private $previousSave;

    /**
     * variabile per determinare se il file è già stato creato o no
     * @var bool
     */
    private $isNew;


    public function __construct($isNewFile = false, $previousSave = null)
    {
        $this->isNew = $isNewFile;
        $this->previousSave = $previousSave;
    }


    public function extrapolate($newContent = [])
    {
        // se il file è ancora da creare allora
        // è molto semplice

        $stub = "<?php \n";
        $stub.= "return [ \n";
        $stub.= "     '{$this->storedKey}' => [ \n";

        if($this->isNew)
        {

            $stub .= "     [ \n";
            foreach ($newContent as $key => $value)
            {
                if($key == 'serviceProvider')
                {
                    $stub .= "          '{$key}' =>  {$value}::class, \n";
                }
                else {
                    $stub .= "          '{$key}' => '{$value}', \n";
                }
            }
            $stub.= "     ], \n";


        }
        else{

            $this->previousSave[] = $newContent;

            foreach ($this->previousSave as $plug)
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
        }
        $stub.= "   ], \n";
        $stub.= "  ];";

        File::put(config_path().'/plugins.php',$stub);
    }

    public function isPluginInserted($vendor,$namePlugin)
    {
        foreach ($this->previousSave as $plug)
        {
            if($plug['vendor'] === $vendor && $plug['PluginName'] === $namePlugin)
            {
                return true;
            }
        }

        return false;
    }
}