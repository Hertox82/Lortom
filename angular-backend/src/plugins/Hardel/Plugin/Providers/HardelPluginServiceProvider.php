<?php
/**
 * Created by PhpStorm.
 * User: hernan
 * Date: 17/10/2017
 * Time: 16:26
 */

namespace Plugins\Hardel\Plugin\Providers;


use Illuminate\Support\ServiceProvider;
use App\Services\PluginsConfigCompiler;

class HardelPluginServiceProvider extends ServiceProvider
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