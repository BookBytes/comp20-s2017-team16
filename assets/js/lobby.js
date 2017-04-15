/* lobby.js 
This file will be in charge of the following three things:
- Getting username from index.html
- Randomly generating a theme
- Finding the three closest players (through geolocation) and showing
their usernames in the box

*/
var list = ['Harry Potter', 'Spongebob', 'Mystery','Fantasy', 'Romance', 'Horror', 'Comedy' ];

var myLat = 0;
var myLng = 0;
var me = new google.maps.LatLng(myLat, myLng);

// maybe have one big function calling everything else

function getUsername() 
{
		var request = new XMLHttpRequest();
		request.open("GET", "index.html", true);
		//sessionStorage.getItem('username'); 
		putUsername(document.getElementById("input"));
		// get the username at the input div in index.html (?)
}

function putUsername(username)
{
	document.getElementById("welcome").innerHTML += 'Welcome ' + username;
}

function randomize()
{
	var item = list[Math.floor(Math.random()*list.length)];
	document.getElementByID("theme").innerHTML += 'Your game is randomly chosen to be ' + item + '-themed.';
}

function getMyLocation()
{
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
			findCompetitors();
		});
	}
	else {
		alert("Geolocation is not supported by your web browser.");
	}
}

function findCompetitors()
{
	var request = new XMLHttpRequest();
	request.open("GET", "https://m3m3l0rd.herokuapp.com/", true);
	request.setReqestHeader("Content-type", "appplication/x-www-form-urlencoded");

	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			data = request.responseText;
			// do something?
		}
		else if (request.readyState == 4 && request.status != 200) {
			console.log("Request not in database.");
		}
		else {
			console.log("in progress...");
		}
	};
}

// window.onload
// when window loads, have code start running


