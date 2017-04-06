/* JS logic for running the game in real time */
/* outer loop that ensures game is not complete and has not run over time of 10 minutes */
/* uses listeners to update user typed data for all 4 users and presents it on screen */
/* updates sentence in the middle on user #'s screen when that user has entered the last line correctly */

var full_story = "Once there was a little boy named Jack. He was sent to the market to sell a cow for money for food. However he chose to sell the cow for a magical seed that grew a beanstack to a giant's castle! What did Jack do next? He climbed the beanstack of course!" // for test purposes only

var story;
var line_num = 1;

// into paragraphs and then sentences
function parse_story()
{
    // http://www.jquerywithexample.com/2015/11/split-string-with-multiple-separator-in.html
    story = full_story.split('.'); /* /.|?|!/); */

    // console.log(story);  // REMOVE THIS LATER
    line = document.getElementById("center");
    line.innerHTML += story[0];
}

function find_wpm(user_time)
{
    var word_count = story.split(" ");
    word_count.length / user_time;
}

function check_input()
{
    line = document.getElementById("center");

    console.log(story);
    if (line_num > story.length) {
        line.innerHTML = "You finished this round!";
	return;
    }	
	
    input = document.getElementById("bottom_input").value;
    
    if (input === story[line_num - 1]) {
	line_num += 1;
        line.innerHTML = story[line_num - 1];
	// console.log("Hello");
        // line = story[line_num];
    }
}

// .keypress
function update_textboxes()
{
    newMsg = document.getElementById("hbox_top").value;
    // TBAdded
}
