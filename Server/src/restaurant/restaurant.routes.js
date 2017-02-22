'use strict';

var restaurant     = require('./restaurant.controller.js');
var authentication = require('../authentication/authentication.controller.js');

function setRestaurantsRoutes(app) {
    app.route('/api/restaurants').get(authentication.isAuthenticated, restaurant.findAll);
    app.route('/api/restaurants/:id').get(authentication.isAuthenticated, restaurant.findById);
    app.route('/api/restaurants/:id/vote').post(authentication.isAuthenticated, restaurant.vote);
}

module.exports = setRestaurantsRoutes;
