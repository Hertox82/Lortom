# Lortom

Lortom is an Content Management System built in Laravel + Angular

| Lortom  | Laravel supported version | Angular supported version |
| :-----: | :------------------------:| :------------------------:|
|  1.*    |          5.5.*            |          6.*              |
|  2.*    |          5.6.*            |          6.*              |
|  3.0.*  |          5.7.*            |          6.*              |
|  3.1.*  |          5.7.*            |          7.*              |
|  4.0.*  |          5.8.*            |          7.*              |
|  4.1.*  |          5.8.*            |          8.*              |
|  5.0.*  |          6.*              |          8.*              |
|  5.1.*  |          6.*              |          9.*              |
|  6.0.*  |          7.*              |          9.*              |
|  6.1.*  |          7.*              |         10.*              |
|  7.0.*  |          8.*              |         10.*              |
|  7.1.*  |          8.*              |         11.*              |

[ChangeLog](CHANGELOG.md)

## Installing Lortom CMS

### Requirements

- has same requirements of Laravel
- has same requirements of Angular

### First Step

In order to install the Lortom CMS, before you must install:

- [NodeJS](https://nodejs.org/it/)
- [LTpm](https://github.com/Hertox82/lt-pm)

### Second Step

Configure your `Database`, choose one from MySQL, SQLite, Postgres or SQL Server.

### Third Step

run this command on your console:

```bash
 composer create-project "hadeluca/lortom" blog --prefer-dist
```

Composer download for you the package and install the dependencies.

If the command above generates an error (because the version of Lortom is not yet stable), please try this one:

```bash
composer create-project "hadeluca/lortom"=versionNumber projectName
```

example of `versionNumber`: 1.0.0-rc2

### Fourth Step

before launching the setup command, look in the .env file if the following variables match the actual path with your path:

- `NODE_JS`
- `NPM`
- `LTPM`

### Fifth Step

Ok now it's time to run the Lortom setup command. It will ask you questions about configuring the `database`

```bash
 php artisan lt-setup:init
```

this command:

- Write .env database configuration
- Run migration
- create in config folder 2 files
- Install the follows plugins: Dashboard, Settings, Plugin, Website and File
- install Angular in background

---

Ok, now everything is ready, you can start creating something really cool.

If you want to know how to build a Plugin or Template please, read this [document](DEVELOPMENT.md)

[here](EDITOR.md) you can find how to use the Editor Manager, in order to build a fantastic Backend
