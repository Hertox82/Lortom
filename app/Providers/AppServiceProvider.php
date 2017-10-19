<?php

namespace App\Providers;

use App\Services\PluginCreateCompiler;
use App\Services\PluginDeleteCompiler;
use App\Services\PluginRoutingCompiler;
use App\Services\PluginUpdateCompiler;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('App\Services\PluginRoutingCompiler',function($app){
            return new PluginRoutingCompiler();
        });

        $this->app->singleton('App\Services\PluginCreateCompiler',function($app){
            return new PluginCreateCompiler();
        });

        $this->app->singleton('App\Services\PluginDeleteCompiler',function($app){
            return new PluginDeleteCompiler();
        });
        $this->app->singleton('App\Services\PluginUpdateCompiler',function($app){
            return new PluginUpdateCompiler();
        });
    }
}
