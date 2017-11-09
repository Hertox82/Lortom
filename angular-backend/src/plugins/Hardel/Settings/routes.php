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

Route::put('/roles',[
    'as'     => 'apiDeleteRoles',
    'uses'   => 'SettingsController@deleteRoles'
]);

Route::put('/role',[
    'as'    => 'apiUpdateRole',
    'uses'  => 'SettingsController@saveRole'
])->middleware('lortom.auth');

Route::post('/role',[
    'as'    => 'apiNewRole',
    'uses'  => 'SettingsController@newRole'
])->middleware('lortom.auth');

Route::get('/users',[
    'as'    => 'apiGetUsers',
    'uses'  => 'SettingsController@getUsers'
]);

Route::post('/role',[
    'as'    => 'apiNewUser',
    'uses'  => 'SettingsController@newUser'
]);