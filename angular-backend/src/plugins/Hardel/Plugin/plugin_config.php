<?php

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
        ];