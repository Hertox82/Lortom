<?php
/**
 * User: hernan
 * Date: 05/12/2017
 * Time: 15:58
 */

namespace Plugins\Hardel\Website\Model;


use Illuminate\Database\Eloquent\Model;
use DB;

class LortomMenu extends Model
{
    protected $table = 'lt_menus';

    public static function gVal($field)
    {
        $return = [];

        if($field == 'idParent')
        {
           //treeview for idParent
            $return = self::treeView();

        }else if($field === 'idPage') {

        }

        return $return;
    }


    public static function gValBack($id,$field)
    {

        $list = self::gVal($field);

        foreach ($list as $val)
        {
            if($val['id'] === $id)
            {
                return $val;
            }
        }

        return [];
    }


    public static function treeView() {

        $list = DB::table('lt_menus')->where('idParent',0)->get();

        $list = json_decode(json_encode($list),true);

        $return = [];

        foreach ($list as $Parent) {
            $item = ['id' => $Parent['id'], 'label' => '&nbsp;&nbsp;&nbsp;&nbsp;'.$Parent['name']];

            $return = self::searchChild($return,$item,1);
        }

        return $return;
    }

    public static function searchChild($List, $data, $level = 0) {

        $children = DB::table('lt_menus')->where('idParent',$data['id'])->get();
        $children = json_decode(json_encode($children),true);
        $List[] = $data;
        $label = '&nbsp;&nbsp;&nbsp;&nbsp';
        for($i=0;$i<$level; $i++) $label = '&nbsp;&nbsp;&nbsp;&nbsp'.$label;

        foreach ($children as $it){
            $item = ['id' => $it['id'], 'label' => $label.$it['name']];

            $List = self::searchChild($List,$item,($level+1));
        }

        return $List;
    }
}

