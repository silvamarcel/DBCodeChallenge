angular.module('auth.module').controller('AuthCtrl', ['$state', 'ApiService', 'MessageService', function($state, ApiService, MessageService) {
    var ctrl = this;

    // Do the login to identify the user and not allow multiple votes
    ctrl.login = function(user) {
        ApiService.post('/auth/login', user).then(function(loggedUser){
            $state.go('restaurants');
        }).catch(ctrl.authError);
	};

    //Finish the user session in the server side and redirect to login
    ctrl.logout = function() {
        ApiService.get('/auth/logout').then(function(){
            $state.go('login');
        }).catch(ctrl.authError);
    };

    ctrl.authError = function(error) {
        MessageService.throwError(error);
        $state.go('login');
    }
}]);
