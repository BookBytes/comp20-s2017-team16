/* finalScore.js
 * Author: Teddy Laurita
 * Date: 3/30/17
 * Javascript file used to generate the finalScore.html page
 * NOTE: utilizes jquery:
 * https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
 */

var $title = $("<h1>", {id: "title", text: "Congratulations!"});

// TODO: get real values
var userScores = {"user1": 1, "user2": 2, "user3": 3};
var $scoreList = $("<div>", {id: "scoreList"});
$.each(userScores, function(key, value) {
    $scoreList.append("<p>User " + key + " scored " + value + "</p>");
});

$(document).ready(function() {
    $("body").append($title);
    $("body").append($scoreList);
});
