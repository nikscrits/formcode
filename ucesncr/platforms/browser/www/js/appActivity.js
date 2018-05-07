//A variable for the leaflet map
var mymap = L.map('mapid').setView([51.505, -0.09], 13);

//Will represent all the question points when they are loaded
var markerOrange = L.AwesomeMarkers.icon({
	icon: 'play',
	markerColor: 'orange'
});

//Loads the leaflet map tiles
function loadMap() {
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',{
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' + 
	'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +
	'Imagery © <a href="http://mapbox.com">Mapbox</a>',
	id: 'mapbox.streets'
}).addTo(mymap);
}

//Gets the longitude and latitude of the location where the user clicks on the map
mymap.on('click', function(e) {
	//Populates the text boxes for the question's location
	document.getElementById("lat").value = e.latlng.lat;
	document.getElementById("long").value = e.latlng.lng;
});

//Makes each of the text areas blank so the question information can be entered from scratch
function resetForm() {
	document.getElementById("pointname").value = "";
	document.getElementById("question").value = "";
	document.getElementById("answer1").value = "";
	document.getElementById("answer2").value = "";
	document.getElementById("answer3").value = "";
	document.getElementById("answer4").value = "";
	document.getElementById("lat").value = "";
	document.getElementById("long").value = "";

	document.getElementById("namecharcount").innerHTML = "0";
	document.getElementById("questcharcount").innerHTML = "0";
	document.getElementById("answer1charcount").innerHTML = "0";
	document.getElementById("answer2charcount").innerHTML = "0";
	document.getElementById("answer3charcount").innerHTML = "0";
	document.getElementById("answer4charcount").innerHTML = "0";
}
	
//Create a variable that will hold the XMLHttpRequest()
var client;
//Create a variable that will hold the layer itself
var questionsLayer;

//A function that will get the questions data using an XMLHttpRequest
function getQuestions() {
	client = new XMLHttpRequest();
	client.open('GET','http://developer.cege.ucl.ac.uk:30288/getquestions');
	client.onreadystatechange = questionResponse; // note don't use earthquakeResponse() with brackets as that doesn't work
	client.send();
}

//A function to wait for the response from the data server, and process the response once it is received
function questionResponse() {
	
	//This listens out for the server to say that the data is ready - i.e. has state 4
	if (client.readyState == 4) {
		// once the data is ready, process the data
		var questionData = client.responseText;
		loadQuestionLayer(questionData);
	}
}

//Convert the received data - which is text - to JSON format and add it to the map
function loadQuestionLayer(questionData) {
	
	//Convert the text to JSON
	var questionJSON = JSON.parse(questionData);
	
	//Load the geoJSON layer
	var questionsLayer = L.geoJson(questionJSON,
{
	//Use point to layer to create the points
	pointToLayer: function (feature, latlng)
{

	//Create a marker for each of the questions and set it to orange
	//Add a pop-up stating the marker name and question
	return L.marker(latlng, {icon:markerOrange}).bindPopup("<b>"+feature.properties.point_name +"</b>" + "<p>" + feature.properties.question + "</b>");

},
}).addTo(mymap);
	
	//Change the map zoom so that all the data is shown
	mymap.fitBounds(questionsLayer.getBounds());
}

//Counts the characters that have been entered into the text box
//This aims to prevent the user from entering a value too long for the database
function countChars(countTextBox, printTextBox) {
  var charLen = document.getElementById(countTextBox).value.length;
  document.getElementById(printTextBox).innerHTML = charLen;
}

