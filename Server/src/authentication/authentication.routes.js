'use strict';

var authentication = require('./authentication.controller.js');

function setAuthenticationRoutes(app) {
    app.route('/api/auth/signin').post(authentication.signin);
    app.route('/api/auth/signout').get(authentication.signout);
    app.route('/api/auth/signup').post(authentication.signup);
}

module.exports = setAuthenticationRoutes;
