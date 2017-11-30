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
    'uses'   => 'WebsiteController@storePage'
])->middleware('lortom.auth');

Route::put('/page',[
    'as'     => 'apiUpdatePage',
    'uses'   => 'WebsiteController@storePage'
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
    'uses'   => 'WebsiteController@storeElement'
])->middleware('lortom.auth');

Route::put('/element',[
    'as'     => 'apiUpdateElement',
    'uses'   => 'WebsiteController@storeElement'
])->middleware('lortom.auth');

Route::get('/components',[
    'as'     => 'apiGetComponents',
    'uses'   => 'WebsiteController@getComponents'
]);

Route::put('/components',[
    'as'     => 'apiDeleteComponents',
    'uses'   => 'WebsiteController@deleteComponents'
]);

Route::post('/component',[
    'as'     => 'apiSaveComponent',
    'uses'   => 'WebsiteController@storeComponent'
]);

Route::put('/component',[
    'as'     => 'apiUpdateComponent',
    'uses'   => 'WebsiteController@storeComponent'
]);

Route::post('/component/element',[
    'as'     => 'apiUpdateComponentElement',
    'uses'   => 'WebsiteController@updateComponentElement'
]);

Route::put('/component/element',[
    'as'     => 'apiDeleteComponentElement',
    'uses'   => 'WebsiteController@deleteComponentElement'
]);