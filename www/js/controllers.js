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
   $scope.fahrenheit = 30;
   $scope.metrics = {
      celsius:true
    };

    $scope.settings = {
      notifications:false
    };



    if ($scope.metrics.celsius == true) {
      $scope.fahrenheit  *= 33.8;
      
      }

    

  })

  .controller('PopOver', function($scope, $ionicPopover) {
    var myPopup;

    $scope.data = [{
      name: 'Specify your location',
    }];

    $ionicPopover.fromTemplateUrl('popover.html', {
      scope: $scope,
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
.controller('WeatherCtrl', function($scope,WeatherService,$ionicSlideBoxDelegate) {

  $scope.aaa= 'ion-ios-partlysunny-outline';
    $scope.iconSet = {'PC': 'ion-ios-partlysunny-outline',
      'WD': 'ion-ios-load-b',
      'CD': 'ion-ios-cloudy-outline',
      'HA': 'ion-ios-cloudy',
      'RA': 'ion-ios-rainy-outline',
      'SH': 'ion-ios-rainy-outline',
      'TS': 'ion-ios-bolt',
      'PS': 'ion-ios-thunderstorm-outline',
      'FD': 'ion-ios-sunny-outline',
      'FN': 'ion-ios-moon-outline'};

  $scope.weather = WeatherService;


  WeatherService.getNowcast().then(function(response){
    $scope.nowcast = response;

    var areaList=[];

    $scope.areaList = $scope.nowcast.channel.item.weatherForecast.area;

    for(var i=0; i < $scope.areaList.length; i++){
      areaList.push({
        area:$scope.areaList[i]._name,
        forecast:$scope.areaList[i]._forecast,
        zone:$scope.areaList[i]._zone
      });
    }
    $scope.areaname = areaList;

  });
  WeatherService.getHalfday().then(function(response){$scope.halfday = response;});
  WeatherService.getPsi().then(function(response){$scope.psi = response});
  WeatherService.getThreeday().then(function(response){$scope.threeday = response});
  WeatherService.getRain().then(function(response){$scope.rain = response});



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
})

.controller('PlanCtrl', function($scope, $state, sharedData){

  //if validation success, go to tab-view.html
  $scope.submitForm = function(isValid) {
    if (isValid) {
      $state.go('tab.view');
    }
  };

  $scope.input = sharedData.input;
  $scope.input.activity = "";
  $scope.input.location = "";
  $scope.input.time = "";

  //All the possible result from forecast
  var initialRating = [{
    abb: 'FD', Weather: 'Fair Day', Rating: 100
  }, {
    abb: 'FN', Weather: 'Fair Night', Rating: 100
  }, {
    abb: 'PC', Weather: 'Partly Cloudy', Rating: 90
  }, {
    abb: 'CD', Weather: 'Cloudy', Rating: 80
  }, {
    abb: 'HZ', Weather: 'Haze', Rating: 70
  }, {
    abb: 'WD', Weather: 'Rain', Rating: 30
  }, {
    abb: 'PS', Weather: 'Passing Shower', Rating: 40
  }, {
    abb: 'SH', Weather: 'Shower', Rating: 25
  }, {
    abb: 'TS', Weather: 'Thundery Storms', Rating: 10
  }];
  //Current only 3 activities is included. case sensitive
  var activity = [{
    work: 'Run', intensity: '3'
  }, {
    work: 'Fast walk', intensity: '2'
  },{
    work: 'Walk', intensity: '1'
  }];

  var rating = 0;
  var intensitylvl = 0;

  $scope.input.rating =  function(){
    //forecast and 3h psi is needed
    //if else will be used to retrieve 3h and 12h data
    var forecast = "HZ";
    var psi = "400";

    //Get the Rating from initialRating from the expected weather forecast
    angular.forEach(initialRating, function(value, key)
    {
      if (value.abb === forecast)
      {
        rating = value.Rating;
      }
    });

    //Only when the forecast is haze, the rating will be affected based on 3h psi
    //and activity intensity
    if(forecast === "HZ") {
      angular.forEach(activity, function (value, key) {
        if (value.work === $scope.input.activity) {
          intensitylvl = value.intensity;

          if (intensitylvl == 1) {
            rating = rating - ((psi - 100) /6);
          }else if(intensitylvl == 2){
            rating = rating - ((psi - 100) /4);
          }else if(intensitylvl == 3){
            rating = rating - ((psi - 100) /2);
          }
        }
      });
      // Do not want any decimal value
      rating = rating.toFixed(0);
      //There should be no negative answer for rating
      if(rating < 0 ){
        rating = 0;
      }
    }
    return rating;
  }
})

.controller('ViewCtrl', function ($scope, sharedData){
  $scope.input = sharedData.input;
});

