angular.module('auth.module').controller('AuthCtrl', ['$rootScope', '$state', 'Authentication', 'MessageService', function($rootScope, $state, Authentication, MessageService) {

    var ctrl = this;
    ctrl.credentials = {
        email: null,
        password: null
    };
    ctrl.user = {
        name: null,
        email: null,
        password: null
    };

    // Do the login to identify the user and not allow multiple votes
    ctrl.login = function() {
        Authentication.signin(ctrl.credentials).then(function () {
            ctrl.goRestaurants();
        }).catch(ctrl.authError);
	};

    ctrl.signup = function() {
        Authentication.signup(ctrl.user).then(function () {
            MessageService.success('Your user was created!');
            ctrl.goRestaurants();
        }).catch(ctrl.authError);
	};

    //Finish the user session in the server side and redirect to login
    ctrl.logout = function() {
        Authentication.signout().then(function () {
            $state.go('login');
        }).catch(ctrl.authError);
    };

    ctrl.authError = function(error) {
        if (error && error.data) {
            MessageService.throwError(error.data);
        }
        $state.go('login');
    };

    ctrl.goSignup = function() {
        $state.go('signup');
    };

    ctrl.goRestaurants = function() {
        // save user profile details to $rootScope
        $rootScope.me = Authentication.getCurrentUser();
        $state.go('tab.restaurants');
    };
}]);
