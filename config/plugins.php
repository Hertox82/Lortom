<?php 
return [ 
     'plugins' => [ 
  [ 
          'vendor' => 'Hardel', 
          'PluginName' => 'Dashboard', 
          'position' => 1, 
          'moduleName' => 'dashboard.module', 
          'routingPath' => '/dashboard', 
          'icon' => 'fa fa-dashboard', 
          'serviceProvider' => Plugins\Hardel\Dashboard\Providers\HardelDashboardServiceProvider::class, 
     ], 
  [ 
          'vendor' => 'Hardel', 
          'PluginName' => 'Settings', 
          'position' => 2, 
          'moduleName' => 'settings.module', 
          'routingPath' => '/settings', 
          'icon' => 'fa fa-cogs', 
          'serviceProvider' => Plugins\Hardel\Settings\Providers\HardelSettingsServiceProvider::class,
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
     ], 
  [ 
          'vendor' => 'Hardel', 
          'PluginName' => 'Plugin', 
          'position' => 3, 
          'moduleName' => 'plugin.module', 
          'routingPath' => '/plugin', 
          'icon' => 'fa fa-plug', 
          'serviceProvider' => Plugins\Hardel\Plugin\Providers\HardelPluginServiceProvider::class, 
     ], 
   ], 
  ];