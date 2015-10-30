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

  .controller('SettingsCtrl', function($scope, $localStorage, WeatherService) {
    $scope.temperature = 30;
    $scope.tempUnit = false;

    //Celsius - Fahrenheit toggle
    $scope.toggleChange = function() {
      if ($scope.metrics.celsius == true) {
        $scope.temperature = $scope.temperature * 1.8 + 32;
        $scope.tempUnit = true;
      }
      else {
        $scope.temperature = 30;
        $scope.tempUnit = false;
      }
    }

    //Local Storage
    $scope.saveData = function(v) {
      //$localStorage.message = $scope.tempUnit;
      window.localStorage.setItem("data", v);
    }

    $scope.loadData = function() {
      //$scope.message = $localStorage.message;
      $scope.tempUnit = window.localStorage.getItem("data");
      //alert($scope.tempUnit);
      if ($scope.tempUnit === true){
        $scope.metrics = {celsius: true};
        alert($scope.tempUnit);
      }
      else {
        $scope.metrics = {celsius: false};
        alert($scope.tempUnit);
      }
    }





//$scope.settings = {
    //  notifications:false
    // };
    $scope.locations = function() {
      for (var i = 0; i<45; i++) {
        $scope.areaname;
      }}
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

  .controller('PlanCtrl', function($scope, $state, sharedData, ratingService, activityService, WeatherService){

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

    $scope.input.rating =  function() {

      var location = [{
        location: 'West', region: 4 , areaNumber: 7
      }, {
        location: 'East', region: 3 , areaNumber: 1
      },{
        location: 'North', region: 0 , areaNumber: 9
      },{
        location: 'South', region: 5 , areaNumber: 17
      },{
        location: 'Central', region: 2 ,areaNumber: 0
      }];

      var forecast = "HZ";
      var psi = "250";

      var rating = ratingService.getRating(forecast);
      var intensitylvl = activityService.getIntensitylvl($scope.input.activity);

      //Only when the forecast is haze, the rating will be affected based on 3h psi
      //and activity intensity
      if (forecast == "HZ") {
        if (intensitylvl == 1) {
          rating = rating - ((psi - 100) / 5);
        } else if (intensitylvl == 2) {
          rating = rating - ((psi - 100) / 4);
        } else if (intensitylvl == 3) {
          rating = rating - ((psi - 100) / 2);
        }
      }

      // Do not want any decimal value
      rating = rating.toFixed(0);

      //There should be no negative answer for rating
      if (rating < 0) {
        rating = 0;
      }
      return rating;
    }

  })

  .controller('ViewCtrl', function ($scope, sharedData){
    $scope.input = sharedData.input;
  });


