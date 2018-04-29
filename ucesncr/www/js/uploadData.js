function startDataUpload() {
	alert ("start data upload");

	var pointname = document.getElementById("pointname").value;
	var question = document.getElementById("question").value;

	var answer1 = document.getElementById("answer1").value;
	var answer2 = document.getElementById("answer2").value;
	var answer3 = document.getElementById("answer3").value;
	var answer4 = document.getElementById("answer4").value;

	var lat = document.getElementById("lat").value;
	var long = document.getElementById("long").value;

	alert(pointname + " "+ question + " \n"+ answer1 + " " + answer2 + " " + answer3 + " " + answer4 + " \n" + lat + " " + long);

	var postString = "pointname="+pointname +"&question="+question +"&answer1="+answer1 +"&answer2="+answer2 +"&answer3="+answer3+ "&answer4="+answer4;

	// now get the radio button values
	if (document.getElementById("check1").checked) {
        postString=postString+"&correctanswer=1";
    }
    if (document.getElementById("check2").checked) {
    	postString=postString+"&correctanswer=2";
    }
	if (document.getElementById("check3").checked) {
		postString=postString+"&correctanswer=3";
	}
	if (document.getElementById("check4").checked) {
		postString=postString+"&correctanswer=4";
	}

	postString = postString + "&lat=" + lat + "&long=" + long;

	alert (postString);

	processData(postString);
}

var client;

function processData(postString) {
   client = new XMLHttpRequest();
   client.open('POST','http://developer.cege.ucl.ac.uk:30288/uploadData',true);
   client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   client.onreadystatechange = dataUploaded;  
   client.send(postString);
}

// create the code to wait for the response from the data server, and process the response once it is received
function dataUploaded() {
  // this function listens out for the server to say that the data is ready - i.e. has state 4
  if (client.readyState == 4) {
    // change the DIV to show the response
    document.getElementById("dataUploadResult").innerHTML = client.responseText;
    }
}
