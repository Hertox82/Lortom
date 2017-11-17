<?php

Route::get('/pages',[
    'as'     => 'apiGetRoles',
    'uses'   => 'WebsiteController@getPages'
]);

Route::put('/pages',[
    'as'     => 'apiDeletePages',
    'uses'   => 'WebsiteController@deletePages'
])->middleware('lortom.auth');

Route::post('/page',[
    'as'     => 'apiSavePage',
    'uses'   => 'WebsiteController@savePage'
])->middleware('lortom.auth');

Route::put('/page',[
    'as'     => 'apiUpdatePage',
    'uses'   => 'WebsiteController@editPage'
])->middleware('lortom.auth');

Route::get('/pages/attribute/list',[
    'as'     => 'apiGetPagesAttributeList',
    'uses'   => 'WebsiteController@getPageAttributeList'
]);

Route::get('/elements',[
    'as'     => 'apiGetElements',
    'uses'   => 'WebsiteController@getElements'
]);

Route::put('/elements',[
    'as'     => 'apiDeleteElement',
    'uses'   => 'WebsiteController@deleteElements'
])->middleware('lortom.auth');

Route::post('/element',[
    'as'     => 'apiSaveElement',
    'uses'   => 'WebsiteController@saveElement'
])->middleware('lortom.auth');