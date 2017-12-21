<?php
/**
 * User: hernan
 * Date: 13/12/2017
 * Time: 10:18
 */

namespace Plugins\Hardel\Plugin\Controller;

use App\Http\Controllers\LortomController as Controller;
use Illuminate\Http\Request;
use File;
class PluginController extends Controller
{

    /**
     * @Api({
            "description": "return a list of plugins installed into CMS"
     *     })
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getPlugins(Request $request)
    {
        $listaPlugin = config('plugins');

        usort($listaPlugin['plugins'],["Plugins\\Hardel\\Plugin\\Controller\\PluginController","sort"]);

        $lista =  array_map(function($plug){
           return [
               'vendor'     => $plug['vendor'],
               'name'       => $plug['PluginName'],
               'version'    => isset($plug['version']) ? $plug['version'] : 'no version',
               'short_desc' => 'short desc',
               'long_desc'  => 'long desc',
               'packed'     => false,
           ];
        },$listaPlugin['plugins']);

        $path = app_path().'/../angular-backend/src/compressed';
        if(File::isDirectory($path)) {
            $listOfFiles = File::files($path);

            $listPluginPacked = array_map(function($file)use($path){
                $fileString = str_replace($path.'/','',$file);
                $rawPlugin = explode('-',$fileString,3);

                return [
                    'vendor'  => $rawPlugin[0],
                    'name'    => $rawPlugin[1],
                    'version' => str_replace('.tgz','',$rawPlugin[2])
                ];
            },$listOfFiles);

            for($i=0; $i<count($lista); $i++) {
                $pl = $lista[$i];

                for($j=0;$j<count($listPluginPacked); $j++) {
                    $plp = $listPluginPacked[$j];

                    if($pl['version'] === $plp['version'] and $pl['name'] === $plp['name'] and $pl['vendor'] === $plp['vendor']) {
                        $lista[$i]['packed'] = true;
                        break;
                    }
                }
            }
        }

        return response()->json(['plugins' => $lista]);
    }

    static function sort($a,$b)
    {
        $a = $a['position'];
        $b = $b['position'];

        if ($a == $b) return 0;
        return ($a < $b) ? -1 : 1;
    }

    public function getTest(Request $request) {

        $command2= "/usr/local/bin/node /usr/local/lib/node_modules/lt-pm/lt.js test";
        $command1= "cd ../angular-backend && ";
        $command = $command1.$command2;
        exec($command,$mario);

        pr($mario);
    }
}