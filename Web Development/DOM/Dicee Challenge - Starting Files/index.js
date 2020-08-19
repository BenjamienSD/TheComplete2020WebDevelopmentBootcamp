// random number generator

function random() {
  return Math.floor(Math.random() * 6 + 1);
}

let number1 = random();
let number2 = random();

document
  .querySelector('.img1')
  .setAttribute('src', `images/dice${number1}.png`);
document
  .querySelector('.img2')
  .setAttribute('src', `images/dice${number2}.png`);

if (number1 > number2) {
  document.querySelector('h1').textContent = 'Player 1 wins!';
} else if (number2 > number1) {
  document.querySelector('h1').textContent = 'Player 2 wins!';
} else {
  document.querySelector('h1').textContent = 'Draw!';
}
