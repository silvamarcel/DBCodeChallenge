describe('RestaurantCtrl', function() {

    var defferedRestaurants;
    var defferedVote;
    var defferedCancelVote;
    var RestaurantServiceMock;
    var MessageServiceMock;
    var VoteServiceMock;
    var locationMock;
    var restaurantCtrl;
    var errorResult = 'Error message';
    var successResult = [{
        id: 1, name: 'Restaurant 1', isVoted: true
    },{
        id: 2, name: 'Restaurant 2', isVoted: false
    }];
    var id;
    var $rootScope;
    var scope;

    // Load the Restaurant Module
    beforeEach(module('restaurant.module'));

    // load the controller's module
    beforeEach(inject(function(_$rootScope_, $controller, $q) {
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        defferedRestaurants = $q.defer();
        defferedVote = $q.defer();
        defferedCancelVote = $q.defer();

        //mocks
        RestaurantServiceMock = {
            getRestaurants: jasmine.createSpy('getRestaurants').and.returnValue(defferedRestaurants.promise)
        };
        MessageServiceMock = {
            throwError: jasmine.createSpy('throwError'),
            success: jasmine.createSpy('success'),
        };
        locationMock = {
            path: jasmine.createSpy('path')
        };
        VoteServiceMock = {
            vote: jasmine.createSpy('vote').and.returnValue(defferedVote.promise),
            cancelVote: jasmine.createSpy('cancelVote').and.returnValue(defferedCancelVote.promise)
        };

        // instantiate RestaurantCtrl
        restaurantCtrl = $controller('RestaurantCtrl', {
            $scope: scope,
            $location: locationMock,
            'RestaurantService': RestaurantServiceMock,
            'MessageService': MessageServiceMock,
            'VoteService': VoteServiceMock
        });
    }));

    describe('#getRestaurants', function() {
        beforeEach(function() {
            restaurantCtrl.getRestaurants();
        });

        it('should be called in RestaurantService', function() {
            expect(RestaurantServiceMock.getRestaurants).toHaveBeenCalled();
        });

        describe('is executed', function() {
            it('if successful, should return the list of valid restaurants', function() {
                defferedRestaurants.resolve(successResult);
                $rootScope.$digest();
                expect(scope.restaurants).not.toBeNull();
                expect(scope.restaurants.length).toEqual(successResult.length);
            });

            it('if unsuccessful, should call throwError from MessageService', function() {
                defferedRestaurants.reject(errorResult);
                $rootScope.$digest();
                expect(MessageServiceMock.throwError).toHaveBeenCalledWith(errorResult);
            });
        });
    });

    describe('#goDetail', function() {
        beforeEach(function() {
            id = 1;
            restaurantCtrl.goDetail(id);
        });

        it('should call location path', function() {
            expect(locationMock.path).toHaveBeenCalledWith('tab/restaurants/' + id);
        });
    });

    describe('#hasVote', function() {
        beforeEach(function() {
            scope.restaurants = successResult;
        });

        it('should return true', function() {
            expect(restaurantCtrl.hasVote()).toBe(true);
        });

        it('should return false', function() {
            scope.restaurants[0].isVoted = false;
            expect(restaurantCtrl.hasVote()).toBe(false);
        });
    });

    describe('#vote', function() {
        beforeEach(function() {
            id = 1;
            scope.restaurants = successResult;
            restaurantCtrl.vote(id);
        });

        describe('is executed', function() {
            it('if successful, should call VoteService and show success', function() {
                defferedVote.resolve();
                $rootScope.$digest();
                expect(VoteServiceMock.vote).toHaveBeenCalledWith(id);
                expect(MessageServiceMock.success).toHaveBeenCalled();
            });

            it('if unsuccessful, should call throwError from MessageService', function() {
                defferedVote.reject(errorResult);
                $rootScope.$digest();
                expect(MessageServiceMock.throwError).toHaveBeenCalledWith(errorResult);
            });
        });
    });

    describe('#cancelVote', function() {
        beforeEach(function() {
            id = 1;
            scope.restaurants = successResult;
            restaurantCtrl.cancelVote(id);
        });

        describe('is executed', function() {
            it('if successful, should call VoteService and show success', function() {
                defferedCancelVote.resolve();
                $rootScope.$digest();
                expect(VoteServiceMock.cancelVote).toHaveBeenCalledWith(id);
                expect(MessageServiceMock.success).toHaveBeenCalled();
            });

            it('if unsuccessful, should call throwError from MessageService', function() {
                defferedCancelVote.reject(errorResult);
                $rootScope.$digest();
                expect(MessageServiceMock.throwError).toHaveBeenCalledWith(errorResult);
            });
        });
    });
});
