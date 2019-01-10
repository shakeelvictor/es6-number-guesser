// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min & max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e){
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value);

  // Validate input
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} & ${max}`, 'red');
    return false;
  }

  // Check if winning number
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is the winning number! You win! Woo-hoo!`);
  } else {
    // Wrong number
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      // Game over, man
      gameOver(true, `Game Over, man! The correct number was ${winningNum}`);
    } else {
      // Game continues, answer wrong
      // Clear input
      guessInput.value = '';
      gameOver(false,`${guess} is not correct. You have ${guessesLeft} guesses left! Keep trying!`);
        // Tell user they have 1 guess left!
      if (guessesLeft === 1) {
        gameOver(false, `${guess} is not correct. You have ${guessesLeft} guess left! Choose wisely!`);
      }
    }
  }
});

// Game over function
function gameOver(won, msg) {
  let color;
  if (won === true) {
    color = 'green';
    guessInput.disabled = true
  } else {
    color = 'red';
    guessInput.disabled = false
  }
  // Change border color
  guessInput.style.borderColor = color;
  // Set text color
  message.style.color = color;
  // Set winning message
  setMessage(msg);

  // Play again?
  if (won === true || guessesLeft === 0) {
    guessBtn.value = 'Play again!';
    guessBtn.className += 'play-again';
  }
}

// Get winning number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// SetMessage function
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}