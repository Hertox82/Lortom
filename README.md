# Lortom
Lortom is an Content Management System built in Laravel 5.5 + Angular 4

[ChangeLog](CHANGELOG.md)

## Installing Lortom CMS


### Requirements

- php >=7.0.0
- OpenSSL PHP Extension
- PDO PHP Extension
- Mbstring PHP Extension
- Tokenizer PHP Extension
- XML PHP Extension




### First Step

In order to install the Lortom CMS, before you must install:

- [NodeJS](https://nodejs.org/it/)
- [LTpm](https://github.com/Hertox82/lt-pm)


### Second Step

Configure your `Database`, choose one from MySQL, SQLite, Postgres or SQL Server
 
 
### Third Step


run this command on your console:

```bash
$ composer create-project "hadeluca/lortom" blog --prefer-dist
```

Composer download for you the package and install the dependencies.

### Fourth Step

before launching the setup command, look in the .env file if the following variables match the actual path with your path:

- `NODE_JS`
- `NPM`
- `LTPM`


### Fifth Step

Ok now it's time to run the Lortom setup command. It will ask you questions about configuring the `database`

```bash
$ php artisan lt-setup:init
```

this command:

- Write .env database configuration
- Run migration
- create in config folder 2 files
- Install the follows plugins: Dashboard, Settings, Plugin and Website
- install Angular in background

##

Ok, now everything is ready, you can start creating something really cool.

If you want to know how to build a Plugin or Template please, read this [document](DEVELOPMENT.md)

 
 
 
 

