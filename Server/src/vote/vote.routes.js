'use strict';

var vote           = require('./vote.controller.js');
var authentication = require('../authentication/authentication.controller.js');

function setVotesRoutes(app) {
    app.route('/votes/:id').get(authentication.isAuthenticated, vote.findById);
    app.route('/votes').get(authentication.isAuthenticated, vote.findAll);
}

module.exports = setVotesRoutes;
