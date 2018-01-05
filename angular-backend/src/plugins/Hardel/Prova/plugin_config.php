<?php
            [
                'vendor'            => 'Hardel',
                'PluginName'        => 'Prova',
                'version'           => '1.0.0',
                'position'          => 5,
                'moduleName'        => 'prova.module',
                'routingPath'       => '/prova',
                'icon'              => '',
                'serviceProvider'   => Plugins\Hardel\Prova\Providers\HardelProvaServiceProvider::class,
                'subMenu'           => [],
                'migration-up'      => function(){
                    //here migration to create tables and columns
                },
                'migration-down'    => function(){
                    //here migration to delete tables
                },
                'permission'        => 'Hardel.Prova'
            ];