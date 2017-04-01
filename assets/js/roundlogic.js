/* JS logic for running the game in real time */
/* outer loop that ensures game is not complete and has not run over time of 10 minutes */
/* uses listeners to update user typed data for all 4 users and presents it on screen */
/* updates sentence in the middle on user #'s screen when that user has entered the last line correctly */
var story;
var line_num = 1;

parse_story(full_story)
{
    // http://www.jquerywithexample.com/2015/11/split-string-with-multiple-separator-in.html
    story = full_story.split(/.|?|!/);
}

find_wpm(user_time)
{
    var word_count = story.split(" ");
    return word_count.length() / user_time;
}

// .keypress
check_input(input)
{
    if (input === story[line_num - 1]) {
	line_num += 1;
        line = story[line_num];
    }
}
