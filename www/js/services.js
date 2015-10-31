angular.module('starter.services', [])

  .factory('WeatherService', function ($http) {
    var key ="781CF461BB6606ADE5BD65643F1781749D6C06D0F1B48FF5";

    var nowcast = [];
    var nowcastapi="http://www.nea.gov.sg/api/WebAPI?dataset=nowcast&keyref=" + key;
    var nowcastFallBack = '<channel><title>Singapore - Nowcast and Forecast</title><source>Meteorological Services Division, NEA</source><description>3 hour Forecast</description><item><title>Nowcast Table</title><category>Singapore Weather Conditions</category><issue_datentime>FROM 7:00 PM TO 10:00 PM --&lt;br&gt;&lt;font size=1&gt;Updated at 07:00 PM on 26-10-2015</issue_datentime><weatherForecast><area name="ANG MO KIO" forecast="Hazy                " icon="HA" zone="C" lat="1.37000000" lon="103.84940000"/><area name="BEDOK" forecast="Hazy                " icon="HA" zone="E" lat="1.32403830" lon="103.92003560"/><area name="BISHAN" forecast="Hazy                " icon="HA" zone="C" lat="1.35120000" lon="103.84850000"/><area name="BUKIT BATOK" forecast="Hazy                " icon="HA" zone="W" lat="1.34910000" lon="103.74970000"/><area name="BUKIT PANJANG" forecast="Hazy                " icon="HA" zone="C" lat="1.38080000" lon="103.76250000"/><area name="BUKIT TIMAH" forecast="Hazy                " icon="HA" zone="C" lat="1.33347400" lon="103.79685400"/><area name="CHANGI" forecast="Hazy                " icon="HA" zone="E" lat="1.35920000" lon="103.98940000"/><area name="CHOA CHU KANG" forecast="Hazy                " icon="HA" zone="W" lat="1.38510000" lon="103.74443000"/><area name="CITY" forecast="Hazy                " icon="HA" zone="S" lat="1.28780000" lon="103.85190000"/><area name="CLEMENTI" forecast="Hazy                " icon="HA" zone="W" lat="1.31435200" lon="103.76523590"/><area name="CHAI CHEE" forecast="Hazy                " icon="HA" zone="E" lat="1.32553700" lon="103.92238100"/><area name="HOLLAND VILLAGE" forecast="Hazy                " icon="HA" zone="S" lat="1.31098800" lon="103.79506400"/><area name="HOUGANG" forecast="Hazy                " icon="HA" zone="E" lat="1.37258100" lon="103.89365390"/><area name="JURONG INDUSTRIAL ESTATE" forecast="Hazy                " icon="HA" zone="W" lat="1.32500000" lon="103.69500000"/><area name="JURONG EAST/WEST" forecast="Hazy                " icon="HA" zone="W" lat="1.34450000" lon="103.70600000"/><area name="KALLANG" forecast="Hazy                " icon="HA" zone="E" lat="1.31155000" lon="103.87109800"/><area name="KATONG" forecast="Hazy                " icon="HA" zone="E" lat="1.30286810" lon="103.89713500"/><area name="KRANJI" forecast="Hazy                " icon="HA" zone="N" lat="1.42970500" lon="103.74046300"/><area name="LIM CHU KANG" forecast="Hazy                " icon="HA" zone="W" lat="1.40896530" lon="103.70118500"/><area name="MACPHERSON" forecast="Hazy                " icon="HA" zone="E" lat="1.32665000" lon="103.89001800"/><area name="MACRITCHIE RESERVOIR" forecast="Hazy                " icon="HA" zone="C" lat="1.34178700" lon="103.83411500"/><area name="MARINE PARADE" forecast="Hazy                " icon="HA" zone="E" lat="1.30228800" lon="103.90623700"/><area name="PANDAN" forecast="Hazy                " icon="HA" zone="W" lat="1.30824650" lon="103.75542919"/><area name="PASIR PANJANG" forecast="Hazy                " icon="HA" zone="S" lat="1.27620000" lon="103.79140000"/><area name="PASIR RIS" forecast="Hazy                " icon="HA" zone="E" lat="1.37000000" lon="103.94800000"/><area name="PUNGGOL" forecast="Hazy                " icon="HA" zone="N" lat="1.39933000" lon="103.90628800"/><area name="PEIRCE RESERVOIR" forecast="Hazy                " icon="HA" zone="C" lat="1.37341700" lon="103.81135900"/><area name="PULAU TEKONG" forecast="Hazy                " icon="HA" zone="E" lat="1.40810000" lon="104.05580000"/><area name="PULAU UBIN" forecast="Hazy                " icon="HA" zone="E" lat="1.40940000" lon="103.96000000"/><area name="JURONG ISLAND" forecast="Hazy                " icon="HA" zone="W" lat="1.26670000" lon="103.69580000"/><area name="QUEENSTOWN" forecast="Hazy                " icon="HA" zone="S" lat="1.29438800" lon="103.80586600"/><area name="SELETAR" forecast="Hazy                " icon="HA" zone="N" lat="1.41690000" lon="103.86780000"/><area name="SEMBAWANG" forecast="Hazy                " icon="HA" zone="N" lat="1.44918200" lon="103.82011400"/><area name="SENTOSA" forecast="Hazy                " icon="HA" zone="S" lat="1.24800000" lon="103.83000000"/><area name="SERANGOON" forecast="Hazy                " icon="HA" zone="C" lat="1.35344640" lon="103.87238300"/><area name="SIMEI" forecast="Hazy                " icon="HA" zone="E" lat="1.34340000" lon="103.95320000"/><area name="SOUTHERN ISLAND" forecast="Hazy                " icon="HA" zone="S" lat="1.22372400" lon="103.85410300"/><area name="TAMPINES" forecast="Hazy                " icon="HA" zone="E" lat="1.35308100" lon="103.94519100"/><area name="TOA PAYOH" forecast="Hazy                " icon="HA" zone="C" lat="1.33270200" lon="103.84780800"/><area name="TUAS" forecast="Hazy                " icon="HA" zone="W" lat="1.33645100" lon="103.64707000"/><area name="TELOK BLANGAH" forecast="Hazy                " icon="HA" zone="S" lat="1.27060000" lon="103.80970000"/><area name="UPPER BUKIT TIMAH" forecast="Hazy                " icon="HA" zone="C" lat="1.37084300" lon="103.76402400"/><area name="WEST COAST" forecast="Hazy                " icon="HA" zone="W" lat="1.29823900" lon="103.76310100"/><area name="WOODLANDS" forecast="Hazy                " icon="HA" zone="N" lat="1.43604600" lon="103.78605700"/><area name="YISHUN" forecast="Hazy                " icon="HA" zone="N" lat="1.42608380" lon="103.84047400"/></weatherForecast></item></channel>';

    var halfday = [];
    var halfdayapi="http://www.nea.gov.sg/api/WebAPI?dataset=12hrs_forecast&keyref=" + key;
    var halfdayFallBack = '<channel><title>Singapore - Nowcast and Forecast</title><source>Meteorological Services Division, NEA</source><item><title>12 Hour Forecast</title><forecastIssue date="26-10-2015" time="5:50 PM"/><forecastValidity date="27-10-2015" time="6AM"/><forecastValidityFrom date="26-10-2015" time="6PM"/><forecastValidityTill date="27-10-2015" time="6AM"/><wxmain>HZ</wxmain><wxeast>HZ</wxeast><wxwest>HZ</wxwest><wxnorth>HZ</wxnorth><wxsouth>HZ</wxsouth><wxcentral>HZ</wxcentral><forecast>Hazy.</forecast><temperature high=" 31" low="25 " unit="Degrees Celsius"/><relativeHumidity high=" 95" low="60 " unit="Percentage"/><highTide height="3.1" unit="m" time="10:20 pm"/></item></channel>';

    var threeday = [];
    var threedayapi="http://www.nea.gov.sg/api/WebAPI?dataset=3days_outlook&keyref=" + key;
    var threedayFallBack = '<channel><title>Singapore - Nowcast and Forecast</title><source>Meteorological Services Singapore</source><item><title>3 Day Forecast</title><description>Updated twice daily at 5 am and 6 pm (2100 UTC and 1000 UTC respectively)</description><issueDate>26-Oct-2015</issueDate><weatherForecast><day>Tuesday</day><forecast>Hazy. Thundery showers over many areas in the afternoon.</forecast><icon>TS</icon><temperature high="33" low="25" unit="Degrees Celsius"/><day>Wednesday</day><forecast>Late morning and early afternoon thundery showers.</forecast><icon>TS</icon><temperature high="32" low="25" unit="Degrees Celsius"/><day>Thursday</day><forecast>Late morning and early afternoon thundery showers.</forecast><icon>TS</icon><temperature high="33" low="25" unit="Degrees Celsius"/></weatherForecast></item></channel>';

    var psi = [];
    var psiapi="http://www.nea.gov.sg/api/WebAPI?dataset=psi_update&keyref=" + key;
    var psiFallBack = '<channel><title>PSI Update</title><source>Airviro</source><item><region><id>rNO</id><latitude>1.41803</latitude><longitude>103.82000</longitude><record timestamp="20151026200000"><reading type="NPSI" value="154"/><reading type="NPSI_PM25_3HR" value="172"/><reading type="NO2_1HR_MAX" value="66"/><reading type="PM10_24HR" value="139"/><reading type="PM25_24HR" value="107"/><reading type="SO2_24HR" value="6"/><reading type="CO_8HR_MAX" value="1.58"/><reading type="O3_8HR_MAX" value="118"/><reading type="NPSI_CO" value="16"/><reading type="NPSI_O3" value="50"/><reading type="NPSI_PM10" value="94"/><reading type="NPSI_PM25" value="154"/><reading type="NPSI_SO2" value="4"/></record></region><region><id>NRS</id><latitude>0</latitude><longitude>0</longitude><record timestamp="20151026200000"><reading type="NPSI" value="169"/><reading type="NPSI_PM25_3HR" value="170"/><reading type="NO2_1HR_MAX" value="66"/><reading type="PM10_24HR" value="170"/><reading type="PM25_24HR" value="120"/><reading type="SO2_24HR" value="20"/><reading type="CO_8HR_MAX" value="1.58"/><reading type="O3_8HR_MAX" value="118"/><reading type="NPSI_CO" value="16"/><reading type="NPSI_O3" value="50"/><reading type="NPSI_PM10" value="111"/><reading type="NPSI_PM25" value="169"/><reading type="NPSI_SO2" value="12"/></record></region><region><id>rCE</id><latitude>1.35735</latitude><longitude>103.82000</longitude><record timestamp="20151026200000"><reading type="NPSI" value="137"/><reading type="NPSI_PM25_3HR" value="155"/><reading type="NO2_1HR_MAX" value="52"/><reading type="PM10_24HR" value="118"/><reading type="PM25_24HR" value="90"/><reading type="SO2_24HR" value="12"/><reading type="CO_8HR_MAX" value="1.16"/><reading type="O3_8HR_MAX" value="108"/><reading type="NPSI_CO" value="12"/><reading type="NPSI_O3" value="46"/><reading type="NPSI_PM10" value="84"/><reading type="NPSI_PM25" value="137"/><reading type="NPSI_SO2" value="7"/></record></region><region><id>rEA</id><latitude>1.35735</latitude><longitude>103.94000</longitude><record timestamp="20151026200000"><reading type="NPSI" value="169"/><reading type="NPSI_PM25_3HR" value="170"/><reading type="NO2_1HR_MAX" value="50"/><reading type="PM10_24HR" value="137"/><reading type="PM25_24HR" value="120"/><reading type="SO2_24HR" value="9"/><reading type="CO_8HR_MAX" value="1.21"/><reading type="O3_8HR_MAX" value="90"/><reading type="NPSI_CO" value="12"/><reading type="NPSI_O3" value="38"/><reading type="NPSI_PM10" value="93"/><reading type="NPSI_PM25" value="169"/><reading type="NPSI_SO2" value="5"/></record></region><region><id>rWE</id><latitude>1.35735</latitude><longitude>103.70000</longitude><record timestamp="20151026200000"><reading type="NPSI" value="161"/><reading type="NPSI_PM25_3HR" value="168"/><reading type="NO2_1HR_MAX" value="16"/><reading type="PM10_24HR" value="134"/><reading type="PM25_24HR" value="113"/><reading type="SO2_24HR" value="20"/><reading type="CO_8HR_MAX" value="1.56"/><reading type="O3_8HR_MAX" value="84"/><reading type="NPSI_CO" value="16"/><reading type="NPSI_O3" value="36"/><reading type="NPSI_PM10" value="92"/><reading type="NPSI_PM25" value="161"/><reading type="NPSI_SO2" value="12"/></record></region><region><id>rSO</id><latitude>1.29587</latitude><longitude>103.82000</longitude><record timestamp="20151026200000"><reading type="NPSI" value="166"/><reading type="NPSI_PM25_3HR" value="183"/><reading type="NO2_1HR_MAX" value="36"/><reading type="PM10_24HR" value="170"/><reading type="PM25_24HR" value="118"/><reading type="SO2_24HR" value="13"/><reading type="CO_8HR_MAX" value="1.26"/><reading type="O3_8HR_MAX" value="101"/><reading type="NPSI_CO" value="13"/><reading type="NPSI_O3" value="43"/><reading type="NPSI_PM10" value="111"/><reading type="NPSI_PM25" value="166"/><reading type="NPSI_SO2" value="8"/></record></region></item></channel>';

    var rain = [];
    var rainapi="http://www.nea.gov.sg/api/WebAPI?dataset=heavy_rain_warning&keyref=" + key;
    var rainFallBack = '<channel><title>Heavy Rain Warning</title><source></source>Meteorological Service Singapore<item><title>HEAVY RAIN WARNING</title><issue_datentime>-</issue_datentime><warning>NIL</channel>';

    var x2js = new X2JS();

    var hd = $http.get(halfdayapi)
      .then(function(response){
        return x2js.xml_str2json(response.data);
      });
    obtainInfo = function (url,fallback,x2js){
      var result;
      $http.get(url)
        .then(function(response){
          result = x2js.xml_str2json(response.data);
        },function(response){
          console.log(url);
          result = x2js.xml_str2json(fallback);
        })
      //console.log(result);
      return result
    }

    nowcast = obtainInfo(nowcastapi,nowcastFallBack,x2js);
    return {
      nowcast : nowcast,
      halfday : obtainInfo(halfdayapi,halfdayFallBack,x2js),
      threeday :obtainInfo(threedayapi,threedayFallBack,x2js),
      psi :obtainInfo(psiapi,psiFallBack,x2js),

      all:function(){
        return hd;
      },

      get:function(response,item){
        return hd.then(function(response){
          for(var i=0; i < response.length; i++){
            if(response[i].id === item){
              return response[i];
            }
          }
        });
      },


      getNowcast:function(){
        //nowcastapi = "http://localhost:8100/?restart=573323#/tab/about";
        console.log("running");
        return $http({
          method : 'GET',
          url : nowcastapi
        }).then(function(response){
          console.log("received")
          nowcast = x2js.xml_str2json(response.data);
          console.log("run");
          console.log(response.status);
          return nowcast;
        },function(resp){
          console.log("failed");
          return(x2js.xml_str2json(nowcastFallBack));
        })
      },

      getHalfday:function(){
        return $http.get(halfdayapi)
          .then(function(response){
            return x2js.xml_str2json(response.data);
          },function(res){
            return x2js.xml_str2json(halfdayFallBack);
          })
      },

      getThreeday:function(){
        return $http.get(threedayapi)
          .then(function(response){
            return x2js.xml_str2json(response.data);
          },function(res){
            return x2js.xml_str2json(threedayFallBack);
          })
      },

      getPsi:function(){
        return $http.get(psiapi)
          .then(function(response){
            return x2js.xml_str2json(response.data);
          },function(res){
            return x2js.xml_str2json(psiFallBack);
          })
      },

      getRain:function(){
        return $http.get(rainapi)
          .then(function(response){
            return x2js.xml_str2json(response.data);
          },function(res){
            return x2js.xml_str2json(rainFallBack);
          })
      }
    }
  })

  .factory('Location',function(){
    var ShortLocation = 'North';
    var LongLocation = 'QUEENSTOWN';
    return{
      ShortLocation : ShortLocation,
      LongLocation : LongLocation
    }
  })

  .factory ( 'Settings',function ($localStorage) {
  var Celsius = $localStorage.get('tmpUnit',1);
  var locationIndex = $localStorage.get('locIndex',0);
  var psizoneList = {'N':0, 'C':2,"E" :3,"W":4, 'S':5},psizoneIndex= $localStorage.get('zoneIndex',2);

  return {
    Celsius :Celsius,
    locationIndex : locationIndex,
    getIndex : function (){return locationIndex},
    getpsizoneIndex : function() {return psizoneIndex},
    setpsizone : function (zoneChar){
      psizoneIndex = psizoneList[zoneChar];
      $localStorage.set('zoneIndex',psizoneList[zoneChar]);
    },
    setlocationIndex : function (index){
      locationIndex = index;
      $localStorage.set('locIndex',index);
      console.log(locationIndex);
    },
    convert : function (temp){
      return $localStorage.get('tmpUnit',1)==1 ? temp : (temp*1.8 + 32).toFixed(1);
    }
  }
})

  .factory('sharedData', function() {
    return {
      input: {
        activity: '',
        location: '',
        time : '',
        rating: ''
      }
    };
  });

