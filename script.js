let randomWord = [];
function generateRandomWord() {
  fetch('https://random-word-api.herokuapp.com/word?length=5', {mode: 'cors'})
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      randomWord = data.toString();
      randomWord = randomWord.split("");
    });
}

function switchInputFocus() {
  const allBoxes = document.querySelectorAll('.board');
  allBoxes[0].children[0].focus();
  for (let i = 0; i < allBoxes.length; i++) {
    for (let j = 0; j < allBoxes[i].children.length; j++) {
      allBoxes[i].children[j].addEventListener('keyup', function(e) {
        if (e.keyCode === 8) {
          this.previousElementSibling.focus();
        } else {
          try {
            this.nextElementSibling.focus();
          } catch (err) {
            compareGuess(this.parentElement);
            this.parentElement.nextElementSibling.children[0].focus();
          };
        };
      });
    };
  };
};

function compareGuess(inputs) {
  let guess = [];
  const allInputs = inputs.children;
  for (let i = 0; i < allInputs.length; i++) {
    guess.push(allInputs[i]);
  };
  for (let j = 0; j < guess.length; j++) {
    if (randomWord.includes(guess[j].value)) {
      guess[j].style.backgroundColor = '#e9c46a';
      if (guess[j].value === randomWord[j]) {
        guess[j].style.backgroundColor = '#2a9d8f';
      }
    } else {
      guess[j].style.backgroundColor = '#e76f51';
    };
  };
};

function generateInputBoard() {
  const main = document.querySelector('main');
  for (let i = 0; i < 6; i++) {
    const board = document.createElement('div');
    board.classList.add('board');
    for (let j = 0; j < 5; j++) {
      const input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('maxlength', '1');
      board.appendChild(input);
    }
    main.appendChild(board);
  }
}

generateRandomWord();
generateInputBoard();
switchInputFocus();