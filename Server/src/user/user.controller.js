'use strict';

var logger = require('mm-node-logger')(module);
var User   = require('./user.model.js');

function findById(req, res) {
    return User.findById(req.params.id, 'name email avatar', function (err, user) {
        if (err) {
            logger.error(err.message);
            return res.status(400).send(err);
        } else {
            res.json(user);
        }
    });
}

function findAll(req, res) {
    User.find(function(err, users) {
        if (err) {
            logger.error(err.message);
            return res.status(400).send(err);
        } else {
            res.json(users);
        }
    });
}

module.exports = {
    findById: findById,
    findAll: findAll
};
