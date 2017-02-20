var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var validateLocalStrategyProperty = function(property) {
    return ((this.provider !== 'local' && !this.updated) || property.length);
};

var restaurantModel = new Schema({
    id: Number,
    name: {
        type: String,
        trim: true,
        validate: [validateLocalStrategyProperty, 'Please fill in the restaurant name']
    },
    cousine: String,
    numberOfVotes: Number,
    isVoted: {
        type: Boolean,
        default:false
    },
    votes: [String],
    urlImage: {type: String}
});

module.exports = mongoose.model('Restaurant', restaurantModel);
