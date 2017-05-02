// memelogic

var memePlacement = document.getElementById("body");
var $body = $('body').html;
var memelord = false;

var randNum = function getRandomInt(min, max) {
    var min = 1;
    var max = 38;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function memeLogic() {
    assignMemelord();
    memelordStatus();
}

function assignMemelord() {
    
// every 5 seconds change
}

function memelordStatus() {
    if (this.memelord = true){
        var $body = $('body').html; // copy what they have written
        sendMeme(randNum);
        memelord = false;
        $('body').html = $body; // replace
    }
}

// need to add server time
function sendMeme (randomNum) {
    var img = $('<img>', {id: "image", src: "../assets/img/meme"+randomNum, alt: "memeattack!"});
    $("body").append(img);
    setTimeout(function () {
        $("body").html = $body;
    }, 3000);
}
