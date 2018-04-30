<?php

namespace Plugins\Hardel\Website\Model;


use Illuminate\Database\Eloquent\Model;
use DB;
use File;
use LortomTemplate\Model\HomePage;

class LortomPages extends Model
{
    protected $table = 'lt_pages';


    public static function getFieldValue($field)
    {
        $return = [];

        if($field == 'state')
        {
            $return[] = ['id' => 1, 'label' => 'Attivo'];
            $return[] = ['id' => 2, 'label' => 'Non Attivo'];
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

    public function components()
    {
        return $this->belongsToMany('Plugins\Hardel\Website\Model\LortomComponent','lt_page_component','idPage','idComponent')->get();
    }

    public function checkPropertyEdit($key, &$array)
    {
        if($key === 'state')
        {
            if($this->state !== $array[$key]['id'])
                $this->state = $array[$key]['id'];
        }
        else {
            if($this->$key != $array[$key])
                $this->$key = $array[$key];
        }
    }

    public function checkPropertySave($key, &$array)
    {

        if($key === 'state')
        {
            $this->state = $array[$key]['id'];
        }
        else {
            $this->$key = $array[$key];
        }

    }

    public function getPageComponents()
    {
        return json_decode(json_encode($this->getListComponents()),true);
    }

    protected function getListComponents()
    {
        return  DB::table('lt_page_component')
            ->where('idPage',$this->id)
            ->join('lt_components','lt_components.id','=','lt_page_component.idComponent')
            ->select([
                'lt_page_component.id AS id',
                'lt_components.id AS idComponent',
                'lt_components.name AS name',
                'lt_page_component.Object AS Object',
                'lt_page_component.function AS functions',
            ])->get();
    }


    /**
     * This function rendering the view of the Page
     * @param $variable
     * @return array
     */
    public function renderData($variable) {

        $view = $this->fileName;
        $data = [];

        $fileName = resource_path().'/views/'.$view.'.blade.php';

        if(!File::exists($fileName))
        {
            $source  = "@extends('welcome') \n";
            $source.= "@section('title', '$this->title')\n";
            $source.= "@section('content')\n";
            $source = $this->compileComponent($source);
            $source.= " \n @endsection \n";

            File::put($fileName,$source);

        }

        $data = $this->getDataFromComponent($variable);

        return [$view,$data];
    }

    /**
     * This function compile into a variable $source the appearance of a List of Components
     * @param $source
     * @return string
     */
    protected function compileComponent($source) {
        $components = $this->components();

        foreach ($components as $comp)
        {
            $source.= $comp->appearance;
        }
        return $source;
    }

    /**
     * This function take all Component of this Page and call the singular function
     * @param $data
     * @return array
     */
    protected function getDataFromComponent($data)
    {
        $components = $this->getListComponents();
        $data['id'] = $this->id;

        $response = [];
        foreach ($components as $cmp)
        {
            if(property_exists($cmp,'Object'))
            {

                $class = "\\".$cmp->Object;
                $function = $cmp->functions;
                $otherData =  ($class != null && $function != null) ? call_user_func_array(array($class,$function),array($data,$cmp->idComponent)) : [];
                $response = array_merge($response,$otherData);
            }
        }

        return $response;
    }
}