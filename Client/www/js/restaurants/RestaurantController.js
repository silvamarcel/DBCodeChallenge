angular.module('restaurant.module').controller('RestaurantCtrl', ['$scope', '$location', 'RestaurantService', 'MessageService', 'VoteService', function($scope, $location, RestaurantService, MessageService, VoteService) {

    var ctrl = this;
    $scope.restaurants = [];

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
        VoteService.vote(restaurantId).then(function() {
            MessageService.success('Your vote was added!');
		}).catch(MessageService.throwError);
    };

    ctrl.cancelVote = function(restaurantId) {
        VoteService.cancelVote(restaurantId).then(function() {
            MessageService.success('Your vote was canceled!');
		}).catch(MessageService.throwError);
    };
}]);
