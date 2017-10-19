<?php
return [
    'plugins' => [
        'vendor'            => 'Hardel',
        'PluginName'        => 'Settings',
        'position'          => 2,
        'moduleName'        => 'settings.module',
        'routingPath'       => '/settings',
        'icon'              => 'fa fa-cogs',
        'serviceProvider'   => Plugins\Hardel\Settings\Providers\HardelSettingsServiceProvider::class
    ],
];