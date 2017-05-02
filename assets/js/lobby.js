//  lobby.js 
//  Purpose: to get username from database and to
//		find the three closest players (through geolocation)
//

var username = "";

// when window loads, have code start running
function start_page() {
	getData();
	putUsername();
	findCompetitors(); // constantly look for enough competitors
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

//http://stackoverflow.com/questions/8133947/how-to-wait-for-a-period-of-time-after-a-function-run
function findCompetitors()
{
	$.get('/ready', function (data) {
		console.log("in GET for ready");
		// would check if data == true but just go
		$.get('/goto', function(response) {
			console.log("REDIRECTING");
			setTimeout(function() {
				window.location.href = 'https://m3m3l0rd.herokuapp.com/round?players=' + response;
			}, 3000);
		});
	});
}
