//get a random number from 0 to size
var getRandomNumber = function(size) {
    return Math.floor(Math.random() * size);
};
//Setting up image on Canvas

var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d');
var pic = new Image();
pic.src = "https://m.media-amazon.com/images/I/81jIoI7cbiL._AC_SL1500_.jpg"
pic.addEventListener('load', function() {ctx.drawImage(pic, 0, 0, canvas.width, canvas.height)}, false)

//calculate distance between treasure and click
var getDistance = function (event, target) {
    var diffX = event.offsetX - target.x;
    var diffY = event.offsetY - target.y;
    return Math.sqrt((diffX * diffX) + (diffY * diffY));
};

var width = canvas.width;
var height = canvas.height;
var clicks = 0;
var clickLimit = 20

//click handler
$("#canvas").click(function(event) {
    drawStrikes(event)
    clicks++;
    var distance = getDistance(event, target);
    var distanceHint = getDistanceHint(distance);
    $("#distance").text(distanceHint);
    $("#clickcounter").text(clickLimit-clicks);
    if (distance < 10 ) {
        drawCircle("#FF0000", "000000");
        alert("You found the treasure in " + clicks + " clicks!");
    }if (clicks >= clickLimit) {
        alert("GAME OVER: You ran out of guesses!");
        drawCircle("#FF0000", "OOOOOO");
    }
});

//random target
var target = {
    x: getRandomNumber(width),
    y: getRandomNumber(height)
};
//How close is the player
var getDistanceHint = function (distance) {
    if (distance < 25) {
        return "YOU CAN'T GET ANY CLOSER!!!";
    } else if (distance < 45) {
        return "Really hot stuff!!";
    } else if (distance < 160) {
        return "Hot Stuff!";
    } else if (distance < 220) {
        return "getting warmer...";
    } else if (distance < 280) {
        return "a little better.";
    } else if (distance < 420) {
        return "Not Here.";
    } else {
        return "Freezing.";
    }
};


// functions for marking map. 
function drawStrikes (event) {
    // Get coordinates of mouse event relative to canvas
    const playingArea = document.querySelector('canvas#canvas')
    let rect = playingArea.getBoundingClientRect();
    console.log(event);
    console.log(rect);
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

// DRAW CIRLCE FUNCTION 
function drawCircle (color, outline) {
    let x = target.x;
    let y = target.y;
    ctx.beginPath();
    ctx.arc(x, y,  5, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = outline;
    ctx.stroke();
    ctx.closePath();
}