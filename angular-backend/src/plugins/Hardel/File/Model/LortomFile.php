<?php
/**
 * User: hernan
 * Date: 02/11/2018
 * Time: 10:35
 */


namespace Plugins\Hardel\File\Model;

use Illuminate\Database\Eloquent\Model;
use DB;



class LortomFile extends Model {

    protected $table = 'lt_file';

    public function objects() {
       return DB::table('lt_file_object')
           ->where('idFile',$this->id)
           ->get();

    }

    /**
     * This function is in order to get the Object related to file
     * @param $id
     * @param $Obj
     * @return mixed
     */
    public static function getObject($id,$Obj) {

        return call_user_func_array([$Obj,'find'],[$id]);
    }

    /**
     * This function return the path of file.
     * @return string
     */
    public function getSrc() {

        return "{$this->path}{$this->fileName}.{$this->extension}";
    }

    /**
     * This function return realPath
     * @return string
     */
    public function getRealPath() {
        return public_path()."{$this->getSrc()}";
    }

    /**
     * This function return an array of Obj
     * @return array
     */
    public function getListObj() {
        $listObj = [];
        $arrayObj = $this->objects();

        foreach ($arrayObj as $obj) {
            $mObject = new \stdClass();
            //$model = self::getObject($obj->idObj,$obj->typeObj);

            $mObject->id = $obj->id;
            $mObject->typeObj = $obj->typeObj;
            $mObject->position = $obj->position;
            $mObject->description = $obj->description;
            $listObj[] = $mObject;
        }

        return $listObj;
    }

    /**
     * This function return the Type by Extension
     * 
     */
    public function getTypeByExtension($ext = '') {

            $type = '';

            if($this->extension !== null) {
                $ext = $this->extension;
            }

            switch($ext) {
                case 'jpg':
                case 'jpeg':
                case 'png':

                $type = 'image';
                break;

                case 'xls':
                case 'xlsx':
                case 'pdf':
                 $type = 'document';
                 break;
                
            }

            return $type;
    }
}

