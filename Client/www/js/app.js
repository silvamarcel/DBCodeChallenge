angular.module('dbCodeChallenge', ['ionic', 'restangular', 'LocalStorageModule', 'message.module', 'auth.module', 'user.module', 'restaurant.module', 'vote.module'])

.run(function($ionicPlatform, $rootScope, $location, Authentication) {
    $ionicPlatform.ready(function() {
        // save user profile details to $rootScope
        $rootScope.me = Authentication.getCurrentUser();

        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        $rootScope.$on('$stateChangeStart', function (event, toState) {
            if(toState.data.authenticate && !Authentication.isAuthenticated()) {
                event.preventDefault();
                $location.path('/#/login');
            }
        });
    });
})

.constant('SERVER_API_URL', 'http://localhost:3000/api')

.config(function($stateProvider, $urlRouterProvider, RestangularProvider, localStorageServiceProvider, SERVER_API_URL) {

    //Restangular config
    RestangularProvider.setBaseUrl(SERVER_API_URL);
    // set the `id` field to `_id`
    RestangularProvider.setRestangularFields({
        id: '_id'
    });

    //localStorage config
    localStorageServiceProvider.setPrefix('dbCodeChallenge');

    //Routes
    $stateProvider

    //Authentication
	.state('login', {
		url: '/login',
		templateUrl: 'js/auth/login.html',
		controller: 'AuthCtrl',
		controllerAs: 'authCtrl',
        data: {
            authenticate: false
        }
	})
    .state('signup', {
		url: '/singup',
		templateUrl: 'js/auth/signup.html',
		controller: 'AuthCtrl',
		controllerAs: 'authCtrl',
        data: {
            authenticate: false
        }
	})

    // setup an abstract state for the tabs directive
    .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'js/tabs.html'
    })

    // Each tab has its own nav history stack:
    .state('tab.restaurants', {
        url: '/restaurants',
        views: {
            'tab-restaurants': {
                templateUrl: 'js/restaurants/tab-restaurants.html',
                controller: 'RestaurantCtrl',
                controllerAs: 'ctrl'
            }
        },
        data: {
            authenticate: true
        }
    })
    .state('tab.restaurants-detail', {
        url: '/restaurants/:restaurantId',
        views: {
            'tab-restaurants': {
                templateUrl: 'js/restaurants/restaurant-detail.html',
                controller: 'RestaurantDetailCtrl',
                resolve: {
                    Restaurant: function($stateParams, RestaurantService) {
                        return RestaurantService.getRestaurant($stateParams.restaurantId);
                    }
                }
            }
        },
        data: {
            authenticate: true
        }
    })

    .state('tab.user', {
        url: '/user',
        views: {
            'tab-user': {
                templateUrl: 'js/users/tab-user.html',
                controller: 'UserCtrl'
            }
        },
        data: {
            authenticate: true
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('login');
});
