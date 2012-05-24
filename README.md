# B2G Scripts

Contains a single cli script - `b2g-gaia` with a growing number of subcommands.

In general it is assumed you have a working b2g emulator/desktop/phone with 
marionette turned on and listening on port 2828.

Commands like reload-app are not going to be useful if your not in DEBUG mode
(everything is in offline cache).

## Install

```` sh
# notice the -g option for global
npm install b2g-scripts -g
````

## Recomended B2G Desktop settings

``` sh
cd $GAIA_DIR
make DEBUG=1
```

## Commands

Run `b2g-script` with no arguments to see the list of current commands.
Each command has sub options as well and all respond to the --help option.

````sh
b2g-script watch --help
````

### b2g-script watch

Watches a directory for web dev changes js/css/html/properties files.
Executes a cli command. You can use this to chain other sub commands.

```` sh
# I use this all the time to reload app when I am making rapid
# html/css changes
b2g-gaia watch "b2g-gaia reload-app"
````

### b2g-script cmd

Runs any of the marionette commands with _n_ number of arguments

```` sh
b2g-gaia cmd goUrl http://google.com
````

### b2g-script reload-app

Reloads currently running app.

*warning* this is bound to the current implementation
of gaia and _will_ break if that implementation changes.

```` sh
b2g-gaia cmd reload-app
````