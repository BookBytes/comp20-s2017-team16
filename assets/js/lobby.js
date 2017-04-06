/* lobby.js 
This file will be in charge of the following three things:
- Getting username from index.html
- Randomly generating a theme
- Finding the three closest players (through geolocation) and showing
their usernames in the box

*/
var list = ['Harry Potter', 'Mystery','Fantasy', 'Romance', 'Horror', 'Comedy' ];

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
	document.getElementByID("theme").innerHTML += 'Your game is randomly chosen to be ' + item + 'themed.';
}