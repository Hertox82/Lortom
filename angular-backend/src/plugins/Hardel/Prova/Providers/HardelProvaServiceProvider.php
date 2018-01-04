<?php

namespace Plugins\Hardel\Prova\Providers;


use Illuminate\Support\ServiceProvider;
use Route;

class HardelProvaServiceProvider extends ServiceProvider
{
    protected $namespace = 'Plugins\Hardel\Prova\Controller';
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
    }
}