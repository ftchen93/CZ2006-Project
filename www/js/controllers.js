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


  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});


  .controller('WeatherCtrl', function($scope,WeatherService,Settings) {

    $scope.convert= Settings.convert;
    $scope.index = Settings.getIndex;
    $scope.psiIndex = Settings.getpsizoneIndex;
    $scope.iconSet = {
      'PC': 'ion-ios-partlysunny-outline',
      'WD': 'ion-ios-load-b',
      'CD': 'ion-ios-cloudy-outline',
      'HA': 'ion-ios-cloudy',
      'RA': 'ion-ios-rainy-outline',
      'SH': 'ion-ios-rainy-outline',
      'TS': 'ion-ios-bolt',
      'PS': 'ion-ios-thunderstorm-outline',
      'FD': 'ion-ios-sunny-outline',
      'FN': 'ion-ios-moon-outline'};

    //Include WeatherService before using the following function
    //Service to get data from nowcast
    WeatherService.getNowcast().then(function(response){
      var nowcastData = [];
      $scope.nowcast = response.channel.item.weatherForecast.area; //filter out unwanted info in response
      $scope.l=nowcastData; //for testing purpose

      //store data from response into nowcastData
      for(var i=0; i < $scope.nowcast.length; i++){
        nowcastData.push({
          area:$scope.nowcast[i]._name,
          forecast:$scope.nowcast[i]._forecast,
          zone:$scope.nowcast[i]._zone
        });
      }

      var n ="KALLANG";   //data testing
//    var f = function(nowcastData,key,n){
      for(var i=0; i < nowcastData.length; i++){
        if(nowcastData[i].area === n){
          $scope.a = nowcastData[i].area;
          $scope.f = nowcastData[i].forecast;
          $scope.z = nowcastData[i].zone;
          $scope.i = i;   //variable to store index no.
        }
      }
      //   }
    }); //end of nowcast service

    WeatherService.getHalfday().then(function(response){

      var halfday  = response.channel.item;

      $scope.wxmain    = halfday.wxmain;
      $scope.wxeast    = halfday.wxeast;
      $scope.wxwest    = halfday.wxwest;
      $scope.wxnorth   = halfday.wxnorth;
      $scope.wxsouth   = halfday.wxsouth;
      $scope.wxcentral = halfday.wxcentral;

      $scope.halfdayForecast = halfday.forecast;
      $scope.tempHigh = Settings.convert(halfday.temperature._high);
      $scope.tempLow  = Settings.convert(halfday.temperature._low);

      $scope.humidityHigh = halfday.relativeHumidity._high;
      $scope.humidityLow  = halfday.relativeHumidity._low;
    });//end of 12hrs forecast service

    WeatherService.getThreeday().then(function(response){
      var threeday = response.channel.item.weatherForecast;

      $scope.threedayDay   = threeday.day;
      $scope.threedayIcon  = threeday.icon;

      $scope.threedayTemp = [];
      var threedayTemp    = threeday.temperature;
      for(var i=0; i < threedayTemp.length; i++){
        $scope.threedayTemp.push({
          tempHigh:Settings.convert(threedayTemp[i]._high),
          tempLow:Settings.convert(threedayTemp[i]._low)
        });
      }

      $scope.threedayForecast = [];
      var threedayForecast    = threeday.forecast;
      for(var i=0; i < threedayForecast.length; i++){
        $scope.threedayForecast.push({
          forecast:threedayForecast[i],
        });
      }
    });//end of 3 days forecast service


    WeatherService.getPsi().then(function(response){
      $scope.psi = response.channel.item.region;
    });//end of psi service

    WeatherService.getRain().then(function(response){$scope.rain = response});

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

    var forecast;

    WeatherService.getNowcast().then(function(response){

      var nowcastData = [];
      $scope.nowcast = response.channel.item.weatherForecast.area; //filter out unwanted info in response
      $scope.l=nowcastData; //for testing purpose

      //store data from response into nowcastData
      for(var i=0; i < $scope.nowcast.length; i++){
        nowcastData.push({
          area:$scope.nowcast[i]._name,
          forecast:$scope.nowcast[i]._forecast,
          zone:$scope.nowcast[i]._zone
        });
      }

      $scope.onchange=function(){
        switch($scope.input.location){
          case "North":$scope.location='N';break;
          case "South":$scope.location='S';break;
          case "East":$scope.location='E';break;
          case "West":$scope.location='W';break;
          case "Central":$scope.location='C';break;
          default:$scope.location='N';break;
        }

        for(var i=0; i < nowcastData.length; i++){
          if(nowcastData[i].zone == $scope.location){
            forecast = nowcastData[i].forecast;
            break;
          }
        }
        $scope.rating = ratingService.getRating(forecast);
      }
    }); //end of nowcast service
    $scope.input.rating =  function() {

      var psi = "250";
      var intensitylvl = activityService.getIntensitylvl($scope.input.activity);

      //Only when the forecast is haze, the rating will be affected based on 3h psi
      //and activity intensity

      //forecast = $scope.aa (need to change back to this)
      if ($scope.forecast === "Haze") {
        if (intensitylvl == 1) {
          rating = rating - ((psi - 100) / 6);
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


