var xhr = new XMLHttpRequest();
xhr.open("GET", "http://www.nea.gov.sg/api/WebAPI/?dataset=nowcast&keyref=781CF461BB6606ADE5BD65643F1781749D6C06D0F1B48FF5",true);



console.log(xhr.status);
console.log(xhr.statusText);

xhr.setRequestHeader('Content-Type', './../xml/nowcast.xml');
xhr.send();


xmlDocument = xhr.responseXML;
console.log(xmlDocument.childNodes['0'].textContent);
