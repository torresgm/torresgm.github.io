function show(element) {
  element.className = 'show';
}

function hide(element) {
  element.className = 'hide';
}

function setMenuButtons(menu) {
  const pageButtons = document.querySelectorAll('#home, #about, #edit');
  const pages = document.querySelectorAll('#homePage, #aboutPage, #editPage');
  pageButtons.forEach(function (pageButton) {
    const buttonId = pageButton.id;
    pageButton.onclick = function () {
      pages.forEach(function (page) {
        const isPageNotHidden = `${buttonId}Page` !== page.id;
        if (isPageNotHidden) {
          const pageId = page.id;
          hide(page);
        } else {
          show(page);
        }
      })
      hide(menu);
    }
  })
}

function setMenu() {
  const menu = document.querySelector('#menu');
  const menulink = document.querySelector('#menulink');
  menulink.onclick = function () {
    if (menu.className === 'show') {
      return hide(menu);
    }
    else {
      return show(menu);
    }
  }
  window.onresize = function () {
    if (menu.className === 'show') {
      return hide(menu);
    }
  }
  setMenuButtons(menu);
}

function setEditButtons() {
  const buttons = document.querySelectorAll('.button');
  buttons.forEach(function (button) {
    const buttonId = button.id;
    switch (buttonId) {
      case 'imageFile':
        button.onchange = onFileSelected;
        break;
      case 'download':
      case 'resetImage':
      case 'originalImageDisplay':
        button.onclick = window[buttonId];
        break;
    }
  })
}

function setDate() {
  const date = document.querySelector('#date');
  date.innerHTML = new Date().getFullYear();
}

window.onload = function () {
  setMenu();
  setRanges();
  setOrientationButtons();
  setEditButtons();
  setDate();
}