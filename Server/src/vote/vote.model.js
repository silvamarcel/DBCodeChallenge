var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var voteModel = new Schema({
    id: Number,
    restaurantId: Number,
    userId: Number
});

module.exports = mongoose.model('Vote', voteModel);
