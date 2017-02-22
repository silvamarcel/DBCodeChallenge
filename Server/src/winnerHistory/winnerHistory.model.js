var mongoose = require('mongoose');
var Restaurant = require('../restaurant/restaurant.model');
var Schema = mongoose.Schema;

var winnerHistoryModel = new Schema({
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('WinnerHistory', winnerHistoryModel);
