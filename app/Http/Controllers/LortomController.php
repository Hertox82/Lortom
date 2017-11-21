<?php
/**
 * User: hernan
 * Date: 21/11/2017
 * Time: 14:42
 */

namespace App\Http\Controllers;


use Illuminate\Routing\Controller as BaseController;
use DB;

class LortomController extends BaseController
{

    protected $functionName;



    protected function getList($options)
    {
        extract($options);

        $function = $this->functionName;

        return [$responseKey => $function()->sanitizeItem($Class,$name)];
    }

    /*protected function storeObj($options)
    {
        extract($options);

        $function = $this->functionName;

        $Obj = $function()->saveObject($Class,$type,$input,$ToSave);

        return [$responseKey => $function()->getItemSerialized($name,$Obj)];
    }*/

    protected function storeObj($options){

        extract($options);

        $function = $this->functionName;

        $Obj = $function()->saveObject($Class,$type,$input,$ToSave);

        $tables = array_keys($subTables);

        foreach ($tables as $t)
        {
            $insert = $function()->subTable($subTables[$t]['lista'],$Obj->id,$subTables[$t]['subTableKey']);

            if(! empty($insert))
                DB::table($t)->insert($insert);
        }

        return [$responseKey => $function()->getItemSerialized($name,$Obj)];
    }

    protected function deleteObj($options)
    {
        extract($options);

        $table = array_keys($tableCol);

        $function = $this->functionName;

        foreach ($input as $it)
        {
            $idIn = $it['id'];

            foreach ($table as $t)
            {
                $col = $tableCol[$t];

                DB::table($t)->where($col,$idIn)->delete();
            }
        }

        return [$responseKey => $function()->sanitizeItem($Class,$name)];
    }
}