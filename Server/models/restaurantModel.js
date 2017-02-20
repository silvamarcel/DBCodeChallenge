var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var restaurantModel = new Schema({
    id: Number,
    name: String,
    cousine: String,
    numberOfVotes: Number,
    isVoted: {type: Boolean, default:false},
    votes: [String],
    urlImage: {type: String}
});

module.exports = mongoose.model('Restaurant', restaurantModel);
