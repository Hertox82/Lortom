<?php
/**
 * User: hernan
 * Date: 21/11/2017
 * Time: 14:42
 */

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use DB;
use Plugins\Hardel\Website\Model\LortomPages;
use Illuminate\Support\Facades\Route;
use Illuminate\Routing\Route as mRoute;

class LortomController extends BaseController
{

    protected $functionName;


    /**
     * This function get List of everything
     * @param $options
     * @return array
     */
    protected function getList($options)
    {
        //extract the array and do available a variables
        extract($options);

        //store my function into a variable
        $function = $this->functionName;

        return [$responseKey => $function()->sanitizeItem($Class,$name)];
    }


    /**
     * This function Create and Update a certain type of Model and the SubTable
     * @param $options
     * @return array
     */
    protected function storeObj($options){

        extract($options);

        $function = $this->functionName;

        $Obj = $function()->saveObject($Class,$type,$input,$ToSave);

        $tables = array_keys($subTables);

        foreach ($tables as $t)
        {
            $insert = $function()->subTable($subTables[$t]['lista'],$Obj->id,$subTables[$t]['subTableKey']);

            $this->deleteFromSubTable($t,$subTables[$t]['subTableKey'],$Obj->id);

            if(! empty($insert))
                DB::table($t)->insert($insert);
        }

        return [$responseKey => $function()->getItemSerialized($name,$Obj)];
    }

    protected function deleteFromSubTable($table,$columns,$id)
    {
        $cols = array_keys($columns);

        foreach ($cols as $col)
        {
            if(!$columns[$col])
            {
                DB::table($table)->where($col,$id)->delete();
            }
        }
    }

    /**
     * This function delete a certain type of Model
     * @param $options
     * @return array
     */
    protected function deleteObj($options)
    {
        extract($options);

        $table = array_keys($tableCol);

        $function = $this->functionName;

        foreach ($input as $it)
        {
            $idIn = $it['id'];

            foreach ($table as $t)
            {
                $col = $tableCol[$t];

                DB::table($t)->where($col,$idIn)->delete();
            }
        }

        return [$responseKey => $function()->sanitizeItem($Class,$name)];
    }


    public function catchAll(Request $request) {

        //Catch all Routes and try to get Request URI
        $url = $request->getRequestUri();

        //try to sanitize the URI removing the querystring
        $urlSanitize = explode('?',$url);

        $urlSanitize = $urlSanitize[0];

        //Call DB in order to get all Pages set into CMS
        $Pages = LortomPages::all();

        $PageFound = null;

        $variable = [];

        //Iterate over List in order to Match the request
        foreach($Pages as  $page) {
            // convert urls like '/users/{uid}/posts/{:pid}' to regular expression
            $slug = str_replace('/','\/',$page->slug);
            $pattern = "@^" . preg_replace('/\{(.*?)\??\}/', '([^\/\.]+)', $slug) . "$@D";
            $matches = Array();
            // check if the current request matches the expression
            if(preg_match($pattern, $urlSanitize, $matches)) {
                // remove the first match
                array_shift($matches);
                $variable = $matches;
                // call the callback with the matched positions as params
               if(preg_match_all('/\{(.*?)\??\}/',$slug,$secondMatches))
               {
                   array_shift($secondMatches);

               }
                $PageFound = $page;
            }
        }

        //If there isn't the route throw 404 Page Not Found
        if(is_null($PageFound))
        {
            abort(404);
        }
        else {
            //Create Data for Page
            list($view,$data) = $PageFound->renderData($variable);

            return view($view,$data);
        }
    }

    /**
     * This API
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function listApi(Request $request)
    {
        $routes = array_values(array_filter(collect(Route::getRoutes())->map(function ($route) {
                $item = $this->getRouteInformation($route);
                if(substr($item['uri'],0,strlen('api/')) == 'api/')
                {
                    $item['uri'] = str_replace('api','',$item['uri']);

                    if($item['action'] != 'Closure')
                    {
                        $Info = explode('@', $item['action'], 2);
                        $class = $Info[0];
                        $function = $Info[1];
                        $reflector = new \ReflectionClass($class);

                        $doc = $reflector->getMethod($function)->getDocComment();
                        if (preg_match('/@Api\(([^\/\.]+)\)/', $doc, $matches)) {
                            array_shift($matches);
                            $object = str_replace('*', '', $matches[0]);
                            $item['object'] = json_decode($object, true);
                        }
                    }
                    unset($item['action']);
                    return $item;
                }
        })->all()));

        return view('api-doc',['routes'=> $routes]);

    }

    protected function getRouteInformation(mRoute $route)
    {
        return [
            'method' => implode(' | ', $route->methods()),
            'uri'    => $route->uri(),
            'action' => $route->getActionName(),
        ];
    }
}