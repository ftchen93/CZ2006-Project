/**
 * Created by Zhou on 10/31/15.
 */
angular.module('starter.controllers')
.controller('SettingsCtrl', function($scope, $localStorage,$ionicPopover,Settings,WeatherService) {


  //setTimeout(function(){
  $scope.metricsCelsius = Settings.Celsius;
  WeatherService.getNowcast().then(function(resp){$scope.nowcast = resp;$scope.locName = resp.channel.item.weatherForecast.area[Settings.locationIndex]._name;});
  //}, 1000);

  //Local Storage
  $scope.saveData = function(value) {
    $localStorage.set('tmpUnit', value);
    Settings.Celsius = value;
    console.log(value);
    console.log($localStorage.get('tmpUnit',1));
  };

  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope
  }).then(function(popover) {

    $scope.popover = popover;
  });
  $scope.$on('popover.removed', function() {
    // Execute action
    console.log("exit");
  });

})

  .controller('PopOver', function($scope, $ionicPopover,WeatherService,Settings) {
    var myPopup;
    WeatherService.getNowcast().then(function(response){
      $scope.areas = response.channel.item.weatherForecast.area;
    });
    $scope.$on('popover.removed', function() {
      // Execute action
      console.log("exit");
    });
    $ionicPopover.fromTemplateUrl('popover.html', {
      scope: $scope
    }).then(function(popover) {
      $scope.popover = popover;
    });

    $scope.showPopover = function($event, index)
    {
      $scope.index = index;
      $scope.popover.show($event);
    };
    $scope.setLocation= function(aera,zone,name){
      console.log(aera + ' '+ zone);
      $scope.locName = name;
      Settings.setlocationIndex(aera);
      Settings.setpsizone(zone);
      $scope.popover.hide();
    };
  });

