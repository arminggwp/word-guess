function switchInputFocus() {
  const allBoxes = document.querySelectorAll('.board');
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
          }
        };
      });
    }
  }
};

const dictionary = ['a', 'r', 'm', 'i', 'n'];

switchInputFocus();

function compareGuess(elements) {
  let guess = [];
  const allInputs = elements.children;
  for (let i = 0; i < allInputs.length; i++) {
    guess.push(allInputs[i]);
  }
  for (let j = 0; j < guess.length; j++) {
    if (dictionary.includes(guess[j].value)) {
      guess[j].style.backgroundColor = 'yellow';
      if (guess[j].value === dictionary[j]) {
        guess[j].style.backgroundColor = 'green';
      }
    } else {
      guess[j].style.backgroundColor = 'red';
    }
  }
}
