//  lobby.js 
//  Purpose: to get username from database, to randomly generate a theme, and to
//		find the three closest players (through geolocation)
//

var list = ['4th Wall Break', 'Dumb Guitar Solo', 'Office-Theme Rick Roll', 
	'Short-Lined', 'The New Food', 'The Patient Cat', 'Borrowing A Match'];

var myLat = 0;
var myLng = 0;
var username = "";
var me; 

// when window loads, have code start running
function start_page() {
	getData(); // makes username show up
	console.log("username is "+ username +" lat is "+myLat+" lng is " + myLng);
	putUsername();
	randomize(); // makes random category appear
	findCompetitors(); // finds nearby competitors
}

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
	document.getElementById("theme").innerHTML += 'We randomly chose a story for your game! It is called: ' + item ;
	$.post('/round', {"story" : item}); // send story to round
}

function findCompetitors()
{
	$.get('/ready', function (data) {
		if (data == true) {
			$.get('/goto', function(response) {
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




