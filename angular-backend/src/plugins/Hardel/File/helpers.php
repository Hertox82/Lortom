<?php
/**
 * User: hernan
 * Date: 05/11/2018
 * Time: 16:16
 */


if(!function_exists('getFileByObj')) {

    function getFileByObj($idObj, $model) {
      try {
          return app('lt.filemanager')->getFileByObj($idObj,$model);
      }
      catch (\Exception $e) {

          return null;
      }
    }
}

if(!function_exists('getModelAlias')) {

    function getModelAlias() {
        try {
            return app('lt.filemanager')->getModelAlias();
        }
        catch (\Exception $e) {

            return null;
        }
    }
}