angular.module("starter.services")
  .factory('ratingService', function() {
    //All the possible result from forecast
    var initialRating = [{
      abb: 'FD', Weather: 'Fair Day', Rating: 100
    }, {
      abb: 'FN', Weather: 'Fair Night', Rating: 100
    }, {
      abb: 'PC', Weather: 'Partly cloudy', Rating: 90
    }, {
      abb: 'CD', Weather: 'Cloudy', Rating: 80
    }, {
      abb: 'HZ', Weather: 'Haze', Rating: 70
    }, {
      abb: 'WD', Weather: 'Rain', Rating: 30
    }, {
      abb: 'PS', Weather: 'Passing Shower', Rating: 40
    }, {
      abb: 'SH', Weather: 'Showers', Rating: 25
    }, {
      abb: 'TS', Weather: 'Thundery Storms', Rating: 10
    }];

    return {
      getRating: function(forecast) {
        for(var j = 0; j<initialRating; j++){
          if(initialRating[j].Weather == forecast){
            return initialRating[j].Rating;
          }
        }
        return forecast;
      }
    };
  });

angular.module("starter.services")
  .factory('activityService', function() {

    //Current only 3 activities is included. case sensitive
    var activitylist = [{
      name: 'Run', intensity: 3
    },{
      name: 'Fast walk', intensity: 2
    },{
      name: 'Walk', intensity: 1
    }];

    return{
      getIntensitylvl: function(activity){
        for(var i=0; i<activitylist.length; i++){
          if(activitylist[i].name == activity){
            return activitylist[i].intensity;
          }
        }
        return 0;
      }
    }
  });

angular.module('starter.services')
  .factory('LocationIndex', function(WeatherCtrl){
    $scope.zoneCode = $scope.nowcast.channel.item.weatherForecast.zone;

    if($scope.zoneCode == "N")
      $scope.zoneIndex = 0;
    else if ($scope.zoneCode == "S")
      $scope.zoneIndex = 1;
    else if ($scope.zoneCode == "E")
      $scope.zoneIndex = 2;
    else if ($scope.zoneCode == "W")
      $scope.zoneIndex = 3;
    else if ($scope.zoneCode == "C")
      $scope.zoneIndex = 4;
  });
