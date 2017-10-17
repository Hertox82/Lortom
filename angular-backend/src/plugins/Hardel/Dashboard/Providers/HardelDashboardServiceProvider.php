<?php
/**
 * User: hernan
 * Date: 17/10/2017
 * Time: 11:08
 */

namespace Plugins\Hardel\Providers;


use Illuminate\Support\ServiceProvider;


class HardelDashboardServiceProvider extends ServiceProvider
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
