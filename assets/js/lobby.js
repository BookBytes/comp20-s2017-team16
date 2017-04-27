/* lobby.js 
This file will be in charge of the following three things:
- Getting username from index.html
- Randomly generating a theme
- Finding the three closest players (through geolocation) and showing
their usernames in the box

*/
var list = ['HARRY POTTER', 'SPONGEBOB', 'GOOSEBUMPS', 'STAR WARS', 'STAR TREK', 
	'HISTORICAL FICTION', 'BREAKING THE FOURTH WALL', 'DUNE SERIES', 'MEMELORD LORE',
	'NYAN CAT ORIGIN STORY', 'CHUCK NORRIS', 'CANDYLAND', 'GRIMS FAIRY TALES', 
	'INDIANA JONES', 'FAIRLY ODD PARENTS', 'JIMMY NEUTRON'];

var myLat = 0;
var myLng = 0;
var me = new google.maps.LatLng(myLat, myLng);

// when window loads, have code start running
window.onload = function start_page() {
	getUsername(); // makes username show up
	randomize(); // makes random category appear
	getMyLocation(); // finds nearby competitors
}

// http://stackoverflow.com/questions/2090551/parse-query-string-in-javascript
function getUsername() 
{
		var query = window.location.search.substring(1); // username passed in query
		var username = query.split('=');
		putUsername(username[1]);
}

function putUsername(username)
{
	document.getElementById("welcome").innerHTML += 'Welcome ' + username;
}

function randomize()
{
	var item = list[Math.floor(Math.random()*list.length)];
	document.getElementById("theme").innerHTML += 'Your game is randomly chosen to be ' + item + '-themed.';
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




