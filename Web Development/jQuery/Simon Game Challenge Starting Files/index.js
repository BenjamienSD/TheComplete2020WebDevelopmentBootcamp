// Array of button colours
let buttonColours = ['red', 'blue', 'green', 'yellow'];

// pattern arrays
let gamePattern = [];
let playerPattern = [];

// current colour
let currentColour;

// add random colour to game pattern
function addRandomColour() {
  let randomNumber = Math.floor(Math.random() * 4);
  gamePattern.push(buttonColours[randomNumber]);
}

function animatePattern() {
  $('.' + currentColour)
    .fadeOut(100)
    .fadeIn(100);
}

// start game

$(document).keydown(function (e) {
  if (e.key === 'a' && gamePattern.length < 1) {
    addRandomColour();
    currentColour = gamePattern[0];
    console.log(gamePattern);
    setTimeout(function () {
      animatePattern();
    }, 500);
  }
});

// detect player pattern and compare to game pattern
// detect which button the player clicked by returning its id and adding that colour to the player pattern
$('.btn').click(function () {
  currentColour = this.id;
  playerPattern.push(currentColour);

  // if player pattern matches game pattern
  // add colour to game pattern
  // animate game pattern
});
