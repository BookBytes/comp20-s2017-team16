/* JS logic for running the game in real time */
/* uses listeners to update user typed data for all 4 users and presents it on screen */
/* updates sentence in the middle on user #'s screen when that user has entered the last line correctly */

var paragraph = "Become the m3m3l0rd, and spam the ever loving you-know-what out of your friends. Play mind games, talk trash, any measures you can take to out-compete your friends must be taken. If the youtube comments on my eighth grade spanish project have taught me anything, it is this: there are no friends on the internet."; // for test purposes only
var story;
var currentLine = 1;
var maxLine;
var timer;
var paragraphNum;
var storyName;
//var curr_user;

function init()
{   
    // getUserInfo();
    // getParagraph();
    parse_story(); // splits paragraph into lines
    timer = Date.now();
    time = document.getElementById("time");
    time.innerHTML = 0 + " seconds";
    update_textboxes();
}

// function getUserInfo(){
//     $.get('/game_Table', function(data){
//         curr_user = data.body.username;
//     });
// }
// function getParagraph()
// {
//     $.get('/stories_Table', function (data){
//         paragraphNum = data.body.paragraphNum + 1;
//         paragraph = data.body.paragraph;
//         storyName = data.body.storyName;
//         $.post('/stories_Table', {"storyName":storyName, "paragraph":paragraph, "paragraphNum":paragraphNum});
// }

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
    else if ((newTimer - timer) > (1000 * 60 * 1.5)) {
        line = document.getElementById("center");
        line.innerHTML = "OUT OF TIME!";
        // wpm = find_wpm((newTimer - timer) * 1000 * 60);
        $.get('/score?wpm=INVALID');
    }

    else if (currentLine > maxLine) {
        line.innerHTML = "You finished this round!";
        wpm = find_wpm((newTimer - timer) * 1000 * 60);
        $.get('/score?wpm=' + wpm);
        currentLine = -1;
        sendToScore();
        return;
    }

    time = document.getElementById("time");
    // see http://stackoverflow.com/questions/4256030/limit-the-amount-of-number-shown-after-a-decimal-place-in-javascript
    time.innerHTML = ((newTimer - timer) / 1000).toFixed(1) + " seconds";

    update_textboxes();

    if (((newTimer - timer) % 100) == 0) {
        sendMeme(randNum());
    }

    input = document.getElementById("bottom_input").value;

    if (input === story[currentLine - 1]) {
        currentLine++;
        line.innerHTML = story[currentLine - 1];
        clear_textbox();
    }
}

function clear_textbox(){
    document.getElementById("bottom_input").value = "";
}

function update_textboxes()
{
//    $.get('/getscore?player=P1', 
//        function (P1progress) {
        topPlayer = document.getElementById("P1");
//        topPlayer.innerHTML = story[P1progress];});
        topPlayer.innerHTML = story[currentLine - 1]; //});

//    $.get('/getscore?player=P2', 
//        function (P2progress) {
        LeftPlayer = document.getElementById("P2");
//        LeftPlayer.innerHTML = story[P2progress];});
        LeftPlayer.innerHTML = story[currentLine - 1]; //});

//    $.get('/getscore?player=P3', 
//        function (P3progress) {
        RightPlayer = document.getElementById("P3");
//        RightPlayer.innerHTML = story[P3progress];});
        RightPlayer.innerHTML = story[currentLine - 1]; //});
}

function sendToScore ()
{
    window.location.href = "https://m3m3l0rd.herokuapp/score?username=" + mchow01;
}