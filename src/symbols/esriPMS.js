const { createCanvas, ptToPx, createImage } = require("../utils");

module.exports = (symbol, options, callback) => {
  let canvas = createCanvas(options.width, options.height, options.canvas);
  var ctx = canvas.getContext("2d");
  let { contentType, imageData } = symbol;
  var image = createImage(options.canvas, ptToPx(symbol.width) * options.scale, ptToPx(symbol.height) * options.scale);
  image.onload = function() {
    ctx.drawImage(
      image,
      (options.width - image.width) / 2,
      (options.height - image.height) / 2,
      Math.round(ptToPx(symbol.width) * options.scale),
      Math.round(ptToPx(symbol.height) * options.scale)
    );
    callback(null, canvas);
  };
  image.src = `data:${contentType};base64,${imageData}`;
};
