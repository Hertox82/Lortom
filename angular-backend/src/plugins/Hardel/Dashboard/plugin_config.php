<?php
return [
    'plugins' => [
        'vendor'            => 'Hardel',
        'PluginName'        => 'Dashboard',
        'moduleName'        => 'dashboard.module',
        'routingPath'       => '/dashboard',
        'icon'              => 'fa fa-dashboard',
        'serviceProvider'   => Plugins\Hardel\Dashboard\Providers\HardelDashboardServiceProvider::class,
    ],
];