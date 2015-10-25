angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});


angular.module('starter.services')

.factory('WeatherService', function ($http) {
    var key ="781CF461BB6606ADE5BD65643F1781749D6C06D0F1B48FF5";
    var nowcast = [];
    var halfday = [];
    var threeday = [];
    var psi = [];
    var rain = [];
    return {
      
      getNowcast:function(){
        var nowcastapi="http://www.nea.gov.sg/api/WebAPI?dataset=nowcast&keyref=" + key;
          return $http.get(nowcastapi)
          .then(function(response){
            nowcast = response.data;
              return nowcast;
        })
      },

      getHalfday:function(){
        var halfdayapi="http://www.nea.gov.sg/api/WebAPI?dataset=12hrs_forecast&keyref=" + key;
          return $http.get(halfdayapi)
          .then(function(response){
            halfday = response.data;
              return halfday ;
        })
      },

      getThreeday:function(){
        var threedayapi="http://www.nea.gov.sg/api/WebAPI?dataset=3days_outlook&keyref=" + key;
          return $http.get(threedayapi)
          .then(function(response){
            threeday = response.data;
              return threeday ;
        })
      },

      getPsi:function(){
        var psiapi="http://www.nea.gov.sg/api/WebAPI?dataset=psi_update&keyref=" + key;
          return $http.get(psiapi)
          .then(function(response){
            psi = response.data;
              return psi ;
        })
      },      

      getRain:function(){
        var rainapi="http://www.nea.gov.sg/api/WebAPI?dataset=heavy_rain_warning&keyref=" + key;
          return $http.get(rainapi)
          .then(function(response){
            rain = response.data;
              return rain ;
        })
      } 

    }
  });


angular.module('Settings', function () {
  var Celsius = true;

  return {
    setDisplay: function (value) {
      Celsius = value;
    },
    getDisplay: function () {
      return Celsius;
    }
  }
})


;
