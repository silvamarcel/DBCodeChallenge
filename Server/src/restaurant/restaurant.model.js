var mongoose = require('mongoose');
var User = require('../user/user.model');
var Schema = mongoose.Schema;

var restaurantModel = new Schema({
    id: Number,
    name: String,
    cousine: String,
    isVoted: {
        type: Boolean,
        default: false
    },
    votes: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        userName: String,
        votedAt: {
            type: Date,
            default: Date.now
        }
    }],
    urlImage: {type: String}
});

module.exports = mongoose.model('Restaurant', restaurantModel);
