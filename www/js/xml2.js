//second version to debug 

var xmlHttp = createXmlHttpRequestObject();

function createXmlHttpRequestObject(){
	var xmlHttp;

	if(window.ActiveXObject){
	//true if running IE
		try{
			var xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}catch(e){
			xmlHttp = false;
		}
	}else{
		//firefox or chrome
		try{
			xmlHttp =require("xmlhttprequest").XMLHttpRequest();
		}catch(e){
			xmlHttp = false;
			console.log(e);
		}
	}
}

//check if success
if(!xmlHttp){
	alert("Can't create the object!")
}else{
	//return xmlHttp;
}


//communicte will the server
function process(){
	//xmlHttp < Object communicate with server
	if(xmlHttp.readyState==4 || xmlHttp.readyState==0){
		var nowcast_url    = "http://www.nea.gov.sg/api/WebAPI?dataset=nowcast&keyref=781CF461BB6606ADE5BD65643F1781749D6C06D0F1B48FF5";
		xmlHttp.open("GET",nowcast_url,true);
		xmlHttp.onreadystatechange = handleServerResponse;
		//using get so parameter is null
		xmlHttp.send(null);
	}else{
		setTimeout('process()',1000);
	}
}