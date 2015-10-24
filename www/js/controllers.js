angular.module('starter.controllers', [])

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

.controller('AccountCtrl', function($scope) {
  var fahrenheit;

    $scope.getFahrenheit = function($scope) {
      fahrenheit = celsius * 33.8;
    }

  $scope.settings = {
    notifications:false
  };
})

.controller('PopOver', function($scope, $ionicPopover) {
  var myPopup;

  $scope.data = [{
    name: 'Specify your location'
  }];

  $ionicPopover.fromTemplateUrl('popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.showPopover = function($event, index)
  {
    $scope.index = index;
    $scope.popover.show($event);
  }

  $scope.closeInController = function(selectedItem) {
    $scope.popover.hide();
    $scope.data[$scope.index].selected = selectedItem;
  };
  })


  .controller('WeatherCtrl', function ($scope) {

  })

  .controller('NowcastCtrl', function ($scope) {

  })
