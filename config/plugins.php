<?php

return [
        'plugins' =>  [

                

            [
                'vendor'            => 'Hardel',
                'PluginName'        => 'Dashboard',
                'position'          => 1,
                'moduleName'        => 'dashboard.module',
                'routingPath'       => '/dashboard',
                'icon'              => 'fa fa-dashboard',
                'serviceProvider'   => Plugins\Hardel\Dashboard\Providers\HardelDashboardServiceProvider::class,
                'subMenu'           => [],
                'migration-up'      => function(){
                    //here migration to create tables and columns
                },
                'migration-down'    => function(){
                    //here migration to delete tables
                },
                'permission'        => 'Hardel.Dashboard'
            ], 


        [
            'vendor'            => 'Hardel',
            'PluginName'        => 'Plugin',
            'position'          => 3,
            'moduleName'        => 'plugin.module',
            'routingPath'       => '/plugin',
            'icon'              => 'fa fa-plug',
            'serviceProvider'   => Plugins\Hardel\Plugin\Providers\HardelPluginServiceProvider::class,
            'subMenu'           => [],
            'migration-up'      => function(){
                //here migration to create tables and columns
            },
            'migration-down'    => function(){
                //here migration to delete tables
            },
            'permission'        => 'Hardel.Plugin'
        ], 

        [
            'vendor'            => 'Hardel',
            'PluginName'        => 'Settings',
            'position'          => 2,
            'moduleName'        => 'settings.module',
            'routingPath'       => '/settings',
            'icon'              => 'fa fa-cogs',
            'serviceProvider'   => Plugins\Hardel\Settings\Providers\HardelSettingsServiceProvider::class,
            'subMenu'           => [
                [
                    'subPath'       => '/settings/roles',
                    'Name'          => 'Roles',
                    'permission'    => 'Hardel.Settings.Roles'
                ],
                [
                    'subPath'       => '/settings/users',
                    'Name'          => 'Users',
                    'permission'    => 'Hardel.Settings.Users'
                ],

            ],
            'migration-up'      => function(){
                //here migration for plugin
                $Schema=  Illuminate\Support\Facades\Schema::class;

                $Schema::create('lt_prova',function(Illuminate\Database\Schema\Blueprint $table){
                    $table->increments('id');
                    $table->string('prova');
                });
            },
            'migration-down'    => function(){
                //here migration rollback
                $Schema=  Illuminate\Support\Facades\Schema::class;

                $Schema::dropIfExists('lt_prova');
            },
            'permission'        => 'Hardel.Settings'
        ], 

            [
                'vendor'            => 'Hardel',
                'PluginName'        => 'Website',
                'position'          => 4,
                'moduleName'        => 'website.module',
                'routingPath'       => '/website',
                'icon'              => 'fa fa-html5',
                'serviceProvider'   => Plugins\Hardel\Website\Providers\HardelWebsiteServiceProvider::class,
                'subMenu'           => [
                    [
                        'subPath'       => '/website/pages',
                        'Name'          => 'Pages',
                        'permission'    => 'Hardel.Website.Pages'
                    ],
                    [
                        'subPath'       => '/website/menu',
                        'Name'          => 'Menu',
                        'permission'    => 'Hardel.Website.Menu'
                    ],
                ],
                'migration-up'      => function(){
                    //here migration to create tables and columns
                    $Schema=  Illuminate\Support\Facades\Schema::class;

                    if(! $Schema::hasTable('lt_pages')) {
                        $Schema::create('lt_pages', function (Illuminate\Database\Schema\Blueprint $table) {
                            $table->increments('id');
                            $table->string('title');
                            $table->string('slug');
                            $table->text('content');
                            $table->string('metaTag');
                            $table->string('metaDesc');
                            $table->string('nomeFile');
                        });
                    }
                },
                'migration-down'    => function(){
                    //here migration to delete tables
                    $Schema=  Illuminate\Support\Facades\Schema::class;

                    $Schema::dropIfExists('lt_pages');
                },
                'permission'        => 'Hardel.Website'
            ], 


    ]
];