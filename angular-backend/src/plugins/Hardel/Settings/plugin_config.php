<?php
return [
    'plugins' => [
        'vendor'            => 'Hardel',
        'PluginName'        => 'Settings',
        'moduleName'        => 'settings.module',
        'routingPath'       => '/settings',
        'icon'              => 'fa fa-cogs',
        'serviceProvider'   => Plugins\Hardel\Settings\Providers\HardelSettingsServiceProvider::class
    ],
];