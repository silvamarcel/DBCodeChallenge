angular.module('message.module').service('MessageService', ['ionicToast', function(ionicToast) {
    var self = this;

    this.throwError = function(error) {
        self.showMessage(error.data);
    };

    this.success = function(successMessage) {
        self.showMessage(successMessage);
    };

    this.showMessage = function(message) {
        if (message) {
            ionicToast.show(message, 'bottom', false, 2500);
        }
    };
}]);
