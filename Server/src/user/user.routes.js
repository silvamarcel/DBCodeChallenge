'use strict';

var user           = require('./user.controller.js');
var authentication = require('../authentication/authentication.controller.js');

function setUserRoutes(app) {
    app.route('/users/:id').get(authentication.isAuthenticated, user.findById);
    app.route('/users').get(authentication.isAuthenticated, user.findAll);
}

module.exports = setUserRoutes;
