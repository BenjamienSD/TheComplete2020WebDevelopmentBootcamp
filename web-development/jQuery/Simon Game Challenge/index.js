let buttonColours = ['red', 'green', 'blue', 'yellow'];

let gamePattern = [];
let userClickedPattern = [];
let userChosenColour;
let level = 0;
let wrong = new Audio('sounds/wrong.mp3');

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  animate(randomChosenColour);
  level++;
  $('h1').text('level ' + level);
}

$('.btn').click(function () {
  userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animate(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  let sound = new Audio(`sounds/${name}.mp3`);
  sound.play();
}

function animate(name) {
  $('#' + name).addClass('pressed');
  setTimeout(function () {
    $('#' + name).removeClass('pressed');
  }, 100);
}

$(document).keydown(function (e) {
  if (gamePattern.length < 1) {
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        userClickedPattern = [];
        nextSequence();
      }, 1000);
    }
  } else {
    wrong.play();
    $('body').addClass('game-over');
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200);
    $('h1').text('Game Over, Press Any Key to Restart');
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
