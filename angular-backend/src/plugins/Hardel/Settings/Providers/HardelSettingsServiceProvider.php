<?php
/**
 * Created by PhpStorm.
 * User: hernan
 * Date: 17/10/2017
 * Time: 16:16
 */

namespace Plugins\Hardel\Settings\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\PluginsConfigCompiler;

class HardelSettingsServiceProvider extends ServiceProvider
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