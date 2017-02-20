angular.module('restaurant.module').controller('RestaurantCtrl', ['$scope', '$location', 'RestaurantService', 'MessageService', 'UserService', 'VoteService', function($scope, $location, RestaurantService, MessageService, UserService, VoteService) {

    var ctrl = this;
    $scope.restaurants = [];

    $scope.$on('$ionicView.enter', function(e) {
        UserService.getLoggedUser().then(function(user) {
            $scope.user = user;
		}).catch(function(error) {
			MessageService.throwError(error);
            $location.path("login");
		});
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
