<?php
/**
 * User: hernan
 * Date: 17/10/2017
 * Time: 14:46
 */

namespace App\Services;

use File;
use DB;

class PluginsConfigCompiler
{
    /**
     * chiave per scrivere sul file config plugins.php
     * @var string
     */
    private $storedKey = 'plugins';


    private $dataRaw = '';


    private $arrayDataPlugins = [];

    private $filePlugins = '';


    public function __construct()
    {
        $this->loadPlugins();
    }

    public function getArrayDataPlugins()
    {
        return $this->arrayDataPlugins;
    }


    public function write($dataRaw = '',$vendor,$name,$i = null)
    {
        $pluginsDefaultPath = app_path().'/../angular-backend/src/plugins/';
        $this->dataRaw = '';

        if(count($this->arrayDataPlugins) == 0)
        {
            $this->cleanRawData($dataRaw)->extrapolate();
        }
        else{


            if($this->isPluginInserted($vendor,$name,$this->arrayDataPlugins['plugins']))
            {
                //cancella
                if(!is_null($i))
                    self::removeDataFromPlugin($this->arrayDataPlugins['plugins'],$i);
            }

            $this->insertOldData($this->arrayDataPlugins,$pluginsDefaultPath)
                 ->cleanRawData($dataRaw)
                 ->extrapolate();
        }

        $this->loadPlugins();
    }

    public function insertOldData($arrayData,$defaultPath)
    {
        foreach ($arrayData['plugins'] as $pl)
        {
            $path = "{$defaultPath}{$pl['vendor']}/{$pl['PluginName']}/plugin_config.php";
            $plDataRaw = File::get($path);
            $this->cleanRawData($plDataRaw);
        }

        return $this;
    }

    public function getIndexFromPlugins($arrayElem,$vendor,$name)
    {
        $length = count($arrayElem);

        //search for the plugins and remove it from array
        for($i=0; $i<$length;$i++)
        {
            if($arrayElem[$i]['vendor'] === $vendor && $arrayElem[$i]['PluginName'] === $name)
            {
                return $i;
            }
        }
    }

    public static function removeDataFromPlugin(&$arrayElem,$i)
    {
        //remove the element from array
        array_splice($arrayElem,$i,1);

    }

    private function cleanRawData($dataRaw = '')
    {
        if(strlen($dataRaw)> 0)
        {
            //replace the string <?php with nothing
            $return = str_replace("<?php", '', $dataRaw);
            //remove the ; at the end of the file
            $return = rtrim($return, ';');
            //add the , at the end of the file
            $return .= ", \n";
            //store the data into a variable
            $this->dataRaw .= $return;
        }

        return $this;
    }

    private function extrapolate()
    {
        //take filePath
        $path = __DIR__.'/stub/plugins.php.stub';
        //extract the content
        $pluginsRaw = File::get($path);
        //replace the content with dataRaw
        $pluginsRaw = str_replace('#content#',$this->dataRaw,$pluginsRaw);

        //Write the file
        File::put(config_path('/plugins.php'),$pluginsRaw);
    }

    public function loadPlugins()
    {
        $this->arrayDataPlugins = [];

        if(File::exists($this->filePlugins = config_path('/plugins.php')))
        {
            $this->arrayDataPlugins = require $this->filePlugins;
        }

        return $this;
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

    public function updatePermission($vendor,$namePlugin)
    {
        $this->loadPlugins();

        //list not reduced
        $listaPermessi = array_filter(array_map_collection(function($item)use($vendor,$namePlugin){
            if($item['vendor'] === $vendor and $item['PluginName'] === $namePlugin){
                $lista [] = $item['permission'];
                $lista2 = array_map(function($m) {
                    return $m['permission'];
                },$item['subMenu']);
                return array_merge($lista,$lista2);
            }
        },$this->arrayDataPlugins['plugins']));

        //Santized list of Permissions
        $listaSanitize = array_reduce($listaPermessi,function($carry,$item){
           return  $item;
        });
        $Permission = DB::table('lt_permissions')->where('name','like','%'.$vendor.'.'.$namePlugin.'%')->get();

        pr($Permission,1);
    }
}