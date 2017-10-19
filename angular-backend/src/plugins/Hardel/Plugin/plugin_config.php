<?php
return [
    'plugins' => [
        'vendor'            => 'Hardel',
        'PluginName'        => 'Plugin',
        'moduleName'        => 'plugin.module',
        'routingPath'       => '/plugin',
        'icon'              => 'fa fa-plug',
        'serviceProvider'   => Plugins\Hardel\Plugin\Providers\HardelPluginServiceProvider::class,
    ],
];