<?php

namespace Plugins\Hardel\Website\Providers;


use Illuminate\Support\ServiceProvider;
use Plugins\Hardel\Website\Services\WebsiteService;
use Route;

class HardelWebsiteServiceProvider extends ServiceProvider
{
    protected $namespace = 'Plugins\Hardel\Website\Controller';

    public function boot()
    {
        /**
         * Routing
         */
        if(!$this->app->routesAreCached())
        {
            Route::prefix('api')
                ->middleware('api')
                ->namespace($this->namespace)
                ->group(__DIR__.'/../routes.php');
        }

        $this->registerHelperFile();
    }

    public function register()
    {
        $this->app->bind('wbService',function($app){
            return new WebsiteService();
        });

    }


    private function registerHelperFile()
    {
        if(file_exists($file = __DIR__.'/../helpers.php'))
        {
            require $file;
        }
    }
}