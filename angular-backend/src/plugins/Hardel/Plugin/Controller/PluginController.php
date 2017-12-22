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
        $lista = $this->getListInstalledPlugin();

        $this->checkIfPluginsArePacked($lista);

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

    /**
     * @Api({
            "description": "bundles a specific plugin"
     *     })
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function packPlugin(Request $request) {
        $input = $request->all();

        $vendor = $input['vendor'];
        $name = $input['name'];
        $version = $input['version'];

        $fileName = "{$vendor}-{$name}-{$version}.tgz";

        $command2= "/usr/local/bin/node /usr/local/lib/node_modules/lt-pm/lt.js package {$fileName}";
        $command1= "cd ../ && ";
        $command = $command1.$command2;

        exec($command,$mario);

        $lista = $this->getListInstalledPlugin();

        $this->checkIfPluginsArePacked($lista);

        return response()->json(['plugins' => $lista]);

    }

    /**
     * @Api({
            "description": "delete a specific plugin packed into the Repo"
     *     })
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function deletePlugin(Request $request) {
        $input = $request->all();

        $vendor = $input['vendor'];
        $name = $input['name'];
        $version = $input['version'];

        $fileName = "{$vendor}-{$name}-{$version}.tgz";

        $command2= "/usr/local/bin/node /usr/local/lib/node_modules/lt-pm/lt.js delpack {$fileName}";
        $command1= "cd ../ && ";
        $command = $command1.$command2;

        exec($command,$mario);

        $lista = $this->getListInstalledPlugin();

        $this->checkIfPluginsArePacked($lista);

        return response()->json(['plugins' => $lista]);
    }

    public function getLatestPlugin(Request $request) {

        $command2= "/usr/local/bin/node /usr/local/lib/node_modules/lt-pm/lt.js latest";
        $command1= "cd ../ && ";
        $command = $command1.$command2;

        exec($command,$stdout);

        $listOfPlugin = json_decode($stdout[0],true);

       return response()->json(['plugins' => $listOfPlugin]);
    }

    protected function getListInstalledPlugin() {
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

        return $lista;
    }

    /**
     * This function check if Plugins are packed
     * @param $lista
     */
    protected function checkIfPluginsArePacked(&$lista) {
        $path = app_path().'/../ltpm.config.json';

        if(File::exists($path)) {
            $conf = json_decode(File::get($path),true);
            if(isset($conf['repo'])) {
                $path = app_path().'/../'.$conf['repo'];
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
            }
        }
    }
}