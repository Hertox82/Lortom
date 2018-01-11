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

Route::get('/plugins/latest',[
    'as'    => 'apiGetPluginsLatest',
    'uses'  => 'PluginController@getLatestPlugin'
]);

Route::put('/plugins',[
    'as'    => 'apiUninstallPlugins',
    'uses'  => 'PluginController@uninstallPlugins'
]);

Route::post('/plugin',[
    'as'    => 'apiInstallPlugin',
    'uses'  => 'PluginController@installPlugin'
]);

Route::put('/plugin',[
    'as'    => 'apiUpdatePlugin',
    'uses'  => 'PluginController@updatePlugin'
]);

Route::post('/plugin/pack',[
    'as'    => 'apiPackPlugin',
    'uses'  => 'PluginController@packPlugin'
]);

Route::post('/plugin/delete',[
    'as'    => 'apiDeletePlugin',
    'uses'  => 'PluginController@deletePlugin'
]);

Route::get('/templates',[
    'as'    => 'apiGetTemplates',
    'uses'  => 'PluginController@getTemplates'
]);

Route::post('/template/pack',[
    'as'    => 'apiPackTemplate',
    'uses'  => 'PluginController@packTemplate'
]);

Route::get('/test',[
    'as'    => 'apiGetTest',
    'uses'  => 'PluginController@getTest'
]);