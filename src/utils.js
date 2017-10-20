var createCanvas = (w, h, nodeCanvas) => {
  if (nodeCanvas) {
    return new nodeCanvas(w, h);
  } else {
    let canvas = document.createElement("canvas");
    canvas.setAttribute("width", w);
    canvas.setAttribute("height", h);
    return canvas;
  }
}

var createImage = (nodeCanvas, w, h) => {
  if (nodeCanvas) {
    return new nodeCanvas.Image(w, h);
  } else {
    return new Image(w, h);
  }
}

module.exports = {
  createCanvas: createCanvas,
  rgba: (color) => `rgba(${color[0]},${color[1]},${color[2]},${color[3]})`,
  ptToPx: (pt) => (pt * 1.33),
  createImage: createImage
}
