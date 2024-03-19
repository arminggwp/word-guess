// global variables
var row = 1;
var tile = 1;
let word = '';

document.body.addEventListener('keyup', inputHandler);

function generateBoard() {
  var board = document.querySelector('.board');
  for (let i = 1; i < 7; i++) {
    var row = document.createElement('div');
    row.classList.add('row' + i, 'row');
    board.appendChild(row);
    for (let j = 1; j < 6; j++) {
      var tile = document.createElement('div');
      tile.classList.add('tile' + j, 'tile');
      row.appendChild(tile);
    }
  }
};

function inputHandler() {
  var alphabetRegex = /^[a-zA-Z]$/;
  var currentRow = document.querySelector('.row' + row);
  if (event.key === 'Backspace' && tile > 1) {
    tile--;
    currentRow.querySelector('.tile' + tile).textContent = '';
  } else if (event.key === "Enter" && !(currentRow.querySelector('.tile' + tile))) {
    row++;
    tile = 1;
    checkWord(currentRow);
  } else if (alphabetRegex.test(event.key) && currentRow.querySelector('.tile' + tile)) {
    currentRow.querySelector('.tile' + tile).textContent = event.key;
    tile++;
  }
}

function generateWord() {
  fetch('./words.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    var keys = Object.keys(data);
    return word = data[keys[ keys.length * Math.random() << 0]];
  });
}

function checkWord(rowToCheck) {
  var tilesRow = rowToCheck.childNodes;
  for (let k = 0; k < word.length; k++) {
    if (tilesRow[k].textContent == word.split('')[k]) {
      tilesRow[k].classList.add('correct');
    } else if (word.split('').includes(tilesRow[k].textContent)) {
      tilesRow[k].classList.add('partially');
    } else {
      tilesRow[k].classList.add('wrong');
    }
  }
  endGame(rowToCheck);
}

function endGame(rowToCheck) {
  let score = document.querySelector('.score');
  let report = document.querySelector('.report');
  let start = document.querySelector('.start');
  if (rowToCheck.querySelectorAll('.correct').length == 5) {
    score.style.visibility = 'visible';
    score.textContent = parseInt(score.textContent) + 1;
    report.textContent = 'Correct! The word was indeed ' + word;
    start.style.display = "block";
  } else if (rowToCheck.classList.contains('row6')) {
    score.style.visibility = 'visible';
    score.textContent = '0';
    report.textContent = 'Game Over! The word was ' + word; + ' Try again.';
    start.style.display = "block";
  }
}

function startGame() {
  document.querySelector('.report').textContent = '';
  if (document.querySelector('.rules')) {
    document.querySelector('.rules').style.display = "none";
  }
  if (document.querySelector('.board').children.length > 0) {
    document.querySelector('.board').replaceChildren();
  }
  generateBoard();
  generateWord();
  row = 1;
  tile = 1;
  document.querySelector('.start').style.display = "none";
}