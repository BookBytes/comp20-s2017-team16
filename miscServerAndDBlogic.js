// To keep all temp server and mongodb logic not yet implemented


// Some general round logic that could be converted to server and mongodb req/queries where applicable

//    if (roundNum > totalRounds) {
//        wpm = find_wpm((newTimer - timer) * 1000 * 60);
//	// send info to mongodb
//	$.get("https://m3m3l0rd.herokuapp.com/score", function () { });
//    }

// old round logic that works for if round takes care of the whole story (we're now doing just a round at a time)

function parse_story()
{
    story = full_story.split("\n")

    story.forEach(function(item, index, array){
        story[index] = story[index].split('.');
    });

    // console.log(story);  // REMOVE THIS LATER
    line = document.getElementById("center");
    roundNum = 0;
    line.innerHTML += story[roundNum][currentLine - 1];
    maxLine = story[roundNum].length;
}
