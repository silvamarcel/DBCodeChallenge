### General information: ###

* The fact of interface isn't required I used ionic to build a basic interface (without effort) and to use node as library manager.

## Required configuration: ##

* Node 7.5.0 - https://nodejs.org/dist/v7.5.0/node-v7.5.0-x64.msi;
* Git - https://git-scm.com/download/win;
* Atom - https://atom.io/download/windows_x64 or your prefered IDE;
* MongoDB - https://www.mongodb.com/download-center?jmp=nav#community;

####################
### Server side: ###
####################

## Installing Server dependencies ##

* Run "npm install -g gulp";
* Follow the instructions of https://docs.mongodb.com/manual/installation/ to install MongoDB in your own environment
* Remember you need to create the default folder before start MongoDB. The folder should be in "C:/data/db" (windows) or "/data/db" (OS X)

## Running the server application ##

* In your terminal, go to the MongoDB installation folder and Run "mongod.exe" (Windows) or "mongod" (OS X);
* In another terminal, go to the Server folder of the application and Run "gulp" to start the server;


####################
### Client side: ###
####################

## Installing Client dependencies ##

* Run "npm install -g karma-cli";
* Run "npm install -g phantomjs";
* Run "npm install -g cordova ionic";
* Run "npm install" inside the project folder;

## Running the client application ##

* Run "ionic serve";

## Testing the client application ##

* Run "gulp test"; (Single execution)
* Run "karma start tests/unit-tests.conf.js"; (With watcher)
