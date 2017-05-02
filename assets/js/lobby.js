//  lobby.js 
//  Purpose: to get username from database and to
//		find the three closest players (through geolocation)
//

var username = "";

// when window loads, have code start running
function start_page() {
	getData();
	putUsername();
	findCompetitors(); // finds nearby competitors
}

function getData() 
{
		var query = window.location.search.substring(1);
		var vars = query.split('=');
		username = vars[1];
}

function putUsername()
{
	document.getElementById("welcome").innerHTML += 'Welcome ' + username;
}

function findCompetitors()
{
	$.get('/ready', function (data) {
		if (data == true) {
			$.get('/goto', function(response) {
				window.location.href = 'https://m3m3l0rd.herokuapp.com/round?players=' + response;
			});
		}
		
	});
}
