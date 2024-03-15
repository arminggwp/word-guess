(function loadGameBoard() {
  var board = document.querySelector('.board');
  for (let i = 1; i < 7; i++) {
    for (let j = 1; j < 6; j++) {
      var tile = document.createElement('div');
      tile.classList.add('row' + i, 'tile' + j, 'tile');
      board.appendChild(tile);
    }
  }
  inputHandler();
  generateWord();
})();

function inputHandler() {
  var input = document.querySelector('.word-input');
  var tileCount = 0;
  input.addEventListener('input', function(){
    var tiles = document.querySelectorAll('.tile');
    tiles[tileCount].textContent = input.value;
    input.value = '';
    if (tiles[tileCount].classList.contains('tile5')) {
      checkWord(tiles[tileCount].className.split(" ")[0]);
    }
    tileCount++;
  })
};

let word = '';
function generateWord() {
  fetch('./wordle.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    var keys = Object.keys(data);
    return word = data[keys[ keys.length * Math.random() << 0]];
  });
}

function checkWord(row) {
  let guess = '';
  var tilesRow = document.querySelectorAll('.' + row);
  tilesRow.forEach(tile => {
    guess += tile.textContent;
  });
  if (guess === word) {
    console.log('CORRECT');
  } else {
    console.log('WRONG');
  }
}