//get a random number from 0 to size
var getRandomNumber = function(size) {
    return Math.floor(Math.random() * size);
};
//calculate distance between treasure and click
var getDistance = function (event, target) {
    var diffX = event.offsetX - target.x;
    var diffY = event.offsetY - target.y;
    return Math.sqrt((diffX * diffX) + (diffY * diffY));
};

var width = 750;
var height = 500;
var clicks = 0;
var clickLimit = 20

//click handler
$("#map").click(function(event) {
    clicks++;
    var distance = getDistance(event, target);
    var distanceHint = getDistanceHint(distance);
    $("#distance").text(distanceHint);
    $("#clickcounter").text("You have " + (clickLimit-clicks) + " clicks left");
    if (distance < 14 ) {
        alert("You found the treasure in " + clicks + " clicks!");
    }if (clicks > clickLimit) {
        alert("GAME OVER: You ran out of guesses!");
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
        return "Boiling hot!";
    } else if (distance < 45) {
        return "Really hot!";
    } else if (distance < 60) {
        return "Hot";
    } else if (distance < 120) {
        return "Warm";
    } else if (distance < 180) {
        return "Cold";
    } else if (distance < 320) {
        return "Really Cold";
    } else {
        return "Freezing!";
    }
};