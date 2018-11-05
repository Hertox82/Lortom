<?php

namespace Plugins\Hardel\File\Providers;


use Illuminate\Support\ServiceProvider;
use Plugins\Hardel\File\Services\FileManagerService;
use Route;

class HardelFileServiceProvider extends ServiceProvider
{
    protected $namespace = 'Plugins\Hardel\File\Controller';
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

         $this->app->bind('lt.filemanager',function($app){
            return new FileManagerService();
         });

         $this->registerHelperFile();
    }

    private function registerHelperFile()
    {
        if(file_exists($file = __DIR__.'/../helpers.php'))
        {
            require $file;
        }
    }
}