<?php
/**
 * User: hernan
 * Date: 23/10/2017
 * Time: 15:05
 */


if(! function_exists('pr')){

    function pr($data,$die = false)
    {
        echo '<pre>';
        print_r($data);
        echo '</pre>';

        if($die)
            die();
    }
}


if(! function_exists('array_map_collection')) {

    function array_map_collection(Closure $callback, $list)
    {
        $return = [];

        foreach ($list as $item)
        {
            $return[] = $callback($item);
        }

        return $return;
    }
}