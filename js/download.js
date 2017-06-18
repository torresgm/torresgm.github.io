function download() {
  const imageFormatRadio = document.querySelector('input[name="imageFormat"]:checked');
  const imageFormat = imageFormatRadio ? imageFormatRadio.value : '';
  const canvas = getCanvas();
  const context = canvas.getContext('2d');
  if (isEmptyCanvas(canvas)) {
    alert('Select an image first!')
  } else {
    if (confirmDownload()) {
      this.href = canvas.toDataURL(`image/${imageFormat}`);
      this.download = 'photoedits';
    }
  }
}

function isEmptyCanvas(canvas) {
  const emptyCanvas = document.createElement('canvas');
  emptyCanvas.width = canvas.width;
  emptyCanvas.height = canvas.height;
  return canvas.toDataURL() == emptyCanvas.toDataURL();
}

function confirmDownload() {
  return confirm('Save image?');
}