// document.querySelectorAll('.set').addEventListener('click', handleClick);

let drumButtons = document.querySelectorAll('.drum').length;

for (i = 0; i < drumButtons; i++) {
  document.querySelectorAll('.drum')[i].addEventListener('click', handleClick);
}

let kick = new Audio('sounds/kick-bass.mp3');
let snare = new Audio('sounds/snare.mp3');
let crash = new Audio('sounds/crash.mp3');
let tom1 = new Audio('sounds/tom-1.mp3');
let tom2 = new Audio('sounds/tom-2.mp3');
let tom3 = new Audio('sounds/tom-3.mp3');
let tom4 = new Audio('sounds/tom-4.mp3');

function handleClick() {
  this.style.color = 'white';
}
