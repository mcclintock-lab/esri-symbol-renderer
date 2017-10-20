const { createCanvas, rgba, ptToPx, createImage } = require("../utils");
const fillPatterns = require("./fillPatterns");
const linePatterns = require("./linePatterns");

module.exports = (symbol, canvas, options, callback) => {
  var ctx = canvas.getContext("2d");
  var image = null;
  if (symbol.style === "esriSFSSolid") {
    ctx.fillStyle = rgba(symbol.color);
  } else if (symbol.style === "esriSFSNull") {
    ctx.fillStyle = rgba([0, 0, 0, 0]);
  } else if (symbol.style in fillPatterns) {
    ctx.fillStyle = fillPatterns[symbol.style](
      ctx,
      options.blackFillPatterns ? "#000000ff" : rgba(symbol.color)
    );
  } else if (symbol.type === 'esriPFS') {
    image = createImage(options.canvas, symbol.width, symbol.height);
  } else {
    callback(new Error(`Unknown symbol style ${symbol.style}`), []);
    return;
  }
  if (!!symbol.outline && symbol.outline.style !== "esriSLSNull") {
    var strokeWidth = ptToPx(symbol.outline.width || 1);
    ctx.strokeStyle = rgba(symbol.outline.color);
    ctx.lineWidth = strokeWidth;
    if (symbol.outline.style in linePatterns) {
      ctx.setLineDash(linePatterns[symbol.outline.style](strokeWidth));
    } else {
      callback(new Error(`Unknown outline style ${symbol.outline.style}`), []);
      return;
    }
  } else {
    var strokeWidth = 1;
    ctx.lineWidth = ptToPx(1);
    ctx.strokeStyle = rgba([0, 0, 0, 0]);
  }
  let drawPoly = () => {
    ctx.beginPath();
    ctx.moveTo(0 + strokeWidth, 0 + strokeWidth);
    ctx.lineTo(0 + strokeWidth, options.height - strokeWidth);
    ctx.lineTo(options.width - strokeWidth, options.height - strokeWidth);
    ctx.lineTo(options.width - strokeWidth, 0 + Math.round(options.height * 0.3));
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    if (callback) {
      callback(null, canvas);
    }
  }
  if (image) {
    image.onload = () => {
      ctx.fillStyle = ctx.createPattern(image, 'repeat');
      drawPoly();
    }
    let {contentType, imageData} = symbol;
    image.src = `data:${contentType};base64,${imageData}`;
  } else {
    drawPoly();
  }
};
