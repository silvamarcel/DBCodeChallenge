'use strict';

var moment = require('moment');
var mongoose = require('mongoose');
var WinnerHistory = require('../winnerHistory/winnerHistory.model.js');

// Return a promise with the results of restaurants which won in the same week
function getWeekWinners() {
    var begin = moment().weekday(1).startOf('day');
    var end = moment().weekday(7).endOf('day');
    return WinnerHistory.find({createdAt: { $gte:begin.toDate(), $lt:end.toDate() }}).exec();
}

// Create the winnerHistory
function createWinner(restaurant) {
    WinnerHistory.create({
        _id: mongoose.Types.ObjectId(),
        restaurant: restaurant
    });
}

module.exports = {
    getWeekWinners: getWeekWinners,
    createWinner: createWinner
};
