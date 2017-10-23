const { createCanvas, rgba, ptToPx } = require("../utils");

module.exports = (symbol, options, callback) => {
  let canvas = createCanvas(options.width, options.height, options.canvas);
  var ctx = canvas.getContext("2d");
  ctx.lineWidth = ptToPx(!!symbol.outline ? symbol.outline.width : 1);
  ctx.strokeStyle = !!symbol.outline
    ? rgba(symbol.outline.color)
    : rgba(symbol.color);
  ctx.fillStyle = rgba(symbol.color);
  switch (symbol.style) {
    case "esriSMSCircle":
      // canvas.style = "image-rendering: pixelated;";
      // ctx.imageSmoothingEnabled = false;
      ctx.beginPath();
      var x = options.width / 2;
      var y = options.height / 2;
      var diameter = ptToPx(symbol.size) * options.scale;
      // I have no idea why, but adding a bit here helps match arcgis server output a bit better
      var radius = Math.round((diameter + ctx.lineWidth )/ 2);
      console.log('radius', radius, ctx.lineWidth);
      ctx.arc(x, y, radius, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.stroke();
      console.log(canvas.toDataURL())
      break;
    case "esriSMSCross":
      var w = ptToPx(symbol.size) * options.scale;
      ctx.lineWidth = Math.round(w / 4);
      ctx.strokeStyle = rgba(symbol.color);
      ctx.moveTo(options.width / 2, (options.height - w) / 2);
      ctx.lineTo(options.width / 2, options.height - (options.height - w) / 2);
      ctx.moveTo((options.width - w) / 2, options.height / 2);
      ctx.lineTo(options.width - (options.width - w) / 2, options.height / 2);
      ctx.stroke();
      ctx.fill();
      break;
    case "esriSMSX":
      var w = ptToPx(symbol.size) * options.scale;
      ctx.translate(options.width / 2, options.height / 2);
      ctx.rotate(45 * Math.PI / 180);
      ctx.translate(-options.width / 2, -options.height / 2);
      ctx.moveTo(options.width / 2, (options.height - w) / 2);
      ctx.lineTo(options.width / 2, options.height - (options.height - w) / 2);
      ctx.moveTo((options.width - w) / 2, options.height / 2);
      ctx.lineTo(options.width - (options.width - w) / 2, options.height / 2);
      ctx.stroke();
      ctx.fill();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      break;
    case "esriSMSDiamond":
      var w = ptToPx(symbol.size) * options.scale;
      var h = ptToPx(symbol.size) * options.scale;
      var x = options.width / 2 - w / 2;
      var y = options.height / 2 - h / 2;
      ctx.translate(x + w / 2, y + h / 2);
      ctx.rotate(45 * Math.PI / 180);
      ctx.fillRect(-w / 2, -h / 2, w, h);
      ctx.strokeRect(-w / 2, -h / 2, w, h);
      break;
    case "esriSMSSquare":
      var w = ptToPx(symbol.size) * options.scale;
      var h = ptToPx(symbol.size) * options.scale;
      var x = options.width / 2 - w / 2;
      var y = options.height / 2 - h / 2;
      ctx.fillRect(x, y, w, h);
      ctx.strokeRect(x, y, w, h);
      break;
    case "esriSMSTriangle":
      ctx.beginPath();
      var width = ptToPx(symbol.size) * options.scale;
      var midpoint = options.width / 2;
      var x1 = midpoint;
      var y1 = (options.height - width) / 2;
      var x2 = options.width - (options.width - width) / 2;
      var y2 = options.height - (options.height - width) / 2;
      var x3 = (options.width - width) / 2;
      var y3 = options.height - (options.height - width) / 2;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineTo(x3, y3);
      ctx.lineTo(x1, y1);
      ctx.fill();
      ctx.stroke();
      break;
    default:
      callback(new Error(`Unknown symbol type ${symbol.style}`), []);
      return;
  }
  callback(null, canvas);
};
