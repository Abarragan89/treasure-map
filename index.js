//get a random number from 0 to size
var getRandomNumber = function(size) {
    return Math.floor(Math.random() * size);
};
//Setting up image on Canvas
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d');
let pic = new Image();
pic.src = "https://m.media-amazon.com/images/I/81jIoI7cbiL._AC_SL1500_.jpg"
pic.addEventListener('load', function() {ctx.drawImage(pic, 0, 0, canvas.width, canvas.height)}, false)

function canvasSetUp () {
    let canvas = document.getElementById('canvas')
    let ctx = canvas.getContext('2d');
    let pic = new Image();
    pic.src = "https://m.media-amazon.com/images/I/81jIoI7cbiL._AC_SL1500_.jpg"
    pic.addEventListener('load', function() {ctx.drawImage(pic, 0, 0, canvas.width, canvas.height)}, false)
}


//calculate distance between treasure and click
var getDistance = function (event) {
    var diffX = event.offsetX - target1.x;
    var diffY = event.offsetY - target1.y;
    return Math.sqrt((diffX * diffX) + (diffY * diffY));
};
//Target Object
class Target {
    constructor (clicks, width, height) {
        this.clicks = clicks;
        this.width = width;
        this.height = height;
        this.x = undefined;
        this.y = undefined;
    }
    randomSpot () {
        let x = getRandomNumber(this.width - 10);
        let y = getRandomNumber(this.height - 10);
        this.x = x;
        this.y = y;
    }
    subtractClick () {
        this.clicks -= 1;
    }
    drawCircle () {
        let x = this.x;
        let y = this.y;
        ctx.beginPath();
        ctx.arc(x, y,  5, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.closePath();
    }
}; 
//Canvas Click Event
// Dig a hole 
function dig (event) {
    drawStrikes(event)
    target1.subtractClick();
    var distance = getDistance(event);
    var distanceHint = getDistanceHint(distance);
    $("#distance").text(distanceHint);
    $("#clickcounter").text(target1.clicks);
    
    // If you Win!
    if (distance < 15 ) {
        target1.drawCircle();
        alert("You found the treasure and kept " + target1.clicks + "!!");
        gameEnd();
    // If you lose.
    }if (target1.clicks <= 0) {
        target1.drawCircle();
        alert("GAME OVER: You ran out of guesses!");
        gameEnd();
    }
}
//When you run out of clicks or win. 
function gameEnd () {
    canvas.removeEventListener("click", dig);
        $("#start-stop").prop("value", "reset");
}

//Start / Stop button 
// Make New Target Object and Place it.
$("#start-stop").click(function () {
    // Raise opacity, clear the screen, and spot new target
    $("#canvas").css("opacity", "1")
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvasSetUp();
    target1 = new Target(20, canvas.width, canvas.height);
    target1.randomSpot();
    // Add event listener and display clicks.
    canvas.addEventListener("click", dig);
    $("#clickcounter").text(target1.clicks);
    // Set the text of the input button
    let btn = document.getElementById("start-stop");
    if (btn.value == "start") {
        btn.value = "reset"
    } else if (btn.value == "reset") {
        btn.value = "start"
    }

})

//How close is the player
var getDistanceHint = function (distance) {
    if (distance < 25) {
        return "YOU CAN'T GET ANY CLOSER! (25 FEET AWAY)"
    } else if (distance < 45) {
        return "Really hot stuff!!(45 FEET AWAY)";
    } else if (distance < 160) {
        return "Hot Stuff! (160 FEET AWAY";
    } else if (distance < 220) {
        return "getting warmer...(220 FEET AWAY)";
    } else if (distance < 280) {
        return "a little better.";
    } else if (distance < 420) {
        return "Not Here.";
    } else {
        $("#distance").text("Freezing");
    }
};

// functions for marking map. 
function drawStrikes (event) {
    // Get coordinates of mouse event relative to canvas
    const playingArea = document.querySelector('canvas#canvas')
    let rect = playingArea.getBoundingClientRect();
    let x = event.offsetX;
    let y = event.offsetY;

    // Draw Circle with X and Y of mouse click
    ctx.beginPath();
    ctx.arc(x, y,  10, 0, Math.PI * 2);
    ctx.fillStyle = '#00FF00'
    ctx.fill();
    ctx.strokeStyle = "#000000"
    ctx.stroke();
    ctx.closePath();
}