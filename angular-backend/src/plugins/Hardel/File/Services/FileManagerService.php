<?php
/**
 * User: hernan
 * Date: 05/11/2018
 * Time: 12:00
 */


namespace Plugins\Hardel\File\Services;


use Plugins\Hardel\File\Model\LortomFile;
use DB;

class FileManagerService {


    /**
     * @var array
     */
    protected $plugins;

    /**
     * @var array
     */
    protected $models;


    public function __construct()
    {
        $this->loadPlugins();
    }


    /**
     * This function load the Plugins into array
     */
    public function loadPlugins() {

        $array = config('plugins');
        $this->plugins =  ($array) ? $array['plugins'] : [];
    }


    /**
     * This function return array of Models
     * @return array
     */
    public function getModels() {

        $this->refreshModels();
        $this->loadModels();

        return $this->models;
    }

    /**
     * This function read from source the models
     */
    protected function loadModels() {

        foreach ($this->plugins as $plugin) {
            if(isset($plugin['model'])) {
                $model = $plugin['model'];

                if(is_string($model)) {
                    $this->models[] = $model;
                }
                else {
                    if(is_array($model)) {
                        foreach ($model as $m) {
                            $this->models[] = $m;
                        }
                    }
                }
            }
        }
    }

    /**
     * This function refresh the Models
     */
    protected function refreshModels() {
        $this->models = [];
    }

    /**
     * This function return Model and Aliases
     * @return array
     */
    public function getModelAlias() {

        $this->getModels();

        $return = [];

        foreach ($this->models as $model) {

            $array = explode('\\',$model);

            $alias = $array[count($array)-1];

            $return[] = [
                'alias' => $alias,
                'model' => $model
            ];
        }

        return $return;
    }

    /**
     * This function return a File passing idObj and Model
     * @param $idObj
     * @param $class
     * @return array
     */
    public function getFileByObj($idObj, $class) {

        $where = [
            ['lt_file_object.idObj',$idObj],
            ['lt_file_object.typeObj',$class]
        ];

        $collectionFiles = DB::table('lt_file_object')
            ->where($where)
            ->select('idFile')
            ->get();

        $arrayFile = [];

        foreach ($collectionFiles as $objFile) {

            $file = LortomFile::find($objFile->idFile);

            if($file)
                $arrayFile[] = $file;
        }

        return $arrayFile;
    }

    
}


