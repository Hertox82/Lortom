<?php
return [
    'plugins' => [
        'vendor'            => 'Hardel',
        'PluginName'        => 'Settings',
        'position'          => 2,
        'moduleName'        => 'settings.module',
        'routingPath'       => '/settings',
        'icon'              => 'fa fa-cogs',
        'serviceProvider'   => Plugins\Hardel\Settings\Providers\HardelSettingsServiceProvider::class,
        'subMenu'           => [
            [
                'subPath'       => '/settings/primoSubmenu',
                'Name'          => 'Primo Submenu'
            ],
            [
                'subPath'       => '/settings/secondoSubmenu',
                'Name'          => 'Secondo Submenu'
            ],

        ],
        'migration-up'      => function(){
            //here migration for plugin
        },
        'migration-down'    => function(){
            //here migration rollback
        }
    ],
];