// get number of buttons
let drumButtons = document.querySelectorAll('.drum').length;

// add eventListener to all the drum buttons
for (i = 0; i < drumButtons; i++) {
  document.querySelectorAll('.drum')[i].addEventListener('click', handleEvent);
}

// add eventListener to document for keydown
document.addEventListener('keydown', handleEvent);

// assign variables to audio elements
let kick = new Audio('sounds/kick-bass.mp3');
let snare = new Audio('sounds/snare.mp3');
let crash = new Audio('sounds/crash.mp3');
let tom1 = new Audio('sounds/tom-1.mp3');
let tom2 = new Audio('sounds/tom-2.mp3');
let tom3 = new Audio('sounds/tom-3.mp3');
let tom4 = new Audio('sounds/tom-4.mp3');

// set the buttonInnerHtml variable to the innerHTML of the button that was clicked
// check the key of the button or the keydown event
function handleEvent(event) {
  let buttonInnerHtml = this.innerHTML;

  function animate() {
    let activeKey = document.querySelector(`.${buttonInnerHtml || event.key}`);
    activeKey.classList.add('pressed');
    setTimeout(function () {
      activeKey.classList.remove('pressed');
    }, 100);
  }

  switch (buttonInnerHtml || event.key) {
    case 'w':
      kick.play();
      animate();
      break;
    case 'a':
      snare.play();
      animate();
      break;
    case 's':
      crash.play();
      animate();
      break;
    case 'd':
      tom1.play();
      animate();
      break;
    case 'j':
      tom2.play();
      animate();
      break;
    case 'k':
      tom3.play();
      animate();
      break;
    case 'l':
      tom4.play();
      animate();
      break;
    default:
      break;
  }
}
