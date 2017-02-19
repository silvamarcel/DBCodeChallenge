## General information: ##

* The fact of interface isn't required I used ionic to build a basic interface (without effort) and to use node as library manager.

## Required configuration: ##

* Node 7.5.0 - https://nodejs.org/dist/v7.5.0/node-v7.5.0-x64.msi
* Git - https://git-scm.com/download/win
* Atom - https://atom.io/download/windows_x64 or your developer IDE;

## Installing Client dependencies ##

* Run "npm install -g karma-cli";
* Run "npm install -g phantomjs";
* Run "npm install -g cordova ionic";
* Run "npm install" inside the project folder;

## Running the application ##

* Run "ionic serve";

## Testing the application ##

* Run "gulp test"; (Single execution)
* Run "karma start tests/unit-tests.conf.js"; (With watcher)
