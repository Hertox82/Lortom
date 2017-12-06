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

    public static function getFieldValue($field)
    {
        $return = [];

        if($field == 'idParent')
        {
           //treeview for idParent
            $return = self::treeView();

        }
        else if($field === 'idPage') {

            $return[] = ['id' => null, 'label' => 'nothing'];
            $return = array_merge($return,self::getPages());

        }
        else if($field == 'parentList')
        {
            $list = self::treeView();

            foreach ($list as $item)
            {
                $return[] = ['id' => $item['id'], 'label' => str_replace("&nbsp;",'',$item['label'])];
            }
        }

        return $return;
    }


    public static function getFieldValueById($id,$field)
    {

        $list = self::getFieldValue($field);

        foreach ($list as $val)
        {
            if($val['id'] === $id)
            {
                return $val;
            }
        }

        return [];
    }


    public static function getPages()
    {
        return json_decode(json_encode(DB::table('lt_pages')->select([
            'id',
            'title'
        ])->get()),true);
    }

    public static function treeView() {

        $list = DB::table('lt_menus')->where('idParent',0)->get();

        $list = json_decode(json_encode($list),true);

        $return = [];
        $return[] = ['id' => '0', 'label' => '_root'];

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
        $label = '&nbsp;&nbsp;&nbsp;&nbsp;';
        for($i=0;$i<$level; $i++) $label = '&nbsp;&nbsp;&nbsp;&nbsp;'.$label;

        foreach ($children as $it){
            $item = ['id' => $it['id'], 'label' => $label.$it['name']];

            $List = self::searchChild($List,$item,($level+1));
        }

        return $List;
    }

    public function getMyChildren($id)
    {
        $listChild = DB::table('lt_menus')->where('idParent',$id)->select('id')->get();

        $listChild = json_decode(json_encode($listChild),true);

        $result = [];

        foreach ($listChild as $child)
        {
            $result[] = $child['id'];
            $result = array_merge($result,$this->getMyChildren($child['id']));
        }

        return $result;
    }
}

