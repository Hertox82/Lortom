<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/populate-slidebar',[
    'as'    => 'populateSlidebar',
    'uses'  => 'Backend\BackendController@populate'
])->middleware('lortom.auth');

Route::post('/login',[
    'as'    => 'apiLogin',
    'uses'  => 'Backend\BackendController@requestLogin'
]);

Route::get('/logout',[
    'as'    => 'apiLogout',
    'uses'  => 'Backend\BackendController@requestLogout'
]);

Route::put('/edit-my-profile',[
    'as'     => 'apiEditMyProfile',
    'uses'   => 'Backend\BackendController@requestEditMyProfile'
])->middleware('lortom.auth');

