/* JS logic for running the game in real time */
/* outer loop that ensures game is not complete and has not run over time of 10 minutes */
/* uses listeners to update user typed data for all 4 users and presents it on screen */
/* updates sentence in the middle on user #'s screen when that user has entered the last line correctly */

var curr_paragraph = "Once there was a little boy named Jack. He was sent to the market to sell a cow for money for food. However he chose to sell the cow for a magical seed that grew a beanstalk to a giant's castle! What did Jack do next? He climbed the beanstack of course!" // for test purposes only
var roundNum;
var story;
var currentLine = 1;
var totalRounds;
var maxLine;
var timer;

function init()
{
    parse_story(); // splits paragraph into lines
    timer = Date.now();
}

function parse_story()
{
    // http://www.jquerywithexample.com/2015/11/split-string-with-multiple-separator-in.html
    story = curr_paragraph.split('. '); /* ('.'); /.|?|!/); */

    totalRounds = story.length;
    // console.log(story);  // REMOVE THIS LATER
    line = document.getElementById("center");
    roundNum = 0;
    line.innerHTML += story[currentLine - 1];
    maxLine = story.length;
}

function find_wpm(user_time)
{
    var word_count = story.split(" ");
    word_count.length / user_time;
}

function check_input()
{
    newTimer = Date.now();
    line = document.getElementById("center");

    // see http://stackoverflow.com/questions/9224773/js-check-if-date-is-less-than-1-hour-ago
    // problem: what if the user doesn't finish? Then their WPM is different... Maybe remove this case entirely.
    if ((newTimer - timer) > (1000 * 60 * 10)) {
        line = document.getElementById("center");
	line.innerHTML = "Out of time.";
	wpm = find_wpm((newTimer - timer) * 1000 * 60);
	// send info to mongodb
        $.get("https://m3m3l0rd.herokuapp.com/score", function () { });
    }
    
    if (currentLine > maxLine) {
        roundNum++;
        // maxLine = story[roundNum].length;
        line.innerHTML = "You finished this round!";
	$.get("https://m3m3l0rd.herokuapp.com/score", function () { });
	// send request to server
        // currentLine = 0;
	return;
    }	
	
    input = document.getElementById("bottom_input").value;

    if (input === story[currentLine - 1]) {
        currentLine++;
        line.innerHTML = story[currentLine - 1];
        input = '';
    }
}

function update_textboxes()
{
    // check in with mongodb server, get their line number, update it; temp data for now
    topPlayer = document.getElementById("hbox_top").value;
    topPlayer.innerHTML = story[roundNum][currentLine];
    leftPlayer = document.getElementById("vbox_left").value;
    leftPlayer.innerHTML = story[roundNum][currentLine];
    rightPlayer = document.getElementById("vbox_right").value;
    rightPlayer.innerHTML = story[roundNum][currentLine];
}

// Things to do:
    // ✓ keep track of user time
    // ✓ redirect to the proper score page (at the end of round)
    // - adding in profile images (player icon and meme lord icon)
    // - feeding in the stories
    // - meme lord logic
