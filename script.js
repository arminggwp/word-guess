function switchInputFocus() {
  const allBoxes = document.querySelector('.active').children;
  for (let i = 0; i < allBoxes.length; i++) {
    allBoxes[i].addEventListener('keyup', function(e) {
      if (e.keyCode === 8) {
        this.previousElementSibling.focus();
      } else {
        this.nextElementSibling.focus();
      };
    });
  };
};

switchInputFocus();

const dictionary = ['chair', 'cloud', 'aphid'];

function checkGuess() {
  const board = document.querySelector('.active');
  console.log(board.children[4].value.length);
  if (board.children[4].value.length === 1) {
    board.nextElementSibling.classList.add('active');
    board.classList.remove('active');
  }
}