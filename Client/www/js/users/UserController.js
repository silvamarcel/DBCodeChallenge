angular.module('user.module').controller('UserCtrl', ['$scope', 'UserService', 'MessageService', function($scope, UserService, MessageService) {

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
        UserService.getLoggedUser().then(function(user) {
            $scope.user = user;
		}).catch(function(error) {
			MessageService.throwError(error);
		});
    };
}]);
