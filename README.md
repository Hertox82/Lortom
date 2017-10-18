# Lortom
Lortom is an Content Management System built in Laravel 5.5 + Angular 2

### TODO LIST

* ~~Installation System for Plugins in Lortom~~
* ~~Pass routing Angular with Artisan Command~~
* ~~Create Automatization to build a Plugin~~
* Deleting Plugin in Safe mode (with Artisan command)
* Create Artisan Command for Plugins
* Create Plugins Installer
* Create Artisan Command for Plugin's Migration
* Styling the Backend
* Create Template System for Front-end
* etc etc


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

