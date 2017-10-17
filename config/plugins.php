<?php 
return [ 
     'plugins' => [ 
  [ 
          'vendor' => 'Hardel', 
          'PluginName' => 'Dashboard', 
          'moduleName' => 'dashboard.module', 
          'routingPath' => '/dashboard', 
          'icon' => 'fa fa-dashboard', 
     ], 
  [ 
          'vendor' => 'Hardel', 
          'PluginName' => 'Settings', 
          'moduleName' => 'settings.module', 
          'routingPath' => '/settings', 
          'icon' => 'fa fa-cogs', 
     ], 
  [ 
          'vendor' => 'Hardel', 
          'PluginName' => 'Plugin', 
          'moduleName' => 'plugin.module', 
          'routingPath' => '/plugin', 
          'icon' => 'fa fa-plug', 
     ], 
   ], 
  ];