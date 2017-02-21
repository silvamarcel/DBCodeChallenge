angular.module('restaurant.module').service('RestaurantService', ['Restangular', function(Restangular) {

    var self = this;

    //Return a promise with the list of available restaurants.
    this.getRestaurants = function() {
        return Restangular.all('restaurants').getList();
	};

    //Return a promise with the details of the restaurant.
    this.getRestaurant = function(id) {
        return Restangular.one('restaurants', id).get();
    };
}]);
