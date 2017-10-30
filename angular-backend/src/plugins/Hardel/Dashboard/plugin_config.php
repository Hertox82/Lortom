<?php

            [
                'vendor'            => 'Hardel',
                'PluginName'        => 'Dashboard',
                'position'          => 1,
                'moduleName'        => 'dashboard.module',
                'routingPath'       => '/dashboard',
                'icon'              => 'fa fa-dashboard',
                'serviceProvider'   => Plugins\Hardel\Dashboard\Providers\HardelDashboardServiceProvider::class,
                'subMenu'           => [],
                'migration-up'      => function(){
                    //here migration to create tables and columns
                },
                'migration-down'    => function(){
                    //here migration to delete tables
                },
                'permission'        => 'Hardel.Dashboard'
            ];