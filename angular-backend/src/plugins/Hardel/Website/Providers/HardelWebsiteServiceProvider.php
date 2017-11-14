<?php

namespace Plugins\Hardel\Website\Providers;


use Illuminate\Support\ServiceProvider;
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
    }
}