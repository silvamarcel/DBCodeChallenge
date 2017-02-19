angular.module('restaurant.module').controller('RestaurantDetailCtrl', ['$scope', 'Restaurant', function($scope, Restaurant) {
    $scope.restaurant = Restaurant;
}]);
