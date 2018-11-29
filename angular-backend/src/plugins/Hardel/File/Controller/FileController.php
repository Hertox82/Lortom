<?php

namespace Plugins\Hardel\File\Controller;

use LTFramework\Controllers\LortomController as Controller;
use Illuminate\Http\Request;
use Plugins\Hardel\File\Model\LortomFile;
use Plugins\Hardel\File\Services\FileManagerService;
use Illuminate\Support\Facades\Input;
use File;
use DB;

class FileController extends Controller
{


    /**
     * @Api({
     *      "description": "this function return list of files"
     * })
     * @param Request $request
     * @return Response $response
     */
    public function getFiles(Request $request) {

        $sObj = $request->query('sObj');
        $nIdObj = $request->query('nIdObj');
        
        if(!is_null($sObj) and !is_null('nIdObj')) {
            $where = [
                ['idObj',$nIdObj],
                ['typeObj', $sObj]
            ];
            $listOfFile = DB::table('lt_file_object')
            ->where($where)
            ->select('idFile')
            ->get();

            $arrayFiles = [];

            foreach ($listOfFile as $Obj) {
                $arrayFiles[] = $this->convertLortomFileToJson(LortomFile::find($Obj->idFile));
            }

            return response()->json($arrayFiles);

        }
        //$main = new FileManagerService();
        //pr(getFileByObj(1,"Plugins\\Hardel\\Website\\Model\\LortomPages"));
        //pr($main->getModelAlias(),1);
        return response()->json($this->getAllFiles());
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
            $fileLt->type = $fileLt->getTypeByExtension($ext);
            $fileLt->save();

            $input = $request->all();
            
            if(isset($input['idObject']) and isset($input['nameObject'])) {
                DB::table('lt_file_object')->insert([
                    [
                        'idFile'        => $fileLt->id,
                        'idObj'         => $input['idObject'],
                        'typeObj'       => $input['nameObject'],
                        'created_at'    => date('Y-m-d H:i:s'),
                        'updated_at'    => date('Y-m-d H:i:s'),
                    ]
                ]);

            }

            // return response

            return response()->json($this->convertLortomFileToJson($fileLt));
        }
    }

    /**
     * This function edit File
     */
    public function editFile(Request $request) {
        $input = $request->all();
        $file = $input['file'];
        $ltFile = LortomFile::find($file['id']);

        if($file['name'] != $ltFile->fileName) {
            $realPath = $ltFile->getRealPath();
            $name = $file['name'];
            $pathChange = public_path()."{$ltFile->path}{$name}.{$ltFile->extension}";
            File::move($realPath,$pathChange);
            $ltFile->fileName = $name;
            $ltFile->save();
        }

        return response()->json($this->convertLortomFileToJson($ltFile));
    }

    /**
     * 
     */
    public function deleteFile(Request $request) {
        $input = $request->all();
        $idFile = $input['id'];

        $file = LortomFile::find($idFile);

        // first of all delete the reference from Server
        $pathFile =$file->getRealPath();

        if(File::exists($pathFile)) {
            File::delete($pathFile);
        }

        // after that, delete record from DB
        $file->delete();

        return response()->json($this->getAllFiles());

    }

    /**
     * 
     */
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

    /**
     * 
     */
    protected function convertLortomFileToJson(LortomFile $file) {
        $fileD = new \stdClass();
        $fileD->id = $file->id;
        $fileD->fileName = $file->fileName;
        $fileD->src = $file->getSrc();
        $fileD->ListObj = $file->getListObj();

        return $fileD;
    }

    /**
     * This function return all Files
     * @return array
     */
    protected function getAllFiles() {

        $files = LortomFile::all();

        $arrayFiles = [];

        foreach ($files as $file) {
            
        $arrayFiles[] = $this->convertLortomFileToJson($file);

        }

        return $arrayFiles;
    }
}