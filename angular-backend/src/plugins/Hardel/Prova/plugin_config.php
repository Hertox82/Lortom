<?php
return [
    'plugins' => [
        'vendor'            => 'Hardel',
        'PluginName'        => 'Prova',
        'moduleName'        => 'prova.module',
        'routingPath'       => '/prova',
        'icon'              => '',
        'serviceProvider'   => Plugins\Hardel\Prova\Providers\HardelProvaServiceProvider::class,
    ],
];