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