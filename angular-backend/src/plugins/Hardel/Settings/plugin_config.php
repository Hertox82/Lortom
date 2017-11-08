<?php
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
            },
            'migration-down'    => function(){
                //here migration rollback
            },
            'permission'        => 'Hardel.Settings'
        ];