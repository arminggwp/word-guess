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
            this.parentElement.nextElementSibling.children[0].focus();
          }
        };
      });
    }
  }
};

const dictionary = ['chair', 'cloud', 'aphid'];

switchInputFocus();
