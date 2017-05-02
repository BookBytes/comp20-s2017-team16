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
    memelordStatus(event);
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
function sendMeme (randNum) {
    var img = $('<img>', {id: "image", src: "/img/meme"+randNum, alt: "memeattack!"});
    $("body").append(img);
    // wait 3 seconds
    $("body").remove();
}

// $("ctrlKey").keyup(function(){
//     var min = 1;
//     var max = 38;

//     img = new Image();
//     img.onload = function () {
//         context.drawImage(img, 10%,10%,10%,10%);
//         img.src = "../assets/img/meme" + randNum;
//     }
// });


// var img = $('<img>', {id: "image", src: "image.png", alt: "image"});
// $("body").appendChild(img)

// var $body = $('body').html;
// insert image
// $('body').html = $body

// if (e.ctrlKey){
//     var randNum = Math.floor((Math.random()*10)+1);
//     img = new Image();
//     onload = function () {
//         context.drawImage(img, 10%,10%,10%,10%);
//         src = "../"
//     }
// }
