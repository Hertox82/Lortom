# Lortom
Lortom is an Content Management System built in Laravel 5.5 + Angular 2

### TODO LIST

-[x] Installation System for Plugins in Lortom
-[x] Pass routing Angular with Artisan Command
-[x] Create Automatization to build a Plugin
-[x] Deleting Plugin in Safe mode (with Artisan command)
-[x] Update Plugin configuration
-[x] Create Artisan Command for Plugins
-[ ] Manage Submenu
-[ ] Manage position on Menu
-[ ] Create Artisan Command for Plugin's Migration
-[ ] Create Plugins Installer
-[ ] Create Plugins Exporter
-[ ] Styling the Backend
-[ ] Create Template System for Front-end
-[ ] Create Command to Build Template
-[ ] Create Command to Export Template
-[ ] Create Command to Install Template


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
 
 
 ####Use Artisan Command
 
 
 #####Create command
 ```bash
 $ php artisan lortom-plugin:create --vendor-name=Vendor,Name
 ```
 
 This command allow you a creation of plugin.
 
 you can also digit this command:
 
 ```bash
  $ php artisan lortom-plugin:create
 ```
 
 and simply answer the questions
 
 
 

