<?php
/**
 * User: hernan
 * Date: 17/10/2017
 * Time: 16:28
 */


Route::get('/plugins',[
    'as'    => 'apiGetPlugins',
    'uses'  => 'PluginController@getPlugins'
]);