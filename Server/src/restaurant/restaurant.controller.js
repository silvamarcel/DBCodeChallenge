'use strict';

var moment = require('moment');
var mongoose = require('mongoose');
var logger = require('mm-node-logger')(module);
var dateUtils = require('../utils/date-utils.js');
var Restaurant = require('./restaurant.model.js');
var WinnerHistory = require('../winnerHistory/winnerHistory.controller.js');

function findById(req, res) {
    getRestaurant(req.params.id).then(function(restaurant){
        res.json(restaurant);
    }).catch(function(error) {
        logger.error(error.message);
        res.status(400).send(error.message);
    });
}

function findAll(req, res) {
    getRestaurants(req.user._id).then(function(restaurants){
        res.json(restaurants);
    }).catch(function(error) {
        logger.error(error.message);
        res.status(400).send(error.message);
    });
};

function vote(req, res) {
    var restaurants = [];
    getRestaurants(req.user._id).then(function(result){
        restaurants = result;
        return getVotedRestaurant(req.user._id);
    }).then(function(votedRestaurant){
        var restaurant = restaurants.find(function(restaurant){
            return restaurant.id == req.params.id;
        });
        if (votedRestaurant && votedRestaurant.length > 0) {
            var error = 'You cannot vote again!';
            logger.error(error);
            res.status(400).send(error);
        } else {
            restaurant.votes.push({
                user: req.user._id,
                userName: req.user.name
            });
            restaurant.save(function(err) {
                if (err) {
                    logger.error(err.message);
                    res.status(400).send(err.message);
                }
                res.json('Vote added with success!');
            });
        }
    }).catch(function(error) {
        logger.error(error.message);
        res.status(400).send(error.message);
    });
};

function getRestaurant(restaurantId) {
    return Restaurant.findOne({id: restaurantId}).exec();
};

function getRestaurants(userId) {
    if (moment().isBetween(dateUtils.getTime(11,30,0,0), dateUtils.getTime(13,59,59,999))) {
        return getWinner(userId);
    } else {
        return getPossibleRestaurants(userId);
    }
};

function getVotedRestaurant(userId) {
    var validDates = dateUtils.getValidDates();
    return Restaurant.find({
        'votes.user': userId,
        'votes.votedAt': {
            $gte:validDates.begin.toDate(),
            $lte:validDates.end.toDate()
        }
    }).exec().then(function(restaurants) {
        return restaurants;
    });
};

function getWinner(userId) {
    return WinnerHistory.getWeekWinners().then(function(winners) {
        //Verify if exist winners for the week
        if (winners && winners.length > 0) {
            //Get the winner for today based on week winners
            var winner = winners.find(function(win) {
                return moment(win.createdAt).isBetween(dateUtils.getTime(11,30,0,0), dateUtils.getTime(13,59,59,999));
            });
            //If exists a winner return it as an array of restaurants
            if (winner && winner.restaurant) {
                return Restaurant.find({_id: winner.restaurant}, 'id name cousine urlImage').exec().then(function(restaurants) {
                    return restaurants;
                });
            }
        }
        //If the winner doesn't exist, get the possible list of restaurants, creates the winner and return it as an array of restaurants
        return getPossibleRestaurants(userId).then(function(restaurants) {
            return createWinner(restaurants);
        });
    });
};

function getPossibleRestaurants(userId) {
    var restaurants = [];
    return Restaurant.find().exec().then(function(result) {
        restaurants = result;
        return WinnerHistory.getWeekWinners();
    }).then(function(winners) {
        if (restaurants && restaurants.length > 0) {
            return restaurants.filter(function(restaurant){
                var winnerRestaurant = getWinnerRestaurant(winners, restaurant);
                if (!winnerRestaurant) {
                    buildValidVotes(restaurant, userId);
                    return true;
                }
                return false;
            });
        }
        return [];
    });
}

function buildValidVotes(restaurant, userId) {
    if (restaurant.votes) {
        var validDates = dateUtils.getValidDates();
        //Get valid votes for the day and use it
        restaurant.votes = restaurant.votes.filter(function(v) {
            return (moment(v.votedAt).isAfter(validDates.begin) && moment(v.votedAt).isBefore(validDates.end));
        });
        //Get user vote for the day
        if (restaurant.votes && restaurant.votes.length > 0) {
            var vote = restaurant.votes.find(function(v) {
                return v.user == userId && moment(v.votedAt).isAfter(validDates.begin) && moment(v.votedAt).isBefore(validDates.end);
            });
            if (vote) {
                restaurant.isVoted = true;
            }
        }
    }
};

function createWinner(restaurants) {
    var restaurant = restaurants[0];
    for (var i = 0; i < restaurants.length; i++) {
        var votes = restaurant.votes.map(function(vote){
            var validDates = dateUtils.getValidDates();
            if (moment(vote.votedAt).isAfter(validDates.begin) && moment(vote.votedAt).isBefore(validDates.end)) {
                return vote;
            }
        });
        if (votes.length < restaurants[i]) {
            restaurant = restaurants[i];
        }
    }
    WinnerHistory.createWinner(restaurant);
    return [restaurant];
};

function getWinnerRestaurant(winners, restaurant) {
    if (winners && winners.length > 0) {
        return winners.find(function(winner){
            return restaurant._id.toString() === winner.restaurant.toString();
        });
    }
    return null;
};

module.exports = {
    findById: findById,
    findAll: findAll,
    vote: vote
};
