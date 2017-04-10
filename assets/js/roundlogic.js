/* JS logic for running the game in real time */
/* outer loop that ensures game is not complete and has not run over time of 10 minutes */
/* uses listeners to update user typed data for all 4 users and presents it on screen */
/* updates sentence in the middle on user #'s screen when that user has entered the last line correctly */

var full_story = "Once there was a little boy named Jack. He was sent to the market to sell a cow for money for food. However he chose to sell the cow for a magical seed that grew a beanstack to a giant's castle! What did Jack do next? He climbed the beanstack of course!" // for test purposes only
var roundNum;
var story;
var currentLine = 1;
var totalRounds;
var maxLine;

function init(){
    parse_story(); // splits into paragraphs, splits paragraphs into lines
    // start on the first paragraph on line 1
}

// into paragraphs and then sentences
function parse_story()
{
    story = full_story.split("\n")

    // http://www.jquerywithexample.com/2015/11/split-string-with-multiple-separator-in.html
    // story = full_story.split('.'); /* /.|?|!/); */

    story.forEach(function(item, index, array){
        story[index] = story[index].split('.');
    });

    totalRounds = story.length;
    // console.log(story);  // REMOVE THIS LATER
    line = document.getElementById("center");
    roundNum = 0;
    line.innerHTML += story[roundNum][currentLine - 1];
    maxLine = story[roundNum].length;
}

function find_wpm(user_time)
{
    var word_count = story.split(" ");
    word_count.length / user_time;
}

function check_input()
{

    line = document.getElementById("center");

    if (roundNum > totalRounds) {
        wpm = find_wpm();
        // redirect to score page
        // find time
    }
    if (currentLine > maxLine) {
        roundNum++;
        maxLine = story[roundNum].length;
        line.innerHTML = "You finished this round!";
        currentLine = 0;
	    return;
    }	
	
    input = document.getElementById("bottom_input").value;
    
    if (input === story[currentLine - 1]) {
	    currentLine += 1;
        line.innerHTML = story[currentLine - 1];
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
    // - keep track of user time
    // - redirect to the proper score page (either end of the round or at the end of a game)
    // - adding in profile images (player icon and meme lord icon)
    // - feeding in the stories