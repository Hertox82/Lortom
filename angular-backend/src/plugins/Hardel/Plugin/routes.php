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

Route::post('/plugin/pack',[
    'as'    => 'apiPackPlugin',
    'uses'  => 'PluginController@packPlugin'
]);

Route::post('/plugin/delete',[
    'as'    => 'apiDeletePlugin',
    'uses'  => 'PluginController@deletePlugin'
]);

Route::get('/test',[
    'as'    => 'apiGetTest',
    'uses'  => 'PluginController@getTest'
]);