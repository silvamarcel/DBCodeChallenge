angular.module('user.module').service('UserService', ['$http', 'ApiService', function($http, ApiService) {
    var self = this;

    //Return a promise with a logged user if is logged, otherwise will return an exception with status and message.
    this.getLoggedUser = function() {
		//return ApiService.get('/users/logged');
        return ApiService.get('/js/api/local/loggedUser.json');
	};
}]);
