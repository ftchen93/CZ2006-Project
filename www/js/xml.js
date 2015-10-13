//declare variables
var http=require('http');
var fs=require("fs");

var api_url ="http://www.nea.gov.sg/api/WebAPI?dataset=";
var api_key ="\&keyref=781CF461BB6606ADE5BD65643F1781749D6C06D0F1B48FF5";
//variable to store url
var nowcast_url    = "http://www.nea.gov.sg/api/WebAPI?dataset=nowcast\&keyref=781CF461BB6606ADE5BD65643F1781749D6C06D0F1B48FF5";
var forecast_12hrs = api_url+"12hrs_forecast"+ api_key;
var forecast_3days = api_url+"3days_outlook"+ api_key;
var heavy_rain     = api_url+"heavy_rain_warning"+ api_key;
var uvi            = api_url+"uvi"+ api_key;
var earthquake     = api_url+"earthquake"+ api_key;
var psi            = api_url+"psi_update"+ api_key;
var pm_2_5         = api_url+"pm2.5_update"+ api_key;

console.log(nowcast_url);

//crate an empty file to store data
var createXML = fs.createWriteStream('./../xml/nowcast.xml');
createXML.end();
//fs.createWriteStream('./../xml/12hrs.xml');

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET",nowcast_url,true);


xmlhttp.onreadystatechange = function(){
//readyState 4:request finish and response is ready
//readyState 200:"OK"
if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
var file = fs.createWriteStream("./../xml/nowcast.xml");
var request = http.get(nowcast_url, function(response) {
response.pipe(file);
});
}
};

xmlhttp.send(null);

