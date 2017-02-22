angular.module('restaurant.module').controller('RestaurantCtrl', ['$scope', '$location', 'RestaurantService', 'MessageService', 'VoteService', function($scope, $location, RestaurantService, MessageService, VoteService) {

    var ctrl = this;
    $scope.restaurants = [];

    $scope.$on('$ionicView.enter', function(e) {
        ctrl.getRestaurants();
    });

    ctrl.goDetail = function(restaurantId) {
        $location.path("tab/restaurants/" + restaurantId);
    }

    ctrl.getRestaurants = function() {
        RestaurantService.getRestaurants().then(function(restaurants) {
            if (restaurants && restaurants.length > 0) {
                $scope.restaurants = restaurants;
			}
		}).catch(MessageService.throwError);
    };

    ctrl.hasVote = function() {
        var item = $scope.restaurants.filter(function(restaurant) {
            return restaurant.isVoted;
        });
        return item.length > 0;
    };

    ctrl.vote = function(restaurantId) {
        VoteService.vote(restaurantId).then(function(message) {
            //Update the list of restaurants
            ctrl.getRestaurants();
            MessageService.success(message);
		}).catch(MessageService.throwError);
    };
}]);
