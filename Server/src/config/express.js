'use strict';

var cors           = require('cors');
var path           = require('path');
var morgan         = require('morgan');
var helmet         = require('helmet');
var logger         = require('mm-node-logger')(module);
var express        = require('express');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var pathUtils      = require('../utils/path-utils');
var config         = require('./config');

function initMiddleware(app) {
    // Showing stack errors
    app.set('showStackError', true);

    // Enable jsonp
    app.enable('jsonp callback');

    // Environment dependent middleware
    if (config.environment === 'development') {
        // Enable logger (morgan)
        app.use(morgan('dev'));

        // Disable views cache
        app.set('view cache', false);
    } else if (config.environment === 'production') {
        app.locals.cache = 'memory';
    }

    // Request body parsing middleware should be above methodOverride
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
}

function initHelmetHeaders(app) {
    app.use(helmet.frameguard());
    app.use(helmet.xssFilter());
    app.use(helmet.noSniff())
    app.use(helmet.ieNoOpen());
    app.disable('x-powered-by');
}

function initCrossDomain(app) {
    app.use(cors());
    app.use(function(req, res, next) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
        res.set('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token');
        next();
    });
}

function initGonfig(app) {
    pathUtils.getGlobbedPaths(path.join(__dirname, '../**/*.config.js')).forEach(function (routePath) {
        require(path.resolve(routePath))(app);
    });
}

function initRoutes(app) {
    pathUtils.getGlobbedPaths(path.join(__dirname, '../**/*.routes.js')).forEach(function (routePath) {
        require(path.resolve(routePath))(app);
    });
}

function initErrorRoutes(app) {
    app.use(function (err, req, res, next) {
        if (!err) return next();
        logger.error('Internal error(%d): %s', res.statusCode, err.stack);
        res.sendStatus(500);
    });
    app.use(function (req, res) {
        res.sendStatus(404);
    });
}

function initDB() {
    if(config.seedDB) {
        require('./seed');
    }
}

function init() {
    var app = express();
    initMiddleware(app);
    initHelmetHeaders(app);
    initCrossDomain(app);
    initGonfig(app);
    initRoutes(app);
    initErrorRoutes(app);
    initDB();
    return app;
}

module.exports.init = init;
