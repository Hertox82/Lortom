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

Route::get('/menus',[
    'as'     => 'apiGetMenus',
    'uses'   => 'WebsiteController@getMenus'
]);

Route::put('/menus',[
    'as'     => 'apiDeleteMenus',
    'uses'   => 'WebsiteController@deleteMenus'
]);

Route::post('/menu',[
    'as'     => 'apiSaveMenu',
    'uses'   => 'WebsiteController@storeMenu'
]);

Route::put('/menu',[
    'as'     => 'apiEditMenu',
    'uses'   => 'WebsiteController@storeMenu'
]);

Route::get('/menus/attribute/list',[
    'as'     => 'apiGetMenusAttributeList',
    'uses'   => 'WebsiteController@getMenuAttributeList'
]);