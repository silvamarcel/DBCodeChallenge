angular.module('restaurant.module').service('RestaurantService', ['ApiService', function(ApiService) {

    var self = this;

    //Return a promise with the list of available restaurants.
    this.getRestaurants = function() {
        //TODO return ApiService.get('/restaurants');
        return ApiService.get('/js/api/local/restaurants.json');
	};

    //Return a promise with the details of the restaurant.
    this.getRestaurant = function(id) {
        //TODO return ApiService.get('/restaurants/' + id);
        //TODO remove after the back-end service is done
        return self.getRestaurants().then(function(restaurants) {
            return restaurants.find(function(restaurant) {
                return restaurant.id == id;
            });
        });
    };
}]);
