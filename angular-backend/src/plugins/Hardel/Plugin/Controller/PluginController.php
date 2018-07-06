<?php
/**
 * User: hernan
 * Date: 13/12/2017
 * Time: 10:18
 */

namespace Plugins\Hardel\Plugin\Controller;

use LTFramework\Controllers\LortomController as Controller;
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

        $command2= "{$_ENV['NODE_JS']} {$_ENV['LTPM']} test";
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
            "description": "this function provide to install a Template"
     *     })
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function installTemplate(Request $request) {

        $input = $request->all();

        $fileName = $this->getFileName($input['vendor'],$input['name'],$input['version'],false);

        $command2= "{$_ENV['NODE_JS']} {$_ENV['LTPM']} install-t {$fileName}";
        $command1= "cd ../ && ";
        $command = $command1.$command2;

        exec($command,$stdout);



        //prima di tutto compilo il composer.json con l'autoload

        ltpm()->addAutoloadInComposer($input['vendor'],$input['name']);

        return response()->json(['message' => true]);

    }

    /**
     * @Api({
            "description": "this function provide to activate the Template installing all Plugins"
     *     })
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function activateTemplate(Request $request) {

        // Get alla input from the request
        $input = $request->all();

        //Find the template that is now active and deactivate it

        list($listActive,$listNotActive) = $this->getListTemplateInstalled();

        // Iterate over the template active
        foreach ($listActive as $tempActive) {
            $this->packageAction($tempActive['vendor'],$tempActive['name'],$tempActive['version'],"deactivate-t");
            $this->actionTemplate($tempActive['vendor'],$tempActive['name'],"Uninstall");
        }

        $this->packageAction($input['vendor'],$input['name'],$input['version']);
        $this->actionTemplate($input['vendor'],$input['name']);

        //call function in order to make a right migration from new template

        return response()->json(['message' => true]);
    }


    /**
     * @Api({
            "description": "this function provide to deactivate the Template uninstalling all Plugins"
     *     })
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function deactivateTemplate(Request $request) {

        $input = $request->all();

        $this->actionTemplate($input['vendor'],$input['name'],"Uninstall");
        $this->packageAction($input['vendor'],$input['name'],$input['version'],"deactivate-t");

        return response()->json(['message' => true]);
    }


    /**
     * This function activate and deactivate Plugins into Template
     * @param $vendor
     * @param $name
     * @param string $type
     */
    protected function actionTemplate($vendor,$name,$type="Install") {

        $listOfPlugins = ltpm()->getListOfPluginsInTemplate($vendor,$name);

        $function = "op{$type}";

        foreach ($listOfPlugins as $plugin) {
            if($plugin['vendor'] == 'Hardel') {
                if(!in_array($plugin['name'],['Dashboard','Settings','Plugin','Website'])) {
                    $this->$function($plugin['vendor'],$plugin['name'],$plugin['version']);
                }
            }
            else {
                $this->$function($plugin['vendor'],$plugin['name'],$plugin['version']);
            }
        }

        $this->opRebuild();
    }

    protected function packageAction($vendor,$name,$version, $action="activate-t") {

        $fileName = ltpm()->getFileName($vendor,$name,$version,false);

        $command2= "{$_ENV['NODE_JS']} {$_ENV['LTPM']} {$action} {$fileName}";
        $command1= "cd ../ && ";
        $command = $command1.$command2;

        exec($command,$stdout);
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
            "description": "this function provide to uninstall template"
     *     })
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function uninstallTemplate(Request $request) {

        $input = $this->sanitizeTemplateUninstall($request->all());

        foreach ($input as $template) {

            $fileName = ltpm()->getFileName($template['vendor'],$template['name'],$template['version'],false);
            //deactivate the plugin
            $this->actionTemplate($template['vendor'],$template['name'],"Uninstall");

            ltpm()->removeAutoloadFromComposer($template['vendor'],$template['name']);
            $commandDump = '/Applications/XAMPP/xamppfiles/bin/php /usr/local/bin/composer.phar dump-autoload';
            system($commandDump);

            $command2= "{$_ENV['NODE_JS']} {$_ENV['LTPM']} uninstall-t {$fileName}";
            $command1= "cd ../ && ";
            $command = $command1.$command2;

            exec($command,$stdout);

        }

        return response()->json(['message' => 'ok']);
    }

    /**
     * This function sanitize input coming from Request
     * @param $input
     * @return array
     */
    protected function sanitizeTemplateUninstall($input) {

        if(!isset($input[0])) {
            $vendor = $input['vendor'];
            $name = $input['name'];
            $version = $input['version'];

            $input = [];
            $input[] = [
                'vendor'  => $vendor,
                'name'    => $name,
                'version' => $version
            ];
        }

        return $input;
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

        $command2= "{$_ENV['NODE_JS']} {$_ENV['LTPM']} package {$fileName}";
        $command1= "cd ../ && ";
        $command = $command1.$command2;

        exec($command,$stdout);

        $lista = $this->getListInstalledPlugin();

        $this->checkIfPluginsArePacked($lista);

        return response()->json(['plugins' => $lista]);

    }

    /**
     * @Api({
            "description": "bundles a specific template"
     *     })
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function packTemplate(Request $request) {
        $input = $request->all();

        //$vendor = $input['vendor'];
        //$name = $input['name'];
        //$version = $input['version'];

        //controllare dentro il file config.json all'interno del template per vedere se fare un nuovo pack

        list($vendor,$name,$version) = $this->checkIfChangeVersion($input['vendor'],$input['name'],$input['version']);

        $fileName = $this->getFileName($vendor,$name,$version,false);

        $command2= "{$_ENV['NODE_JS']} {$_ENV['LTPM']} package-t {$fileName}";
        $command1= "cd ../ && ";
        $command = $command1.$command2;

        exec($command,$stdout);

        //mi faccio dare la lista dei template installati, controllando se è packed

        return response()->json(['message' => 'ok']);
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

        $command2= "{$_ENV['NODE_JS']} {$_ENV['LTPM']} delpack {$fileName}";
        $command1= "cd ../ && ";
        $command = $command1.$command2;

        exec($command,$stdout);

        $lista = $this->getListInstalledPlugin();

        $this->checkIfPluginsArePacked($lista);

        return response()->json(['plugins' => $lista]);
    }

    /**
     * @Api({
            "description": "delete a specific template packed into the Repo"
     *     })
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function delPackTemplate(Request $request) {
        $input = $request->all();

        $vendor= $input['vendor'];
        $name = $input['name'];
        $version = $input['version'];

        $fileName = $this->getFileName($vendor,$name,$version,false);

        $command2= "{$_ENV['NODE_JS']} {$_ENV['LTPM']} deltemp {$fileName}";
        $command1= "cd ../ && ";
        $command = $command1.$command2;

        exec($command,$stdout);

        return response()->json(['message' => 'ok']);
    }

    /**
     * @Api({
            "description": "this Api return all latest plugins"
     *     })
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getLatestPlugin(Request $request) {

        $command2= "{$_ENV['NODE_JS']} {$_ENV['LTPM']} latest-plugin";
        $command1= "cd ../ && ";
        $command = $command1.$command2;

        exec($command,$stdout);
        $listOfPlugin = json_decode($stdout[0],true);

        $this->checkIfPluginsAreInstalled($listOfPlugin);

       return response()->json(['plugins' => $listOfPlugin]);
    }


    /**
     * @Api({
            "description": "This Api return all Latest Template and Installed Template"
     *     })
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTemplates(Request $request) {

        //leggo il file ltpm.config.json in modo da vedere se ci sono dei Template installati
        list($listActive,$listNotActive) = $this->getListTemplateInstalled();

       return response()->json(['template' => $listActive, 'templates' => $listNotActive]);
    }

    public function getLatestTemplate(Request $request) {
        $command2= "{$_ENV['NODE_JS']} {$_ENV['LTPM']} latest-template";
        $command1= "cd ../ && ";
        $command = $command1.$command2;

        exec($command,$stdout);

        $listLastRepo = json_decode($stdout[0],true);

        $listLastTemplate = [];

        foreach ($listLastRepo as $Template) {
            if(!isset($Template['installed'])) {
               $listLastTemplate[] = $Template;
            }
        }

        return response()->json(['template' => $listLastTemplate]);

    }

    /**
     * This function check if template version has changed
     * @param $vendor
     * @param $name
     * @param $version
     * @return array
     */
    protected function checkIfChangeVersion($vendor,$name,$version) {

        $listaReturn = [$vendor,$name,$version];

        $temp = $this->loadTemplConfig($vendor,$name);

        if($temp) {
            $listaReturn= [$temp['vendor'],$temp['name'],$temp['version']];
        }

        return $listaReturn;
    }

    protected function loadTemplConfig($vendor,$name) {

        $config = $this->loadLtpmConfig();

        if(isset($config['deplt'])) {
            $fileName = app_path().'/../'.$config['deplt']."/{$vendor}/{$name}/config.json";
            if(File::exists($fileName)) {
                return json_decode(File::get($fileName),true);
            }
        }

        return null;
    }

    /**
     * this function read from ltpm.config.json
     * @return mixed|null
     */
    protected function loadLtpmConfig() {
        $path = app_path().'/../ltpm.config.json';

        if(File::exists($path)) {
            $conf = json_decode(File::get($path),true);

            return $conf;
        }

        return null;
    }

    /**
     * This function return list of installed template
     * @return array
     */
    protected function getListTemplateInstalled() {
        $config = $this->loadLtpmConfig();

        $listActive = [];
        $listNotActive =[];
        $listInstalled = [];

        if(! is_null($config)) {
            if(isset($config['template'])) {

                $listInstalled = $config['template'];
            }
        }

        for($i=0; $i<count($listInstalled); $i++) {

            $template = $listInstalled[$i];
            if($template['active'] == true) {

                $listActive[] =  array_merge($template,['packed' => false, 'installed' => true, 'toUpdate' => false]);
            }
            else{
                $listNotActive[] = array_merge($template,['packed' => false, 'installed' => true, 'toUpdate' => false]);
            }
        }

        //check if exist some template packed
        $this->checkIfTemplateArePacked($listNotActive,$config);
        $this->checkIfTemplateArePacked($listActive,$config);

        return [$listActive,$listNotActive];
    }

    protected function checkIfTemplateArePacked(&$listInstalled,$config) {
        if(isset($config['repo'])) {
            $repoPath = app_path() . '/../' . $config['repo'];
            if(File::isDirectory($repoPath)) {
                $listOfFile = File::files($repoPath);

                for($i=0; $i<count($listInstalled); $i++) {
                    $temp = $listInstalled[$i];

                    $fileName = $this->getFileName($temp['vendor'],$temp['name'],$temp['version'],false);
                    $path = $repoPath.'/'.$fileName;

                    if(in_array($path,$listOfFile)) {
                        $listInstalled[$i]['packed'] = true;
                    }
                }
            }
        }
    }

    protected function loadComposerJson() {
        $composerFile = app_path().'/../composer.json';

        if(File::exists($composerFile)) {
            return json_decode(File::get($composerFile),true);
        }

        return null;
    }

    protected function writeComposerJson($data) {
        $string = json_encode($data);
        $composerFile = app_path().'/../composer.json';
        File::put($composerFile,$string);
    }

    protected function getFileName($vendor,$name,$version,$isPlugin = true) {

        return ($isPlugin) ?  "{$vendor}-{$name}-{$version}.tgz" : "{$vendor}-{$name}-{$version}_t.tgz";
    }

    /**
     * @param $listOfLatest
     * @param $listOfInstalled
     */
    protected function checkIfTemplateInstalled(&$listOfLatest,$listOfInstalled) {
        $length = count($listOfLatest);
        for ($j=0; $j<count($listOfInstalled); $j++) {
            $installed = $listOfInstalled[$j];
            for($i=0; $i<$length; $i++) {
                $template1 = $listOfLatest[$i];

                if($template1['vendor'] == $installed['vendor'] and $template1['name'] == $installed['name']) {
                    if($template1['version'] == $installed['version']) {
                        $listOfInstalled[$j]['packed'] = true;
                        unset($listOfLatest[$i]);
                        break;
                    }
                }
            }
        }

        $listOfLatest = array_values(array_filter($listOfLatest));
    }

    /**
     * This function return a List of Installed Plugin
     * @return array
     */
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

    /**
     * This function check if Plugins are installed
     * @param $lista
     */
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

    /**
     * This function remove Plugin on Folder
     * @param $vendor
     * @param $name
     * @param $version
     */
    protected function opUninstall($vendor,$name,$version){

        Artisan::call('lt-plugin:delete',['--vendor-name'=> $vendor.','.$name, '--silent' => true]);

        $fileName = $this->getFileName($vendor,$name,$version);

        $command2= "{$_ENV['NODE_JS']} {$_ENV['LTPM']} uninstall {$fileName}";
        $command1= "cd ../ && ";
        $command = $command1.$command2;

        exec($command,$mario);

    }

    /**
     * This function install Plugin on Folder
     * @param $vendor
     * @param $name
     * @param $version
     */
    protected function opInstall($vendor,$name,$version) {

        $fileName = $this->getFileName($vendor,$name,$version);

        $command2= "{$_ENV['NODE_JS']} {$_ENV['LTPM']} install {$fileName}";
        $command1= "cd ../ && ";
        $command = $command1.$command2;

        exec($command,$mario);

        Artisan::call('lt-plugin:update',['--vendor-name'=> $vendor.','.$name, '--silent' => true]);
    }

    /**
     * This function rebuild for angular
     */
    protected function opRebuild() {
        $command2  = "{$_ENV['NODE_JS']} {$_ENV['NPM']} run build";
        $command = "cd angular-backend && ".$command2;

        exec($command,$out);

        sleep(5);
    }

}