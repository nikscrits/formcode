var client;
var mymap = L.map('mapid').setView([51.505, -0.09], 13);

var testMarkerDRed = L.AwesomeMarkers.icon({ 
	icon: 'play',
	markerColor: 'darkred'
	});
	
var testMarkerRed = L.AwesomeMarkers.icon({ 
	icon: 'play',
	markerColor: 'red'
	});
	
var testMarkerGreen = L.AwesomeMarkers.icon({
	icon: 'play',
	markerColor: 'darkgreen'
	}); 
 
var testMarkerOrange = L.AwesomeMarkers.icon({
	icon: 'play',
	markerColor: 'orange'
	}); 
	
function loadMap() {	// load the tiles
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',{
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' + 
	'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +
'Imagery © <a href="http://mapbox.com">Mapbox</a>',
id: 'mapbox.streets'
}).addTo(mymap);
}

function getPOIs() {
	client = new XMLHttpRequest();
	client.open('GET','http://developer.cege.ucl.ac.uk:32088/getGeoJSON/united_kingdom_highway/geom');
	client.onreadystatechange = POIresponse; // note don't use earthquakeResponse() with brackets as that doesn't work
	client.send();
}


function POIresponse() {
	// this function listens out for the server to say that the data is ready - i.e. has state 4
	if (client.readyState == 4) {
		// once the data is ready, process the data
		var POIdata = client.responseText;
		loadPOIlayer(POIdata);
	}
}

function loadPOIlayer(POIdata) {
	
	// convert the text to JSON
	var POIjson = JSON.parse(POIdata);
	
	//load the geoJSON layer using custom icons
	var POIlayer = L.geoJson(POIjson,
	{
		//use point to layer to create the points
		pointToLayer:function(feature,latlng)
		{
			//look at the GeoJSON file - specifically at the properties - to see the
			//earthquake magnitude and use a different marker depending on this value
			//also include a pop-up that shows the place value of the earthquake
			
			return L.marker(latlng, {icon:testMarkerDRed}).bindPopup("POI");;
		},
	}).addTo(mymap);
	
	mymap.fitBounds(POIlayer.getBounds());
}


mymap.on('click', function(e) {
	document.getElementById("lat").value = e.latlng.lat;
	document.getElementById("long").value = e.latlng.lng;
});


function resetForm() {
	document.getElementById("pointname").value = "";
	document.getElementById("question").value = "";
	document.getElementById("answer1").value = "";
	document.getElementById("answer2").value = "";
	document.getElementById("answer3").value = "";
	document.getElementById("answer4").value = "";
	document.getElementById("lat").value = "";
	document.getElementById("long").value = "";
}




	// create a variable that will hold the XMLHttpRequest() - this must be done outside a function so that all the functions can use the same variable 
	
	var client2;
	
	// and a variable that will hold the layer itself – we need to do this outside the function so that we can use it to remove the layer later on
	
	var questionsLayer;

	// create the code to get the Earthquakes data using an XMLHttpRequest
	function getQuestions() {
	client2 = new XMLHttpRequest();
	client2.open('GET','http://developer.cege.ucl.ac.uk:30288/getquestions');
	client2.onreadystatechange = questionResponse; // note don't use earthquakeResponse() with brackets as that doesn't work
	client2.send();
}

	// create custom red marker
	var testMarkerRed = L.AwesomeMarkers.icon({
	icon: 'play',
	markerColor: 'red'
});

	// create the code to wait for the response from the data server, and process the response once it is received
	
	function questionResponse() {
	
	// this function listens out for the server to say that the data is ready - i.e. has state 4
	
	if (client2.readyState == 4) {
	// once the data is ready, process the data
	
	var questionData = client2.responseText;
	loadQuestionLayer(questionData);
}
}

	// convert the received data - which is text - to JSON format and add it to the map
	function loadQuestionLayer(questionData) {
	
	// convert the text to JSON
	var questionJSON = JSON.parse(questionData);
	
	// load the geoJSON layer
	var questionsLayer = L.geoJson(questionJSON,
{
	// use point to layer to create the points
	pointToLayer: function (feature, latlng)
{
	// look at the GeoJSON file - specifically at the properties - to see the earthquake magnitude and use a different marker depending on this value
	// also include a pop-up that shows the place value of the earthquakes

	return L.marker(latlng, {icon:testMarkerDRed}).bindPopup("<b>"+feature.properties.point_name +"</b>");

},
}).addTo(mymap);
	
	// change the map zoom so that all the data is shown
	mymap.fitBounds(questionsLayer.getBounds());
}




