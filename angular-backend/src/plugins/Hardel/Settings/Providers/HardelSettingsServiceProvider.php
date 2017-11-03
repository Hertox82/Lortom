<?php
/**
 * Created by PhpStorm.
 * User: hernan
 * Date: 17/10/2017
 * Time: 16:16
 */

namespace Plugins\Hardel\Settings\Providers;

use Illuminate\Support\ServiceProvider;
use Route;
class HardelSettingsServiceProvider extends ServiceProvider
{

    protected $namespace = 'Plugins\Hardel\Settings\Controller';

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