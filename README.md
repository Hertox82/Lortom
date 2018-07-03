# Lortom
Lortom is an Content Management System built in Laravel 5.5 + Angular 4


## ROAD TO ALPHA-1

- [ ] Create lortom/framework library
- [ ] Create lortom/installer to install via composer the application


## Create Plugin on Lortom

In order to create a Plugin in Lortom, you must understand the folder structure

```
 --Lortom
   |
   |--- angular-backend
        |
        |--- e2e
        |--- node_modules
        |--- src
             |-- "angular's folder"
             |   
             |   ...
             |
             |-- plugins
   |
   |--  laravel-app
 ```
 
 into angular-backend there is the folder named  *plugins* and in this folder you can put your own plugin respecting the
 follow structure:
 
 */plugins/vendor/name_of_plugin*
 
 
 #### Use Artisan Command
 
 
 ##### Create command
 
 ```bash
 $ php artisan lortom-plugin:create --vendor-name=Vendor,Name
 ```
 
 This command allow you a creation of plugin.
 
 you can also digit this command:
 
 ```bash
  $ php artisan lortom-plugin:create
 ```
 
 and simply answer the questions
 
 
 ##### Update command
 
 ```bash
 $ php artisan lortom-plugin:update --vendor-name=Vendor,Name --no-routing
 ```
 
 This command update single configuration of plugin and passing the option "--no-routing" doesn't update the 
 'plugin-name'.routing.ts
 
 
 ##### Delete command
 
  ```bash
  $ php artisan lortom-plugin:delete --vendor-name=Vendor,Name
  ```
  
  This command delete all references of plugin.
  
  
  #### Enable Routing
  
  This command bring some routing configuration from plugin_config.php and put into the 'app.routing.ts'
  
  ```bash
  $ php artisan lortom-routing:enable
  ```
  
  #### Permissions Update
  
  This command update into Database the permission write into the config/plugins.php
  
  ```bash
    $ php artisan lortom-permission:update --vendor-name=Vendor,Name
  ```

  
 
 
 
 

