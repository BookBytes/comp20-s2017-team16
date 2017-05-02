// index.js
// Purpose: in charge of getting username from textbox, getting user's current
//          and adding this new user to the server. When submit is clicked,
//			go to lobby page

var myLat = 0;
var myLng = 0;
var curr_user = "";

function render_user_info() {
	getMyLocation();
	console.log("my location is lat/lng " + myLat + " " + myLng);
	getUsername();
	console.log("username is: " + curr_user);

	$.post("/geolocation", {"username" : curr_user, "lat" : myLat, "lng" : myLng});
	window.location.href = "/lobby";
	return false;
	// go to next page
	//window.location.href = "https://www.m3m3l0rd.herokuapp.com/lobby?username=" + curr_user;
}

function getMyLocation()
{
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
		});
	}
	else {
		alert("Geolocation is not supported by your web browser.");
	}
}

function getUsername()
{
	curr_user = document.getElementById("usernameBox").value;
}
