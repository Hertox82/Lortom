<?php
/**
 * User: hernan
 * Date: 17/10/2017
 * Time: 16:17
 */

Route::get('/permissions',[
    'as'     => 'apiGetPermissions',
    'uses'   => 'SettingsController@getPermissions'
])->middleware('lortom.auth');

Route::get('/roles',[
    'as'     => 'apiGetRoles',
    'uses'   => 'SettingsController@getRoles'
]);