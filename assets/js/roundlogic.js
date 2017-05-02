/* JS logic for running the game in real time */
/* uses listeners to update user typed data for all 4 users and presents it on screen */
/* updates sentence in the middle on user #'s screen when that user has entered the last line correctly */
var paragraph = "Behold... He climbed the beanstalk of course!" // for test purposes only
var story;
var currentLine = 1;
var maxLine;
var timer;

function init()
{
    get_story(); // splits paragraph into lines
    timer = Date.now();
    time = document.getElementById("time");
    time.innerHTML = 0 + " seconds";
    update_textboxes();
}

function parse_story()
{
    // see http://stackoverflow.com/questions/11761563/javascript-regexp-for-splitting-text-into-sentences-and-keeping-the-delimiter
    story = paragraph.match( /[^\.!\?]+[\.!\?]+/g );
    remove_leading_spaces();

    line = document.getElementById("center");
    line.innerHTML += story[currentLine - 1];
    maxLine = story.length;
}

// see http://stackoverflow.com/questions/4503656/in-java-removing-first-character-of-a-string
function remove_leading_spaces() {
    for (var i = 0; i < story.length; i++) {
        if (i != 0) {
            story[i] = story[i].substring(1);
        }
    }
}

function find_wpm(user_time)
{
    var word_count = 0;
    for (var i = 0; i < story.length; i++) {
        word_count += (story[i].split(" ")).length;
    }
    word_count.length / user_time;
}

function check_input()
{
    newTimer = Date.now();
    line = document.getElementById("center");

    if (currentLine == -1) {
        return;
    }

    // adapted from http://stackoverflow.com/questions/9224773/js-check-if-date-is-less-than-1-hour-ago
    else if ((newTimer - timer) > (1000 * 60 * 10)) {
        line = document.getElementById("center");
	    line.innerHTML = "Out of time.";
	    // wpm = find_wpm((newTimer - timer) * 1000 * 60);
        $.get("https://m3m3l0rd.herokuapp.com/score?wpm=INVALID");
    }

    else if (currentLine > maxLine) {
        line.innerHTML = "You finished this round!";
	    wpm = find_wpm((newTimer - timer) * 1000 * 60);
	    $.get("https://m3m3l0rd.herokuapp.com/score?wpm=" + wpm);
        currentLine = -1;
	    return;
    }

    time = document.getElementById("time");
    time.innerHTML = ((newTimer - timer) / 1000).toFixed(1) + " seconds";
	
    update_textboxes();
    input = document.getElementById("bottom_input").value;

    if (input === story[currentLine - 1]) {
        currentLine++;
        line.innerHTML = story[currentLine - 1];
        // input = '';
        clear_textbox();
    }
}

function clear_textbox(){
    document.getElementById("bottom_input").value = "";
}

function update_textboxes()
{
    $.get("https://m3m3l0rd.herokuapp.com/getscore?player=P1", 
        function (P1progress) { 
            topPlayer = document.getElementById("P1");
            topPlayer.innerHTML = story[P1progress];});
            // topPlayer.innerHTML = story[currentLine - 1];});
    
    $.get("https://m3m3l0rd.herokuapp.com/getscore?player=P2", 
    function (P2progress) { 
        LeftPlayer = document.getElementById("P2");
        LeftPlayer.innerHTML = story[P2progress];});
        // topPlayer.innerHTML = story[currentLine - 1];});

    $.get("https://m3m3l0rd.herokuapp.com/getscore?player=P3", 
    function (P3progress) { 
        RightPlayer = document.getElementById("P3");
        RightPlayer.innerHTML = story[P3progress];});
        // topPlayer.innerHTML = story[currentLine - 1];});
}

function getParagraph()
{
    
}

// Things to do:
    // ✓ keep track of user time
    // ✓ redirect to the proper score page (at the end of round)
    // ✓ adding in profile images (player icon and meme lord icon)
    // - feeding in the stories
    // - meme lord logic
