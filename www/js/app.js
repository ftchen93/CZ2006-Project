// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','xml','ionic.utils'])

  .run(function($ionicPlatform, $rootScope) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
      }
      // Hide the tabs since we have a navigation page
      //$rootScope.hideTabs = true;
    });

  })

  .directive('hideTabs', function($rootScope) {
    return {
      restrict: 'A',
      link: function(scope, element, attributes) {
        scope.$watch(attributes.hideTabs, function(value){
          $rootScope.hideTabs = value;
        });
        scope.$on('$ionicView.beforeLeave', function() {
          $rootScope.hideTabs = false;
        });
      }
    };
  })

  .config(function($stateProvider, $urlRouterProvider,$httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      // Each tab has its own nav history stack:
      .state('tab.about', {
        url: '/about',
        views: {
          'tab-about': {
            templateUrl: 'templates/tab-about.html',
            //controller: 'AboutCtrl'
          }
        }
      })

      .state('tab.home', {
        url: '/home',
        views: {
          'tab-home': {
            templateUrl: 'templates/tab-home.html',
            controller: 'HomeCtrl'
          }
        }
      })

      .state('tab.weather', {
        url: '/weather',
        cache: false,
        views: {
          'tab-weather': {
            templateUrl: 'templates/tab-weather.html',
            controller: 'WeatherCtrl'
          }
        }
      })

      .state('tab.weatherNowcast', {
        url: '/weather/nowcast',
        views: {
          'tab-weather': {
            templateUrl: 'templates/weather/nowcast.html',
            controller: 'NowcastCtrl'
          }
        }
      })

      .state('tab.settings', {
        url: '/settings',
        views: {
          'tab-settings': {
            templateUrl: 'templates/tab-settings.html',
            controller: 'SettingsCtrl'
          }
        }
      })

      .state('tab.plan', {
        url: '/plan',
        views: {
          'tab-plan': {
            templateUrl: 'templates/tab-plan.html',
            controller: 'PlanCtrl'
          }
        }
      })

      .state('tab.view', {
        url: '/view',
        views: {
          'tab-view': {
            templateUrl: 'templates/tab-view.html',
            controller: 'ViewCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home');
  });

