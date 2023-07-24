function switchInputFocus() {
  const allBoxes = document.querySelector('.board').children;
  for (let i = 0; i < allBoxes.length; i++) {
    allBoxes[i].addEventListener('keyup', function(e) {
      if (e.keyCode === 8 || e.keyCode === 37) {
        this.innerText = '';
        this.previousElementSibling.focus();
      } else {
        this.nextElementSibling.focus();
      };
    });
  };
};

switchInputFocus();