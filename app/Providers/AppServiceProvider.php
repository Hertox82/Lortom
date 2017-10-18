<?php

namespace App\Providers;

use App\Services\PluginCreateCompiler;
use App\Services\PluginRoutingCompiler;
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
    }
}
