angular.module('starter.controllers', [])

.controller('HomeCtrl' , function ($scope){
    $scope.picture = {
      "artworks": [
        {
          "img_about_us": "img/aboutus.jpg",
          "href": "tab.about",
          "title": "about us"
        },
        {
          "img_bg": "img/background.jpg"
        },
        {
          "img_plan_activity": "img/planactivity.jpg",
          "href": "tab.about",
          "title": "Plan Activity"
        },
        {
          "img_settings": "img/settings.jpg",
          "href": "tab.settings",
          "title": "Settings"
        },
        {
          "img_weather_now": "img/weathernow.jpg",
          "href": "tab.weather",
          "title": "Weather Now"
        }


      ]
    };
})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);

})

.controller('SettingsCtrl', function($scope) {
  $scope.settings = {
    enableFriends: false
  };
})
.controller('WeatherCtrl', function($scope,WeatherService,$ionicSlideBoxDelegate) {

    $scope.nowcast = WeatherService.getNowcast();

    $scope.halfDay = WeatherService.getHalfday();


  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };

  $scope.navSlide= function(index) {
    $ionicSlideBoxDelegate.slide(index,500);
  };


})

.controller('NowcastCtrl', function ($scope) {

 })

.controller('PlanCtrl', function($scope) {})

.controller('HistoryViewCtrl', function($scope, $rootScope) {
  $scope.clearViewHistory = function() {
    console.log('clearViewHistory');
      $rootScope.$viewHistory = {
      histories: { root: { historyId: 'root', parentHistoryId: null, stack: [], cursor: -1 } },
      backView: null,
      forwardView: null,
      currentView: null,
      disabledRegistrableTagNames: []
    };
  }
});


