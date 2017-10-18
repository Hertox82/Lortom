<?php

namespace Plugins\Hardel\Prova\Providers;


use Illuminate\Support\ServiceProvider;

class HardelProvaServiceProvider extends ServiceProvider
{
    public function boot()
    {
        /**
         * Routing
         */
        if(!$this->app->routesAreCached())
        {
            require __DIR__.'/../routes.php';
        }
    }
}