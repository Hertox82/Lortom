<?php

Route::get('/files',[
    'as'     => 'apiGetFile',
    'uses'   => 'FileController@getFiles'
]);