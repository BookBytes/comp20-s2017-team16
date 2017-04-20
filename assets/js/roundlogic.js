/* JS logic for running the game in real time */
/* uses listeners to update user typed data for all 4 users and presents it on screen */
/* updates sentence in the middle on user #'s screen when that user has entered the last line correctly */

var curr_paragraph = "Once there was a little boy named Jack. He was sent to the market to sell a cow for money for food. However he chose to sell the cow for a magical seed that grew a beanstalk to a giant's castle! What did Jack do next? Behold... He climbed the beanstalk of course!" // for test purposes only
var roundNum;
var story;
var currentLine = 1;
// var totalRounds;
var maxLine;
var timer;

function init()
{
    parse_story(); // splits paragraph into lines
    timer = Date.now();
    time = document.getElementById("time");
    time.innerHTML = 0 + " seconds";
    update_textboxes();
}

function parse_story()
{
    // see http://www.jquerywithexample.com/2015/11/split-string-with-multiple-separator-in.html
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

    // adapted from http://stackoverflow.com/questions/9224773/js-check-if-date-is-less-than-1-hour-ago
    // problem: what if the user doesn't finish? Then their W in WPM is different... Maybe remove this case entirely.
    if ((newTimer - timer) > (1000 * 60 * 10)) {
        line = document.getElementById("center");
	line.innerHTML = "Out of time.";
	wpm = find_wpm((newTimer - timer) * 1000 * 60);
	// send info to mongodb
        $.get("https://m3m3l0rd.herokuapp.com/score?wpm=" + wpm, function () { });
    }

    if (currentLine > maxLine) {
        roundNum++;
        // maxLine = story[roundNum].length;
        line.innerHTML = "You finished this round!";
	wpm = find_wpm((newTimer - timer) * 1000 * 60);
	$.get("https://m3m3l0rd.herokuapp.com/score?wpm=" + wpm, function () { });
	// send info to mongodb
        // currentLine = 0;
	return;
    }

    time = document.getElementById("time");
    time.innerHTML = ((newTimer - timer) / 1000) + " seconds";
	
    update_textboxes();
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
    topPlayer = document.getElementById("P1");
    topPlayer.innerHTML = story[currentLine - 1];
    //topPlayer.innerHTML = story[roundNum][currentLine];
    
    leftPlayer = document.getElementById("P2");
    leftPlayer.innerHTML = story[currentLine - 1];
    //leftPlayer.innerHTML = story[roundNum][currentLine];
    
    rightPlayer = document.getElementById("P3");
    rightPlayer.innerHTML = story[currentLine - 1];
    //rightPlayer.innerHTML = story[roundNum][currentLine];
}

// Things to do:
    // ✓ keep track of user time
    // ✓ redirect to the proper score page (at the end of round)
    // ✓ adding in profile images (player icon and meme lord icon)
    // - feeding in the stories
    // - meme lord logic
