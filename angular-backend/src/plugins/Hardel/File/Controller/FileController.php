<?php

namespace Plugins\Hardel\File\Controller;

use LTFramework\Controllers\LortomController as Controller;
use Illuminate\Http\Request;
use Plugins\Hardel\File\Model\LortomFile;
use Plugins\Hardel\File\Services\FileManagerService;

class FileController extends Controller
{


    public function getFiles(Request $request) {

        $files = LortomFile::all();

        $arrayFiles = [];

        foreach ($files as $file) {
            $fileD = new \stdClass();

            $fileD->id = $file->id;
            $fileD->fileName = $file->fileName;
            $fileD->src = $file->getSrc();
            $fileD->ListObj = $file->getListObj();
        $arrayFiles[] = $fileD;
        }

        $main = new FileManagerService();

        pr(getFileByObj(1,"Plugins\\Hardel\\Website\\Model\\LortomPages"));
        pr($main->getModelAliases(),1);
        return response()->json($arrayFiles);
    }


}