let angle = 0;
let vertical = false, horizontal = false;

function setOrientationButtons() {
  const orientationButtons = document.querySelectorAll('#orientationButtons button');
  orientationButtons.forEach(function (orientationButton) {
    const orientation = orientationButton.id;
    orientationButton.onclick = function () {
      changeOrientation(orientation);
    }
  })
}

function setCanvasSize(canvas) {
  const context = canvas.getContext('2d');
  const filter = context.filter;
  switch (angle) {
    case 0:
    case 180:
      canvas.width = getImage().naturalWidth;
      canvas.height = getImage().naturalHeight;
      break;
    case 90:
    case 270:
      canvas.width = getImage().naturalHeight;
      canvas.height = getImage().naturalWidth;
      break;
  }
  context.filter = filter;
}

function is90And270Deg() {
  return angle === 90 || angle === 270;
}

function setAngle(orientation) {
  const isLeftRotation = orientation === 'rotateLeft';
  if (orientation === 'original') {
    angle = 0;
  } else {
    angle = angle + (isLeftRotation ? - 90 : 90);
    if (angle === 360) {
      angle = 0;
    } else if (angle === -90) {
      angle = 270;
    }
  }
}

function flipImage(context, orientation) {
  const isVerticalOrientation = orientation === 'flipVertical';
  const isHorizontalOrientation = orientation === 'flipHorizontal';
  let x, y, scaleX, scaleY;
  if (is90And270Deg()) {
    x = isVerticalOrientation ? canvas.height : 0;
    y = isHorizontalOrientation ? canvas.width : 0;
    scaleX = isVerticalOrientation ? -1 : 1;
    scaleY = isHorizontalOrientation ? -1 : 1;
  } else {
    x = isHorizontalOrientation ? canvas.width : 0;
    y = isVerticalOrientation ? canvas.height : 0;
    scaleX = isHorizontalOrientation ? -1 : 1;
    scaleY = isVerticalOrientation ? -1 : 1;
  }
  context.translate(x, y);
  context.scale(scaleX, scaleY);
}

function rotateImage(canvas) {
  setCanvasSize(canvas);
  const context = canvas.getContext('2d');
  context.translate(canvas.width / 2, canvas.height / 2);
  context.rotate(angle * Math.PI / 180);
  if (is90And270Deg()) {
    if (horizontal) {
      context.scale(-1, 1);
    }
    if (vertical) {
      context.scale(1, -1);
    }
  } else {
    if (horizontal) {
      context.scale(1, -1);
    }
    if (vertical) {
      context.scale(-1, 1);
    }
  }
  context.translate(-getImage().naturalWidth / 2, -getImage().naturalHeight / 2);
}

function changeOrientation(orientation) {
  const isVerticalOrientation = orientation === 'flipVertical';
  const isHorizontalOrientation = orientation === 'flipHorizontal';
  const isLeftRotation = orientation === 'rotateLeft';
  const isRightRotation = orientation === 'rotateRight';
  const image = getImage();
  const canvas = getCanvas();
  const context = canvas.getContext('2d');
  if (isVerticalOrientation || isHorizontalOrientation) {
    flipImage(context, orientation);
    vertical = isVerticalOrientation ? !vertical : vertical;
    horizontal = isHorizontalOrientation ? !horizontal : horizontal;
  } else if (isLeftRotation || isRightRotation) {
    setAngle(orientation);
    rotateImage(canvas);
  }
  context.drawImage(image, 0, 0);
}

function resetOrientation() {
  vertical = false;
  horizontal = false;
  setAngle('original');
  rotateImage(getCanvas());
}