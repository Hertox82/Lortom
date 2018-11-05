<?php

return [
        'plugins' =>  [

                
        [
            'vendor'            => 'Hardel',
            'PluginName'        => 'Settings',
            'version'           => '1.0.0',
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
                'version'           => '1.0.0',
                'position'          => 4,
                'moduleName'        => 'website.module',
                'routingPath'       => '/website',
                'icon'              => 'fa fa-html5',
                'serviceProvider'   => Plugins\Hardel\Website\Providers\HardelWebsiteServiceProvider::class,
                'model' => [
                    "Plugins\\Hardel\\Website\\Model\\LortomPages",
                    "Plugins\\Hardel\\Website\\Model\\LortomMenu",
                    "Plugins\\Hardel\\Website\\Model\\LortomComponent"
                ],
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
                    [
                        'subPath'       => '/website/components',
                        'Name'          => 'Component',
                        'permission'    => 'Hardel.Website.Component'
                    ]
                ],
                'migration-up'      => function(){
                    //here migration to create tables and columns
                    $Schema=  Illuminate\Support\Facades\Schema::class;

                    if(! $Schema::hasTable('lt_pages')) {
                        $Schema::create('lt_pages', function (Illuminate\Database\Schema\Blueprint $table) {
                            $table->increments('id');
                            $table->string('title');
                            $table->string('slug');
                            $table->text('content')->nullable();
                            $table->string('metaTag')->nullable();
                            $table->string('metaDesc')->nullable();
                            $table->string('fileName');
                            $table->tinyInteger('state');
                            $table->tinyInteger('type')->default(0);
                            $table->timestamps();
                        });
                    }

                    if(! $Schema::hasTable('lt_components'))
                    {
                        $Schema::create('lt_components',function(Illuminate\Database\Schema\Blueprint $table){
                            $table->increments('id');
                            $table->string('name');
                            $table->text('appearance')->nullable();
                            $table->timestamps();
                        });
                    }

                    if( $Schema::hasTable('lt_components') and $Schema::hasTable('lt_pages'))
                    {
                        if(! $Schema::hasTable('lt_page_component')) {
                            $Schema::create('lt_page_component', function (Illuminate\Database\Schema\Blueprint $table) {
                                $table->increments('id');
                                $table->integer('idPage')->unsigned();
                                $table->foreign('idPage')->references('id')->on('lt_pages')->onUpdate('cascade')->onDelete('cascade');
                                $table->integer('idComponent')->unsigned();
                                $table->foreign('idComponent')->references('id')->on('lt_components')->onUpdate('cascade')->onDelete('cascade');
                                $table->string('Object')->nullable();
                                $table->string('function')->nullable();
                            });
                        }
                    }

                    if( !$Schema::hasTable('lt_menus') and $Schema::hasTable('lt_pages')) {

                        $Schema::create('lt_menus',function(Illuminate\Database\Schema\Blueprint $table){
                            $table->increments('id');
                            $table->string('name');
                            $table->integer('idPage')->unsigned()->nullable();
                            $table->foreign('idPage')->references('id')->on('lt_pages')->onUpdate('cascade')->onDelete('cascade');
                            $table->integer('idParent')->unsigned();
                        });
                    }

                },
                'migration-down'    => function(){
                    //here migration to delete tables
                    $Schema=  Illuminate\Support\Facades\Schema::class;
                    $Schema::dropIfExists('lt_page_component');
                    $Schema::dropIfExists('lt_menus');
                    $Schema::dropIfExists('lt_components');
                    $Schema::dropIfExists('lt_pages');
                },
                'permission'        => 'Hardel.Website'
            ], 


        [
            'vendor'            => 'Hardel',
            'PluginName'        => 'Plugin',
            'version'           => '1.0.0',
            'position'          => 3,
            'moduleName'        => 'plugin.module',
            'routingPath'       => '/plugin',
            'icon'              => 'fa fa-plug',
            'serviceProvider'   => Plugins\Hardel\Plugin\Providers\HardelPluginServiceProvider::class,
            'subMenu'           => [
                [
                    'subPath'       => '/plugin/plugins',
                    'Name'          => 'Plugins',
                    'permission'    => 'Hardel.Plugin.Plugins'
                ],
                [
                    'subPath'       => '/plugin/template',
                    'Name'          => 'Template',
                    'permission'    => 'Hardel.Plugin.Template'
                ],
            ],
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
                'PluginName'        => 'Dashboard',
                'version'           => '1.0.0',
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
                'PluginName'        => 'File',
                'version'           => '1.0.0',
                'position'          => 5,
                'moduleName'        => 'file.module',
                'routingPath'       => '/file',
                'icon'              => 'fa fa-file-o',
                'serviceProvider'   => Plugins\Hardel\File\Providers\HardelFileServiceProvider::class,
                'subMenu'           => [],
                'migration-up'      => function(){
                    //here migration for plugin
                    $Schema=  Illuminate\Support\Facades\Schema::class;

                    $Schema::create('lt_file',function(Illuminate\Database\Schema\Blueprint $table){
                        $table->increments('id');
                        $table->string('fileName');
                        $table->string('extension');
                        $table->string('type');
                        $table->string('path');
                        $table->timestamps();
                    });

                    if($Schema::hasTable('lt_file')) {
                        $Schema::create('lt_file_object', function(Illuminate\Database\Schema\Blueprint $table){
                            $table->increments('id');
                            $table->integer('idFile')->unsigned();
                            $table->foreign('idFile')->references('id')->on('lt_file')->onUpdate('cascade')->onDelete('cascade');
                            $table->integer('idObj')->unsigned();
                            $table->string('typeObj');
                            $table->text('description')->nullable();
                            $table->tinyInteger('position')->default(0);
                            $table->timestamps();

                        });
                    }
                },
                'migration-down'    => function(){
                    //here migration to delete tables
                    $Schema=  Illuminate\Support\Facades\Schema::class;
                    $Schema::dropIfExists('lt_file_object');
                    $Schema::dropIfExists('lt_file');


                },
                'permission'        => 'Hardel.File'
            ], 


    ]
];