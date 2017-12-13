<?php
/**
 * Created by PhpStorm.
 * User: hernan
 * Date: 17/10/2017
 * Time: 16:26
 */

namespace Plugins\Hardel\Plugin\Providers;


use Illuminate\Support\ServiceProvider;
use Route;

class HardelPluginServiceProvider extends ServiceProvider
{
    protected $namespace = 'Plugins\Hardel\Plugin\Controller';
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