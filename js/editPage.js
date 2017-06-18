function getCanvas() {
  return document.querySelector('#canvas');
}

function getImage() {
  return document.querySelector('#originalImage')
}

function transition(element, action) {
  const endhandler = function () {
    action();
    element.removeEventListener('transitioned', endhandler, false);
    element.removeEventListener('webkitTransitionEnd', endhandler, false);
    element.style.opacity = 1.0;
  }
  element.addEventListener('transitioned', endhandler, false);
  element.addEventListener('webkitTransitionEnd', endhandler, false);
  element.style.transition = '0.5s';
  element.style.opacity = 0.0;
}

function onFileSelected(event) {
  resetInputRanges();
  const image = getImage();
  index = 0;
  const selectedFile = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(selectedFile);
  reader.onload = function (event) {
    const result = event.target.result;
    image.src = result;
  };
  image.onload = function () {
    displayCanvasImage(image);
  };
}

function displayCanvasImage(image) {
  const canvas = getCanvas();
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const context = canvas.getContext('2d');
  const action = function () {
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
  }
  transition(canvas, action);
}

function resetImage() {
  const image = getImage();
  const context = getCanvas().getContext('2d');
  resetFilter();
  resetOrientation();
  context.drawImage(image, 0, 0);
  context.setTransform(1, 0, 0, 1, 0, 0);
  resetInputRanges();
}

function setImagePopupTransition(imagePopup) {
  let opacity = 0.0;
  let timer;
  imagePopup.style.opacity = opacity;
  const transition = function () {
    opacity += 0.05;
    imagePopup.style.opacity = opacity;
    if (opacity > 1.0) {
      opacity = 1.0;
      clearTimeout(timer);
    }
    timer = setTimeout(transition, 20);
  }
  transition();
}

function imagePopupOriginalImage() {
  const originalImageClone = getImage().cloneNode();
  const imagePopup = document.createElement('div');
  const container = document.createElement('div');
  const content = document.createElement('div');
  const button = document.createElement('a');
  const span = document.createElement('span');
  imagePopup.className = 'imagePopup';
  container.className = 'imagePopupContainer';
  content.className = 'imagePopupContent';
  button.href = '#';
  button.className = 'closeButton';
  imagePopup.appendChild(container);
  container.appendChild(content);
  content.appendChild(originalImageClone);
  content.appendChild(button);
  span.appendChild(document.createTextNode('X'));
  button.appendChild(span);
  button.onclick = function () {
    document.body.removeChild(imagePopup);
  }
  setImagePopupTransition(imagePopup);
  document.body.appendChild(imagePopup);
}

function originalImageDisplay() {
  imagePopupOriginalImage();
}