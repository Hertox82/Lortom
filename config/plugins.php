<?php 
return [ 
     'plugins' => [ 
  [ 
          'vendor' => 'Hardel', 
          'PluginName' => 'Settings', 
          'moduleName' => 'settings.module', 
          'routingPath' => '/settings', 
          'icon' => 'fa fa-cogs', 
          'serviceProvider' => Plugins\Hardel\Settings\Providers\HardelSettingsServiceProvider::class, 
     ], 
  [ 
          'vendor' => 'Hardel', 
          'PluginName' => 'Plugin', 
          'moduleName' => 'plugin.module', 
          'routingPath' => '/plugin', 
          'icon' => 'fa fa-plug', 
          'serviceProvider' => Plugins\Hardel\Plugin\Providers\HardelPluginServiceProvider::class, 
     ], 
  [ 
          'vendor' => 'Hardel', 
          'PluginName' => 'Dashboard', 
          'moduleName' => 'dashboard.module', 
          'routingPath' => '/dashboard', 
          'icon' => 'fa fa-dashboard', 
          'serviceProvider' => Plugins\Hardel\Dashboard\Providers\HardelDashboardServiceProvider::class, 
     ], 
   ], 
  ];