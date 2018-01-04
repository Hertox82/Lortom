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
use Illuminate\Support\Facades\Artisan;

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
            "description": "this function provide to install a Plugin"
     *     })
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function installPlugin(Request $request) {
        $input = $request->all();

        $this->opInstall($input['vendor'],$input['name'],$input['version']);

        $this->opRebuild();

        return response()->json(['message' => true]);

    }

    /**
     * @Api({
            "description":"this function provide to uninstall the plugins"
     *     })
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function uninstallPlugins(Request $request) {
        $input = $request->all();

        foreach ($input as $plugin) {

            $this->opUninstall($plugin['vendor'],$plugin['name'],$plugin['version']);

        }

       $this->opRebuild();

        return response()->json(['message' => true]);
    }

    /**
     * @Api({
            "description": "this function update the Plugin"
     *     })
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updatePlugin(Request $request) {
        $input = $request->all();

        $vendor  = $input['vendor'];
        $name    = $input['name'];
        $version = $input['version'];

        $lista = $this->getListInstalledPlugin();

        $oldversion = '';

        foreach ($lista as $pl) {
            if($pl['name'] == $name and $pl['vendor'] == $vendor) {
                $oldversion = $pl['version'];
                break;
            }
        }

        $this->opUninstall($vendor,$name,$oldversion);

        $this->opRebuild();

        $this->opInstall($vendor,$name,$version);

        $this->opRebuild();

        return response()->json(['message' => true]);
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

    /**
     * @Api({
            "description": "this Api return all latest plugins"
     *     })
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getLatestPlugin(Request $request) {

        $command2= "/usr/local/bin/node /usr/local/lib/node_modules/lt-pm/lt.js latest";
        $command1= "cd ../ && ";
        $command = $command1.$command2;

        exec($command,$stdout);

        $listOfPlugin = json_decode($stdout[0],true);

        $this->checkIfPluginsAreInstalled($listOfPlugin);

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

    protected function checkIfPluginsAreInstalled(&$lista) {
        $listOfInstalled = $this->getListInstalledPlugin();
        $length = count($lista);
        for($i=0;$i<$length; $i++) {
            $pl = $lista[$i];
            foreach ($listOfInstalled as $it) {
                if( $pl['vendor'] == $it['vendor'] and
                    $pl['name'] == $it['name'] and
                    $pl['version'] == $it['version']
                ) {
                    unset($lista[$i]);
                    break;
                }
                else if(
                    $pl['vendor'] == $it['vendor'] and
                    $pl['name'] == $it['name'] and
                    $pl['version'] != $it['version']
                ) {
                    $lista[$i]['installed'] = true;
                    $lista[$i]['toUpdate'] = true;
                    break;
                }
            }
        }

        $lista = array_values(array_filter($lista));
    }


    protected function opUninstall($vendor,$name,$version){

        Artisan::call('lortom-plugin:delete',['--vendor-name'=> $vendor.','.$name, '--silent' => true]);

        $fileName = $this->getFileName($vendor,$name,$version);

        $command2= "/usr/local/bin/node /usr/local/lib/node_modules/lt-pm/lt.js uninstall {$fileName}";
        $command1= "cd ../ && ";
        $command = $command1.$command2;

        exec($command,$mario);

    }

    protected function opInstall($vendor,$name,$version) {

        $fileName = $this->getFileName($vendor,$name,$version);

        $command2= "/usr/local/bin/node /usr/local/lib/node_modules/lt-pm/lt.js install {$fileName}";
        $command1= "cd ../ && ";
        $command = $command1.$command2;

        exec($command,$mario);

        Artisan::call('lortom-plugin:update',['--vendor-name'=> $vendor.','.$name, '--silent' => true]);
    }

    protected function opRebuild() {
        $command2  = "/usr/local/bin/node /usr/local/lib/node_modules/npm/bin/npm-cli.js run build";
        $command = "cd angular-backend && ".$command2;

        exec($command,$out);

        sleep(5);
    }

    protected function getFileName($vendor,$name,$version) {
         return  "{$vendor}-{$name}-{$version}.tgz";
    }
}