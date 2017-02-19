angular.module('dbCodeChallenge', ['ionic', 'api.module', 'message.module', 'auth.module', 'user.module', 'restaurant.module', 'vote.module'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
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
  });
})

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

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
        }
    })

    .state('tab.user', {
        url: '/user',
        views: {
            'tab-user': {
                templateUrl: 'js/users/tab-user.html',
                controller: 'UserCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/restaurants');
});
