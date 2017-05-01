/* finalScore.js
 * Author: Teddy Laurita
 * Date: 3/30/17
 * Javascript file used to generate the finalScore.html page
 * NOTE: utilizes jquery:
 * https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
 */

var errorThrown = false;
var $title = $("<h1>", {id: "title", text: "Round Scores!"});
var $scoreList = $("<div>", {id: "scoreList"});
var $chart = $("<img>", {
    id: "chart"
});

var $userScores = $.get('/userInfo', function(data) {
    $userScores = data;
    if (Object.keys($userScores).length != 4) {
        errorThrown = true;
    }
    buildHTML();
});

var buildHTML = function() {
    var userNames = [
        Object.keys($userScores)[0],
        Object.keys($userScores)[1],
        Object.keys($userScores)[2],
        Object.keys($userScores)[3]
    ];
    var roundNumber = 1;

    if (errorThrown) {
        $scoreList.append("Database Error Returned: " + $userScores);
    }
    else {
        $.each($userScores, function(key, value) {
            $scoreList.append("<p>User " + key + " scored " + value + "</p>");
        });
        // build chart url
        var userNamesURL = "";
        var userScoresURL = "";
        $.each($userScores, function(key, value) {
            userNamesURL += key + "|";
            userScoresURL += value + ",";
        });
        // remove last special char from string
        userNamesURL = userNamesURL.slice(0, -1);
        userScoresURL = userScoresURL.slice(0, -1);
        $chart.attr("src", "https://chart.googleapis.com/chart?cht=bvs&chd=t:" +
             userScoresURL + "&chs=150x100&chl=" + userNamesURL);
    }
}


$(document).ready(function() {
    $("body").append($title);
    $("body").append($scoreList);
    $("body").append($chart);
});
