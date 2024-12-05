function loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        myFunction(this);
      }
    };
    xmlhttp.open("GET", "Vehicles.xml", true);
    xmlhttp.send();
  }
  function myFunction(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    var table="<tr><th>Make</th><th>Model</th></tr>";
    var x = xmlDoc.getElementsByTagName("CD");
    for (i = 0; i <x.length; i++) { 
      table += "<tr><td>" +
      x[i].getElementsByTagName("MAKE")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("MODEL")[0].childNodes[0].nodeValue +
      "</td></tr>";
    }
    document.getElementById("Vehicles").innerHTML = table;
  }