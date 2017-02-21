angular.module('user.module').controller('UserCtrl', ['$scope', 'Authentication', function($scope, Authentication) {

    var ctrl = this;

    $scope.$on('$ionicView.enter', function(e) {
		$scope.user = {
            name: '',
            age: '',
            username: '',
            email: ''
        };
        ctrl.getUser();
	});

    ctrl.getUser = function() {
        $scope.user = Authentication.getCurrentUser()._doc;
    };
}]);
