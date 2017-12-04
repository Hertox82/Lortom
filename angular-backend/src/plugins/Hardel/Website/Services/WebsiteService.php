<?php
/**
 * User: hernan
 * Date: 21/11/2017
 * Time: 09:57
 */

namespace Plugins\Hardel\Website\Services;

use Plugins\Hardel\Website\Model\LortomElement;
use Plugins\Hardel\Website\Model\LortomComponent;
use Plugins\Hardel\Website\Model\LortomPages;

class WebsiteService{


    /**
     * This function return a List of All Items
     * @param $Class
     * @param $Name
     * @return array
     */
    public function sanitizeItem($Class, $Name)
    {
        $listOfAllItem = $Class::all();

        return $this->getList($Class,$Name,$listOfAllItem);
    }

    /**
     * This function return a list Of Items
     * @param $Class
     * @param $name
     * @param $arrayList
     * @return array
     */
    public function getList($Class,$name,$arrayList)
    {
        return array_filter(array_map_collection(function($el)use($Class,$name){
            if($el instanceof $Class)
            {
               return $this->getItemSerialized($name,$el);
            }
        },$arrayList));
    }

    /**
     * This function call the appropriate function in order to serialize Items
     * @param $name
     * @param $Obj
     * @return mixed
     */
    public function getItemSerialized($name, $Obj)
    {
        $function = "get{$name}Serialized";

        return $this->$function($Obj);
    }

    public function saveObject($Class, $name, $input, $toSave)
    {
        //retrive list of Keys
        $keys = array_keys($input);

        $Obj = null;

        if($name == 'Edit')
        {
            $Obj = $Class::find($input['id']);
        }
        else
        {
            $Obj = new $Class();
        }

        foreach ($keys as $k)
        {
            if(in_array($k,$toSave))
            {
                $function = "checkProperty{$name}";
                $Obj->$function($k,$input);
            }
        }

        $Obj->save();

        return $Obj;
    }

    public function subTable($listOfItem,$id,$ToSave)
    {
        $keys = array_keys($ToSave);

        $insert = array_filter(array_map(function($item)use($id,$ToSave,$keys){
            $return = [];

            foreach ($keys as $k)
            {
                if($ToSave[$k])
                {
                    $return[$k] = $item['id'];
                }
                else
                {
                    $return[$k] = $id;
                }
            }
            return $return;
        },$listOfItem));

        return $insert;
    }

    protected function getSubElementSerialized(\stdClass $element)
    {
        return [
            'id'            => $element->id,
            'idElement'     => $element->idElement,
            'name'          => $element->name,
            'Object'        => $element->Object,
            'functions'     => $element->function,
            'appearance'    => $element->appearance,
            'idPadre'       => $element->idPadre
        ];
    }

    /**
     * This function serialize Element Object into Array
     * @param LortomElement $element
     * @return array
     */
    protected function getElementSerialized(LortomElement $element)
    {
        return [
            'id'            => $element->id,
            'name'          => $element->name,
            'Object'        => $element->Object,
            'functions'     => $element->function,
            'appearance'    => $element->appearance,
        ];
    }

    /**
     * This Function serialize a Page Object into array
     * @param LortomPages $page
     * @return array
     */
    protected function getPageSerialized(LortomPages $page)
    {
        return [
            'id'            => $page->id,
            'title'         => $page->title,
            'slug'          => $page->slug,
            'content'       => $page->content,
            'metaTag'       => $page->metaTag,
            'metaDesc'      => $page->metaDesc,
            'fileName'      => $page->fileName,
            'state'         => LortomPages::gValBack($page->state,'state')
        ];
    }

    /**
     * This function serialize an LortomComponent Object into Array
     * @param LortomComponent $cmp
     * @return array
     */
    protected function getComponentSerialized(LortomComponent $cmp)
    {
        return [
            'id'            => $cmp->id,
            'name'          => $cmp->name,
            'appearance'    => $cmp->appearance,
        ];
    }
}