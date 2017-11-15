<?php

Route::get('/pages',[
    'as'     => 'apiGetRoles',
    'uses'   => 'WebsiteController@getPages'
]);

Route::put('/pages',[
    'as'     => 'apiDeletePages',
    'uses'   => 'WebsiteController@deletePages'
]);

Route::post('/page',[
    'as'     => 'apiSavePage',
    'uses'   => 'WebsiteController@savePage'
]);//->middleware('lortom.auth');

Route::get('/pages/attribute/list',[
    'as'     => 'apiGetPagesAttributeList',
    'uses'   => 'WebsiteController@getPageAttributeList'
]);