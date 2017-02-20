var express = require('express');
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/dbAPI');
var Restaurant = require('./models/restaurantModel');

var app = express();
var port = process.env.PORT || 3000;
var appRouter = express.Router();

appRouter.route('/restaurants')
    .get(function(req, res) {
        Restaurant.find(function(err, restaurants) {
            if (err) {
                res.status(500).send(err);
                console.log(err);
            } else {
                res.json(restaurants);
            }
        });
    });

app.use('/api', appRouter);
app.get('/', function(req, res) {
    res.send('Welcome to my API');
});
app.listen(port, function() {
    console.log('Gulp is running my app on PORT: ' + port);
});
