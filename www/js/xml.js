//declare variables

var fs = require("fs");
var http = require('http');

//variable to store url for nowcast
var nowcast_url =
"http://www.nea.gov.sg/api/WebAPI/"+
"?dataset=nowcast&keyref="+
"781CF461BB6606ADE5BD65643F1781749D6C06D0F1B48FF5";


//crate an empty file to store data
var createXML = fs.createWriteStream('./xml/nowcast.xml');
createXML.end();

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET",nowcast_url,true);
xmlhttp.send();
xmlhttp.onreadystatechange = function(){
//readyState 4:request finish and response is ready
//readyState 200:"OK"
if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
	var file = fs.createWriteStream("./xml/nowcast.xml");
	var request = http.get(url, function(response) {
		response.pipe(file);
		});
	}
};