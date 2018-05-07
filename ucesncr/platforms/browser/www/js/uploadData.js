//This function checks that the fields have not been left empty
function validateData() {
        var a=document.getElementById("pointname").value;
        var b=document.getElementById("question").value;
        var c=document.getElementById("answer1").value;
        var d=document.getElementById("answer2").value;
        var e=document.getElementById("answer3").value;
        var f=document.getElementById("answer4").value;    

        if (a==null || a=="" || b==""|| c=="" || d=="" || e=="" || f == "")
        {
            alert("Please fill in all fields.");
            return false;
        }
        else
        {
        	startDataUpload();
        }
}

//This function gets the values from the question form text boxes and creates a string to be sent to the database
function startDataUpload() {

  //Gets the values from the textboxes
	var pointname = document.getElementById("pointname").value;
	var question = document.getElementById("question").value;
	var answer1 = document.getElementById("answer1").value;
	var answer2 = document.getElementById("answer2").value;
	var answer3 = document.getElementById("answer3").value;
	var answer4 = document.getElementById("answer4").value;
	var lat = document.getElementById("lat").value;
	var long = document.getElementById("long").value;

  //Shows an alert telling the user what data is being sent to the database
	alert("Submitting: " + pointname + "\n"+ question + " \n"+ answer1 + " " + answer2 + " " + answer3 + " " + answer4 + " \n" + lat + " " + long);

  //Creates a string containing the question data
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

  //Calls the processData() function passing in the string of question data
	processData(postString);
}

//Create a variable that will hold the XMLHttpRequest()
var client;

//A function that will send the data to the database using an XMLHttpRequest
function processData(postString) {
   client = new XMLHttpRequest();
   client.open('POST','http://developer.cege.ucl.ac.uk:30288/uploadData',true);
   client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   client.onreadystatechange = dataUploaded;  
   client.send(postString);
}

//A function to wait for the response from the data server, and process the response once it is received
function dataUploaded() {
  //Listens out for the server to say that the data is ready - i.e. has state 4
  if (client.readyState == 4) {
    //Show an alert with the response text
    alert(client.responseText);
    }
}
