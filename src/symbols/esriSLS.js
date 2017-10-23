const { createCanvas, rgba, ptToPx } = require("../utils");
const linePatterns = require("./linePatterns");

module.exports = (symbol, options, callback) => {
  let canvas = createCanvas(options.width, options.height, options.canvas);
  var ctx = canvas.getContext('2d');
  var strokeWidth = ptToPx(symbol.width || 1.33);
  console.log('strokeWidth', strokeWidth);
  ctx.lineWidth = strokeWidth;
  ctx.strokeStyle = rgba(symbol.color);
  if (symbol.style in linePatterns) {
    ctx.setLineDash(linePatterns[symbol.style](strokeWidth));
    ctx.beginPath();
    let midpoint = (options.height * 0.5) + strokeWidth;
    ctx.moveTo(0, midpoint);
    ctx.lineTo(options.width, midpoint);
    ctx.stroke();
    callback(null, canvas);
  } else {
    callback(new Error(`Unknown esriSLS style ${symbol.outline.style}`), []);
  }
}
