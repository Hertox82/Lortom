<?php

Route::get('/pages',[
    'as'     => 'apiGetRoles',
    'uses'   => 'WebsiteController@getPages'
]);