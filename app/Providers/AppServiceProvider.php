<?php

namespace App\Providers;

use App\Services\Classes\LortomAuth;
use App\Services\Classes\LortomUserProvider;
use App\Services\Classes\PackageManager;
use App\Services\LortomSeeder;
use App\Services\PluginCreateCompiler;
use App\Services\PluginDeleteCompiler;
use App\Services\PluginRoutingCompiler;
use App\Services\PluginsConfigCompiler;
use App\Services\PluginUpdateCompiler;
use App\Services\RepoSeeder;
use Illuminate\Support\ServiceProvider;

use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->bootHelper();

        Schema::defaultStringLength(191);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $services = $this->getAllData();

        foreach ($services as $service) {
            $method = $service['method'];
            $abstract = $service['abstract'];
            $closure = $service['closure'];

            $this->app->$method($abstract,$closure);
        }

    }


    protected function getAllData() {

        return [
          [
              'method'      => 'bind',
              'abstract'    => 'plugin.config.compiler',
              'closure'     => function($app){
                return new PluginsConfigCompiler();
              }
          ],
            [
                'method'      => 'singleton',
                'abstract'    => 'App\Services\PluginRoutingCompiler',
                'closure'     => function($app){
                    return new PluginRoutingCompiler();
                }
            ],
            [
                'method'      => 'singleton',
                'abstract'    => 'App\Services\PluginCreateCompiler',
                'closure'     => function($app){
                    return new PluginCreateCompiler($app['plugin.config.compiler']);
                }
            ],
            [
                'method'      => 'singleton',
                'abstract'    => 'App\Services\PluginDeleteCompiler',
                'closure'     => function($app){
                    return new PluginDeleteCompiler($app['plugin.config.compiler']);
                }
            ],
            [
                'method'      => 'singleton',
                'abstract'    => 'App\Services\PluginUpdateCompiler',
                'closure'     => function($app){
                    return new PluginUpdateCompiler($app['plugin.config.compiler']);
                }
            ],
            [
                'method'      => 'singleton',
                'abstract'    => 'lt.user.provider',
                'closure'     => function($app){
                    return new LortomUserProvider();
                }
            ],
            [
                'method'      => 'singleton',
                'abstract'    => 'ltAuth',
                'closure'     => function($app){
                    return new LortomAuth($this->app['lt.user.provider']);
                }
            ],
            [
                'method'      => 'singleton',
                'abstract'    => 'ltpm',
                'closure'     => function($app){
                    return new PackageManager();
                }
            ],
            [
                'method'      => 'singleton',
                'abstract'    => 'lt.seeder',
                'closure'     => function($app){
                    return new RepoSeeder();
                }
            ],
            [
                'method'      => 'bind',
                'abstract'    => 'App\Services\LortomSeeder',
                'closure'     => function($app){
                    return new LortomSeeder($app['lt.seeder']);
                }
            ],
        ];
    }


    private function bootHelper()
    {
        if(file_exists($file = __DIR__.'/../helpers.php'))
        {
            require $file;
        }
    }
}
