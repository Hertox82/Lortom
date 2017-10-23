<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/backend',function(){
   return view('backend.backend-angular');
})->middleware('lortom.auth');

Route::group(['prefix' => '/backend', 'middleware' => 'lortom.auth'], function(){
    Route::any('{catchAll}', function(){
        return view('backend.backend-angular');
    })->where('catchAll','(.*)');
});
