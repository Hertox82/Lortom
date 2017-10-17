<?php
/**
 * User: hernan
 * Date: 17/10/2017
 * Time: 11:08
 */

namespace Plugins\Hardel\Dashboard\Providers;


use Illuminate\Support\ServiceProvider;
use App\Services\PluginsConfigCompiler;


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

        //method for loading the plugin configuration
        $this->loadPluginConfig();

    }


    private function loadPluginConfig()
    {
        /**
         * file Config
         */
        $pl_load = require __DIR__.'/../plugin_config.php';

        if(!file_exists(config_path('plugins.php')))
        {
            $Plugins = new PluginsConfigCompiler(true);
            $Plugins->extrapolate($pl_load['plugins']);
            $this->mergeConfigFrom(config_path('plugins.php'),'plugins');
        }
        else
        {
            $path = config_path('plugins.php');
            $pluginsConfig = require $path;
            $Plugins = new PluginsConfigCompiler(false,$pluginsConfig['plugins']);
            if(! $Plugins->isPluginInserted('Hardel','Dashboard')) {
                $Plugins->extrapolate($pl_load['plugins']);
                $this->mergeConfigFrom(config_path('plugins.php'),'plugins');
            }
        }
    }
}
