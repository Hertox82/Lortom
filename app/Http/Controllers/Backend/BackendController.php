<?php
/**
 * User: hernan
 * Date: 16/10/2017
 * Time: 16:39
 */
namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\LortomPermission;
use App\LortomUser;
use App\Services\Classes\LortomAuth;
use Illuminate\Http\Request;
use Cookie;
use Session;

class BackendController extends Controller
{

    protected $auth;

    public function __construct(LortomAuth $auth)
    {
        $this->auth = $auth;
    }

    public function populate(Request $request)
    {
        $User = $request->get('User');

        $listaPlugin = config('plugins');

        //ReSort the list of plugins
        usort($listaPlugin['plugins'],["App\\Http\\Controllers\\Backend\\BackendController","sort"]);

        $lista = array_map(function($plug)use($User){
            if(isset($plug['permission']))
            {
                if($User->hasPermission($plug['permission']))
                {
                    return [
                        'name' => $plug['PluginName'],
                        'href' => '/backend' . $plug['routingPath'],
                        'icon' => $plug['icon'],
                        'subMenu' => $this->setSubMenu(@$plug['subMenu'],$User)
                    ];
                }
            }
            else {
                return [
                    'name' => $plug['PluginName'],
                    'href' => '/backend' . $plug['routingPath'],
                    'icon' => $plug['icon'],
                    'subMenu' => $this->setSubMenu(@$plug['subMenu'],$User)
                ];
            }
        },$listaPlugin['plugins']);

        return response()->json(['menulista' => array_filter($lista)]);
    }



    public function login(Request $request)
    {
        return view('login');
    }

    public function requestLogin(Request $request)
    {
        $input = $request->only(['username','password']);

        if(!$this->auth->authenticate($input))
        {
            //errore durante il login, da fare in json
            return response()->json(['error' => 'username or password not find']);
        }

        $token = $this->auth->setToken();

        $User = $this->auth->getUser();

        $permission = array_filter(array_map_collection(function($perm){
            if($perm instanceof LortomPermission)
            {
                return $this->sanitizePermission($perm);
            }
        },$User->permissions()));

        $UserObj = ['username' => $User->email, 'name' => $User->name, 'permissions' => $permission];
        $response = ['token' => $token, 'user' => $UserObj];

       $config = config('session');

        return response()->json($response)->withCookie(Cookie::make('l_t',$token,10,$config['path'],$config['domain'],$config['secure'],false,false,'Lax'));
    }

    private function sanitizePermission(LortomPermission $perm)
    {
        return [
            'id'    => $perm->id,
            'name'  => $perm->name
        ];
    }

    public function requestLogout(Request $request)
    {
        $config = config('session');
        unset($_COOKIE['l_t']);
        return response()->json(['message' => 'logged Out!'])->withCookie(Cookie::make('l_t',null,-1,$config['path'],$config['domain'],$config['secure'],false,false,'Lax'));
    }

    public function requestEditMyProfile(Request $request)
    {

        $User = $request->get('User');

        $input = $request->all();


        if(isset($input['password']))
        {
            $User->password = bcrypt($input['password']);
        }

        if(isset($input['name'])){
            $User->name = $input['name'];
        }

        $User->save();

        $user = ['name' => $User->name, 'username' => $User->email];

        return response()->json(['message' => 'Well done! All is up to date', 'user' => $user]);
    }

    static function sort($a,$b)
    {
        $a = $a['position'];
        $b = $b['position'];

        if ($a == $b) return 0;
        return ($a < $b) ? -1 : 1;
    }

    private function setSubMenu($lista, LortomUser &$user)
    {
        if(is_null($lista))
            return [];

        $array = [];

        $array = array_map(function($sub)use($user){

            if(isset($sub['permission']))
            {

                if($user->hasPermission($sub['permission']))
                {
                   return [
                        'name' => $sub['Name'],
                        'href' => '/backend' . $sub['subPath']
                    ];
                }
            }
            else
            {
                return [
                    'name' => $sub['Name'],
                    'href' => '/backend' . $sub['subPath']
                ];
            }

        },$lista);

        return array_filter($array);
    }


}