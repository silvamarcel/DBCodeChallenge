'use strict';
var logger   = require('mm-node-logger')(module);
var passport = require('passport');
var token    = require('./token.controller.js');
var User     = require('../user/user.model.js');

function signin(req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        var error = err || info;
        if (error) return res.status(401).send(error.message);

        // Remove sensitive data before login
        user.password = undefined;
        user.salt = undefined;

        token.createToken(user, function(res, err, token) {
            if(err) {
                logger.error(err.message);
                return res.status(400).send(err.message);
            }
            res.status(201).json({token: token});
        }.bind(null, res));
    })(req, res, next)
}

function signout(req, res) {
    token.expireToken(req.headers, function(err, success) {
        if (err) {
            logger.error(err.message);
            return res.status(401).send(err.message);
        }
        if(success) {
            delete req.user;
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }
    });
}

function signup(req, res) {
    var email = req.body.email || '';
    var password = req.body.password || '';

    if (email == '' || password == '') {
        return res.sendStatus(400);
    }

    // Init Variables
    var user = new User(req.body);
    // Add missing user fields
    user.provider = 'local';

    // Then save the user
    user.save(function(err, user) {
        if (err) {
            logger.error(err.message);
            return res.status(400).send(err.message);
        } else {
            // Remove sensitive data before login
            user.password = undefined;
            user.salt = undefined;

            token.createToken(user, function(res, err, token) {
                if (err) {
                    logger.error(err.message);
                    return res.status(400).send(err.message);
                }
                res.status(201).json({token: token});
            }.bind(null, res));
        }
    });
}

function isAuthenticated(req, res, next) {
    token.verifyToken(req.headers, function(next, err, data) {
        if (err) {
            logger.error(err.message);
            return res.status(401).send(err.message);
        }
        req.user = data;
        next();
    }.bind(null, next));
}

module.exports = {
    signin: signin,
    signout: signout,
    signup: signup,
    isAuthenticated: isAuthenticated
};
