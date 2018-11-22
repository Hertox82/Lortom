<?php

Route::get('/files',[
    'as'     => 'apiGetFile',
    'uses'   => 'FileController@getFiles'
]);

Route::put('/files',[
    'as'    => 'apiDeleteFile',
    'uses'  => 'FileController@deleteFile'
]);

Route::post('/file', [
    'as'    => 'apiSaveFile',
    'uses'  => 'FileController@saveFile'
]);

Route::put('/file', [
    'as'    => 'apiEditFile',
    'uses'  => 'FileController@editFile'
]);