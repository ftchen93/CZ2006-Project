// Ionic Starter App



var http = require('http');
var fs = require("fs");

var parseString = require('xml2js').parseString;

//nowcast url
var url ="http://www.nea.gov.sg/api/WebAPI/"+
"?dataset=nowcast&keyref=781CF461BB6606ADE5BD65643F1781749D6C06D0F1B48FF5";

//crate empty file to store data
var createXML = fs.createWriteStream('nowcast.xml');
createXML.end();

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET",url,true);
xmlhttp.send();
xmlhttp.onreadystatechange = function(){
  //readyState 4:request finish and response is ready
  //readyState 200:"OK"
  if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
    //var doc = xmlhttp.responseXML;
    var file = fs.createWriteStream("nowcast.xml");
    var request = http.get(url, function(response) {
      response.pipe(file);
    
    });

   

  }
};

var fs=require('fs');
var fileContents;
fs.readFile('./nowcast.xml',function(err,data){
  if (err) throw err;
    fileContents = data;
    console.log(fileContents);
    return fileContents;
    });







fs.readdir( ".", function( err, files ){
  
  if ( err) {
        console.log(err);
        } else {
              var totalBytes = 0;

               // This function repeatedly calls itself until the files are all read.
               var readFiles = function(index) {
                if ( index == files.length ) {
                      // we are done.
                      console.log( "Done reading files. totalBytes = " + 
                          totalBytes );

                  } else {
                      fs.readFile(files[index],function(err,data){
                        if(err) console.log(err)
                          else{
                            if(files.indexOf('nowcast.xml') > -1){
                              xml2Json();
                            }
                            totalBytes += data.length;
                            readFiles(index + 1);
                          }
                      });
          
                    }
                };
                  readFiles(0);
              } 
});


var xml2Json = function(){
fs.readFile('nowcast.xml',"utf8",function (err,data) {
  console.log(data);
                if(err) {
                  console.log(err);
                    }else{
                  //console.log(data); //printout the output
                  //store the data in xmltext
                  var xmltext = data;
                  //parse the string
                  parseString(data, function (err, result) {
                  //save the xml to local in .json format
                  fs.writeFile("nowcast.json",JSON.stringify(result),"utf8");
                  //console.dir(JSON.stringify(result));
                  //console.log(util.inspect(result, false, null));
                });
                  }
              });

}



/*

//parse the xml into json
parseString("../../nowcast.xml", function (err, result) {
  //write the xml into .json format
  fs.writeFile("nowcast.json",JSON.stringify(result),"utf8");
  //console.dir(JSON.stringify(result));
  //console.log(util.inspect(result, false, null));
});

*/
/*
xmlToJson(url, function(err, data) 
{
  if (err) {
    // Handle this however you like
    return console.err(err);
  }
  // Do whatever you want with the data here
  // Following just pretty-prints the object
  console.log(JSON.stringify(data, null, 2));

});



xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = JSON.parse(xmlhttp.responseText);
        myFunction(myArr);
    }
}
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(arr) {
    var out = "";
    var i;
    for(i = 0; i < arr.length; i++) {
        out += '<a href="' + arr[i].url + '">' + 
        arr[i].display + '</a><br>';
    }
    document.getElementById("id01").innerHTML = out;
}

*/
/*
function xmlToJson(url,callback){
  var req = http.get(url,function(res){
    var xml = '';

    res.on('data',function(chunk){
      xml+=chunk;
    });

    res.on('error', function(e) {
      callback(e, null);
    }); 

    res.on('timeout', function(e) {
      callback(e, null);
    }); 

    res.on('end', function() {
      parseString(xml, function(err, result) {
        callback(null, result);
      });
    });
  });
}
*/

