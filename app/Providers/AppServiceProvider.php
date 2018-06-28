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
        $this->app->bind('plugin.config.compiler',function($app){
            return new PluginsConfigCompiler();
        });

        $this->app->singleton('App\Services\PluginRoutingCompiler',function($app){
            return new PluginRoutingCompiler();
        });

        $this->app->singleton('App\Services\PluginCreateCompiler',function($app){
            return new PluginCreateCompiler($app['plugin.config.compiler']);
        });

        $this->app->singleton('App\Services\PluginDeleteCompiler',function($app){
            return new PluginDeleteCompiler($app['plugin.config.compiler']);
        });
        $this->app->singleton('App\Services\PluginUpdateCompiler',function($app){
            return new PluginUpdateCompiler($app['plugin.config.compiler']);
        });

        $this->app->singleton('lt.user.provider',function(){
           return new LortomUserProvider();
        });

        $this->app->singleton('ltAuth', function($app){
            return new LortomAuth($this->app['lt.user.provider']);
        });

        $this->app->singleton('ltpm', function($app) {
           return new PackageManager();
        });

        $this->app->singleton('lt.seeder',function($app){
            return new RepoSeeder();
        });

        $this->app->bind('App\Services\LortomSeeder',function($app){
            return new LortomSeeder($app['lt.seeder']);
        });
    }


    private function bootHelper()
    {
        if(file_exists($file = __DIR__.'/../helpers.php'))
        {
            require $file;
        }
    }
}
