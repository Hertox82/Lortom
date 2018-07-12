<?php

namespace App\Providers;

use LTFramework\Services\Classes\LortomAuth;
use LTFramework\Services\Classes\LortomUserProvider;
use LTFramework\Services\Classes\PackageManager;
use LTFramework\Services\LortomSeeder;
use LTFramework\Services\PluginCreateCompiler;
use LTFramework\Services\PluginDeleteCompiler;
use LTFramework\Services\PluginRoutingCompiler;
use LTFramework\Services\PluginsConfigCompiler;
use LTFramework\Services\PluginUpdateCompiler;
use LTFramework\Services\RepoSeeder;
use Illuminate\Support\ServiceProvider;

use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {

    }

}
