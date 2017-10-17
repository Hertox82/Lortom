<?php
/**
 * User: hernan
 * Date: 17/10/2017
 * Time: 11:00
 */

Route::prefix('api')->middleware('api')->group(function(){
    Route::get('dashboard',[
        'as'    => 'dashboarApi',
        'uses'  => 'Plugins\Hardel\Dashboard\Controller\DashboardController@getDashboard'
   ]);
});