<?php

Route::get('/files',[
    'as'     => 'apiGetFile',
    'uses'   => 'FileController@getFiles'
]);

Route::post('/file', [
    'as'    => 'apiSaveFile',
    'uses'  => 'FileController@saveFile'
]);