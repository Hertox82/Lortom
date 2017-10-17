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
            if(! $Plugins->isPluginInserted('Hardel','Settings')) {
                $Plugins->extrapolate($pl_load['plugins']);
                $this->mergeConfigFrom(config_path('plugins.php'),'plugins');
            }
        }
    }
}