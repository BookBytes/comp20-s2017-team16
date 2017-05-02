// index.js
// Purpose: in charge of getting username from textbox, getting user's current
//          and adding this new user to the server. When submit is clicked,
//			go to lobby page

var myLat = 0;
var myLng = 0;
var curr_user = "";
var story = "";
var list = ['4thWallBreak', 'DumbGuitarSolo', 'Officeish', 'Short-Lined', 'CheesyPickupLines'];

function randomizeStory()
{
	story = list[Math.floor(Math.random()*list.length)]; // randomize story here
}

function getUsername()
{
	curr_user = document.getElementById("usernameBox").value;
}

function render_user_info() {
	getUsername();
	randomizeStory();

	var toInsert = {
        "username": curr_user,
        "roundNum" : 1, // tells which paragraph
        "sentenceNum" : 1,
        "wpm" : 0,
        "storyName" : story,
        "gameID" : 1
    }

	$.post('/game_Table', toInsert);
	//$.post("/geolocation", {"username" : curr_user, "lat" : myLat, "lng" : myLng});
	window.location.href = "/lobby?username=" + curr_user;
	return false;
}



/*function getMyLocation()
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
}*/


