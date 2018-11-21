<?php

namespace Plugins\Hardel\File\Controller;

use LTFramework\Controllers\LortomController as Controller;
use Illuminate\Http\Request;
use Plugins\Hardel\File\Model\LortomFile;
use Plugins\Hardel\File\Services\FileManagerService;
use Illuminate\Support\Facades\Input;
use File;

class FileController extends Controller
{


    public function getFiles(Request $request) {

        $files = LortomFile::all();

        $arrayFiles = [];

        foreach ($files as $file) {
            
        $arrayFiles[] = $this->convertLortomFileToJson($file);

        }

        //$main = new FileManagerService();
        //pr(getFileByObj(1,"Plugins\\Hardel\\Website\\Model\\LortomPages"));
        //pr($main->getModelAlias(),1);
        return response()->json($arrayFiles);
    }

    protected function convertLortomFileToJson(LortomFile $file) {
        $fileD = new \stdClass();
        $fileD->id = $file->id;
        $fileD->fileName = $file->fileName;
        $fileD->src = $file->getSrc();
        $fileD->ListObj = $file->getListObj();

        return $fileD;
    }


    /**
     * This function save the file into the Data Base
     */
    public function saveFile(Request $request) {
       if(Input::hasFile('file')) {
           $file = Input::file('file');
           $path = $file->getRealPath();
           $fileName = $file->getClientOriginalName();
           $ext = $file->getClientOriginalExtension();

           $fileName = str_replace('.'.$ext,"",$fileName);

           $arrayPath = [
               public_path(),
               'img',
               date('Y'),
               date('m')
           ];
           $finalPath = implode('/',$arrayPath);
           if(!File::exists($finalPath.'/')) {
                $this->createPathIfNotExists($arrayPath);
                // File::makeDirectory($finalPath.'/');
           }
            // created file into Server
            $file->move($finalPath,$fileName.".".$ext);
            
            // store data into DB
            $fileLt = new LortomFile();

            $fileLt->extension = $ext;
            $fileLt->fileName = $fileName;
            unset($arrayPath[0]);
            $arrayPath = array_values($arrayPath);
            $fileLt->path = '/'.implode('/', $arrayPath).'/';
            $fileLt->type = $fileLt->getTypeByExtension();
            $fileLt->save();

            // return response

            return response()->json($this->convertLortomFileToJson($fileLt));
        }
    }

    protected function createPathIfNotExists($arrayPath) {

            $pathBase = '';
            foreach($arrayPath as $path) {
                $pathBase.= $path;
                if(! File::exists($pathBase)) {
                    File::makeDirectory($pathBase);
                }
                $pathBase.='/';
            }
    }
}