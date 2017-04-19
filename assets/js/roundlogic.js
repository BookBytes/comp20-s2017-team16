/* JS logic for running the game in real time */
/* outer loop that ensures game is not complete and has not run over time of 10 minutes */
/* uses listeners to update user typed data for all 4 users and presents it on screen */
/* updates sentence in the middle on user #'s screen when that user has entered the last line correctly */

var curr_paragraph = "Once there was a little boy named Jack. He was sent to the market to sell a cow for money for food. However he chose to sell the cow for a magical seed that grew a beanstack to a giant's castle! What did Jack do next? He climbed the beanstack of course!" // for test purposes only
var roundNum;
var story;
var currentLine = 1;
var totalRounds;
var maxLine;
var timer;

function init()
{
    parse_story(); // splits paragraph into lines, start on the first paragraph on line 1
    timer = Date.now();
}

// into paragraphs and then sentences
function parse_story()
{
    // story = full_story.split("\n")

    // http://www.jquerywithexample.com/2015/11/split-string-with-multiple-separator-in.html
    story = curr_paragraph.split('. '); /* ('.'); /.|?|!/); */

    //story.forEach(function(item, index, array){
    //    story[index] = story[index].split('.');
    //});

    totalRounds = story.length;
    // console.log(story);  // REMOVE THIS LATER
    line = document.getElementById("center");
    roundNum = 0;
    // line.innerHTML += story[roundNum][currentLine - 1];
    line.innerHTML += story[currentLine - 1];
    // maxLine = story[roundNum].length;
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
    if ((newTimer - timer) > (1000 * 60 * 10)) {
        line = document.getElementById("center");
	line.innerHTML = "Out of time.";
	// send request to server to end round
    }

    if (roundNum > totalRounds) {
        wpm = find_wpm();
        // redirect to score page, server request
        // find time
    }
    
    if (currentLine > maxLine) {
        roundNum++;
        // maxLine = story[roundNum].length;
        line.innerHTML = "You finished this round!";
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
    // check in with server, get their line number, update it; temp data for now
    topPlayer = document.getElementById("hbox_top").value;
    topPlayer.innerHTML = story[roundNum][currentLine];
    leftPlayer = document.getElementById("vbox_left").value;
    leftPlayer.innerHTML = story[roundNum][currentLine];
    rightPlayer = document.getElementById("vbox_right").value;
    rightPlayer.innerHTML = story[roundNum][currentLine];
}

// Things to do:
    // ✓ keep track of user time
    // - redirect to the proper score page (either end of the round or at the end of a game)
    // - adding in profile images (player icon and meme lord icon)
    // - feeding in the stories
    // - meme lord logic
