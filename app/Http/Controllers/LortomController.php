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


    /**
     * This function get List of everything
     * @param $options
     * @return array
     */
    protected function getList($options)
    {
        //extract the array and do available a variables
        extract($options);

        //store my function into a variable
        $function = $this->functionName;

        return [$responseKey => $function()->sanitizeItem($Class,$name)];
    }


    /**
     * This function Create and Update a certain type of Model and the SubTable
     * @param $options
     * @return array
     */
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

    /**
     * This function delete a certain type of Model
     * @param $options
     * @return array
     */
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