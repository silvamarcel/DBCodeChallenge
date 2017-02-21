angular.module('vote.module').service('VoteService', ['Restangular', function(Restangular) {
    var self = this;

    //Return a promise with the list of available restaurants.
    this.vote = function(restaurantId) {
		return ApiService.post('/vote', {
            restaurantId: restaurantId
        });
	};

    this.cancelVote = function(restaurantId) {
		return ApiService.delete('/vote/' + restaurantId);
	};
}]);
