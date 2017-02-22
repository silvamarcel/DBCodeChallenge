### General information: ###

* The interface wasn't required, so I used ionic to build a basic interface.

## Required configuration: ##

* Node 7.5.0 - https://nodejs.org/dist/v7.5.0/node-v7.5.0-x64.msi;
* Git - https://git-scm.com/download/win;
* Atom - https://atom.io/download/windows_x64 or your prefered IDE;
* MongoDB - https://www.mongodb.com/download-center?jmp=nav#community;
* Redis - https://redis.io/download (OS X) or https://github.com/MSOpenTech/redis/releases (Windows)

####################
### Server side: ###
####################

## Installing Server dependencies ##

* Run "npm install -g gulp";
* Follow the instructions of https://docs.mongodb.com/manual/installation/ to install MongoDB in your own environment
* Remember you need to create the default folder before start MongoDB. The folder should be created in "C:/data/db" (Windows) or "/data/db" (OS X)
* Run "npm install" inside the server project folder;

## Running the server application ##

* In your terminal/CMD, go to the MongoDB installation folder and Run "mongod.exe" (Windows) or "mongod" (OS X);
* In another terminal/CMD, go to the Server folder of the application and Run "gulp" to start the server;

## Observations ##

* Inside the file "src/config/config.js" in the begining of the file, there is a configuration called "config.seedDB", this config, if setted to "true" is responsible for clean and input default values in the MongoDB every time the server was initialized. If you want persist the data, set this config to "false";

####################
### Client side: ###
####################

## Installing Client dependencies ##

* Run "npm install -g karma-cli";
* Run "npm install -g phantomjs";
* Run "npm install -g cordova ionic";
* Run "npm install" inside the client project folder;

## Running the client application ##

* Run "ionic serve";

## Testing the client application ##

* Run "gulp test"; (Single execution)
* Run "karma start tests/unit-tests.conf.js"; (With watcher)

####################
### Highlights:  ###
####################

* The client was created in a TDD style with automated tests, however, they were built only with unit tests and don't cover all Stories because some rules were implemented only in the server.

#####################
### Improvements: ###
#####################

* Creation of tests for the server side;
* Use of cache for data which doesn't change frequently;

######################
### Relevant Info: ###
######################

* I never worked with node.js and for the code challenge I follow a tutorial and I used some codes from it, however, I just used the authentication codes and I did some changes to adapt these codes for this application.
