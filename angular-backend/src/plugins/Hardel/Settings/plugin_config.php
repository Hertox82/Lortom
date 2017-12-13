<?php
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
        ];