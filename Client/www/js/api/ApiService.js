angular.module('api.module').service('ApiService', ['$http', '$q', 'API_URL', function($http, $q, API_URL) {
    var self = this;

    this.get = function(path, params) {
		var request = {
			url: API_URL + path,
			method: 'GET',
			params: params
		};
        return self.call(request);
	};

    this.post = function(path, values) {
        var request = {
			url: API_URL + path,
			method: 'POST',
			data: values
		};
		return self.call(request);
	};

    this.put = function(path, values) {
        var request = {
			url: API_URL + path,
			method: 'PUT',
			data: values
		};
		return self.call(request);
	};

    this.delete = function(path) {
        var request = {
			url: API_URL + path,
			method: 'DELETE'
		};
		return self.call(request);
	};

    this.call = function(request) {
        return $http(request).then(function(result){
            if (result && result.data) {
                return result.data;
            }
            return result;
		});
    };
}]);
