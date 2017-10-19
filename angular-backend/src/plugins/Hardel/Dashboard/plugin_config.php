<?php
return [
    'plugins' => [
        'vendor'            => 'Hardel',
        'PluginName'        => 'Dashboard',
        'position'          => 1,
        'moduleName'        => 'dashboard.module',
        'routingPath'       => '/dashboard',
        'icon'              => 'fa fa-dashboard',
        'serviceProvider'   => Plugins\Hardel\Dashboard\Providers\HardelDashboardServiceProvider::class,
    ],
];