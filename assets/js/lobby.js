/* lobby.js 
This file will be in charge of the following three things:
- Getting username from index.html
- Randomly generating a theme
- Finding the three closest players (through geolocation) 

*/
var list = ['4th Wall Break', 'Dumb Guitar Solo', 'Office-Theme Rick Roll', 'Short-Lined'];
/*['HARRY POTTER', 'SPONGEBOB', 'GOOSEBUMPS', 'STAR WARS', 'STAR TREK', 
	'HISTORICAL FICTION', 'BREAKING THE FOURTH WALL', 'DUNE SERIES', 'MEMELORD LORE',
	'NYAN CAT ORIGIN STORY', 'CHUCK NORRIS', 'CANDYLAND', 'GRIMS FAIRY TALES', 
	'INDIANA JONES', 'FAIRLY ODD PARENTS', 'JIMMY NEUTRON'];*/

var myLat = 0;
var myLng = 0;
var username = "";
var me; 

// when window loads, have code start running
function start_page() {
	getData(); // makes username show up
	console.log("user: " + username);
	putUsername();
	randomize(); // makes random category appear
	findCompetitors(); // finds nearby competitors
}

// http://stackoverflow.com/questions/2090551/parse-query-string-in-javascript
function getData() 
{
		$.get("https://m3m3l0rd.herokuapp.com/geolocation", function (data) {
			myLat = parseFloat(data.lat);
			myLng = parseFloat(data.lng);
			me = new google.maps.LatLng(myLat, myLng);
			username = data.username;
		});
}

function putUsername()
{
	document.getElementById("welcome").innerHTML += 'Welcome ' + username;
}

function randomize()
{
	var item = list[Math.floor(Math.random()*list.length)];
	document.getElementById("theme").innerHTML += 'Your game is randomly chosen to be ' + item + '-themed.';
}

function findCompetitors()
{
	$.get("https://m3m3l0rd.herokuapp.com/ready", function (data) {
		if (data == true) {
			$.get("https://m3m3l0rd.herokuapp.com/goto", function(response) {
				window.location.href = 'https://m3m3l0rd.herokuapp.com/round?players=' + response;
			});
		}
	})
}

function getDistance(lat, lng) {
	var neighbor = new google.maps.LatLng(lat, lng);
	var distance = (google.maps.geometry.spherical.computeDistanceBetween(neighbor, me));
	distance = Math.round((distance/1609.3)*1000)/1000;
}




