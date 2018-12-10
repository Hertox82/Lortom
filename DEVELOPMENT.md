# Development

In this section i will try to explain you the way to make a Plugin for Lortom and/or a Template !!

Enjoy the reading!

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
 $ php artisan lt-plugin:create --vendor-name=Vendor,Name
 ```
 
 This command allow you a creation of plugin.
 
 you can also digit this command:
 
 ```bash
  $ php artisan lt-plugin:create
 ```
 
 and simply answer the questions
 
 
 ##### Update command
 
 ```bash
 $ php artisan lt-plugin:update --vendor-name=Vendor,Name --no-routing
 ```
 
 This command update single configuration of plugin and passing the option "--no-routing" doesn't update the 
 'plugin-name'.routing.ts
 
 
 ##### Delete command
 
  ```bash
  $ php artisan lt-plugin:delete --vendor-name=Vendor,Name
  ```
  
  This command delete all references of plugin.
  
  
  #### Enable Routing
  
  This command bring some routing configuration from plugin_config.php and put into the 'app.routing.ts'
  
  ```bash
  $ php artisan lt-routing:enable
  ```
  
  #### Permissions Update
  
  This command update into Database the permission write into the config/plugins.php
  
  ```bash
    $ php artisan lt-permission:update --vendor-name=Vendor,Name
  ```
  
  
  ## Create Template on Lortom
  
  To create a template in Lortom, the first thing to do is understand how the folder structure works
  
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
     |--- laravel-app
          |
          |--- template
               |
               |--- Vendor
                    |
                    |--- NameOfTemplate
                         |
                         |--- frontend
                         |    |
                         |    |-- Model
                         |
                         |--- config.json
  ```
  
  In the Model folder will be put the classes that will take care of processing the data of the various pages created. 
  The File config.json is as follows:
  
  ```json
  {
    "vendor": "LortomTemplate",
    "name": "Awesome",
    "version": "0.1.0",
    "author": {
        "name": "Hernan Ariel De Luca",
        "email": "hadeluca[at]gmail.com"
    },
    "plugins": {
        "require": {
            "Hardel@Plugin": "1.0.0",
            "Hardel@Settings": "1.0.0",
            "Hardel@Website": "1.0.0",
            "Hardel@Dashboard": "1.0.0"
        }
    },
    "models": [
        "LortomTemplate\\Awesome\\Model\\HomePage",
        "LortomTemplate\\Awesome\\Model\\ProductPage"
    ],
    "assets": {
        "css": [
          "/path/to/css/style.css"
        ],
        "js": [
          "/path/to/js/some.js"
        ]
    },
    "frontend": {
        "autoload": {
            "psr-4": {
                "LortomTemplate\\Awesome\\": "template/LortomTemplate/Awesome/frontend"
            }
        }
    }
  }
  ```

- `vendor`: the vendor name;
- `name`: the name of template;
- `version`: the version of Template (please, follow the [Semantic Versioning](https://semver.org/));
- `author`: you can put your `name`and your `email`;
- `plugins`: this is a list of Plugins that your template `require`;
- `models`: here the classes dealing with the manipulation of frontend data must be entered;
- `assets`: you can specify `css` and `js` in order to inject into html
- `frontend`: this will be generated automatically and inserted into the composer.json of the application


#### Use Artisan Command
 
 
##### Create command

```bash
$ php artisan lt-template:create --vendor-name=Vendor,Name
```

This command allow you a creation of template.
 
 you can also digit this command:
 
 ```bash
  $ php artisan lt-template:create
 ```
 
 and simply answer the questions.
 
 ##### Delete command
  
   ```bash
   $ php artisan lt-template:delete --vendor-name=Vendor,Name
   ```
   
   This command delete all references of template.
   
   
 ##### Add Plugin into Template
 
 ```bash
 $ php artisan lt-template:add-plugin --vendor-name=Vendor,Name [for template] --name-plugin=Vendor,Name (for plugin)
 ```
 
 This command add plugin into template, please make sure you have installed the necessary plugins and then be able to add them to the template.
  
 
  
##### Remove Plugin from Template

```bash
$ php artisan lt-template:rm-plugin --vendor-name=Vendor,Name [for template] --name-plugin=Vendor,Name (for plugin)
```

This command remove plugin from template.


##### Export Database

```bash
$ php artisan lt-template:dbexp
```

This command exports the components from the db by taking the active template.