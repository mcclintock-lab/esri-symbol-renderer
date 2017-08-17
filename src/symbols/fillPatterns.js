const { createCanvas } = require("../utils");

module.exports = {
  esriSFSVertical: (ctx, strokeStyle) => {
    var canvas = createCanvas(16, 16);
    var ctx=canvas.getContext('2d');

    ctx.strokeStyle = strokeStyle || "#000000";
    ctx.lineWidth=1;
    ctx.beginPath();
    ctx.moveTo(8,0);
    ctx.lineTo(8,16);
    ctx.stroke();
    return ctx.createPattern(canvas, 'repeat');
  },
  esriSFSHorizontal: (ctx, strokeStyle) => {
    var canvas = createCanvas(16, 16);
    var ctx=canvas.getContext('2d');

    ctx.strokeStyle = strokeStyle || "#000000";
    ctx.lineWidth=1;
    ctx.beginPath();
    ctx.moveTo(0, 8);
    ctx.lineTo(16, 8);
    ctx.stroke();
    return ctx.createPattern(canvas, 'repeat');
  },
  esriSFSBackwardDiagonal: (ctx, strokeStyle) => {
    var canvas = createCanvas(16, 16);
    var ctx=canvas.getContext('2d');

    ctx.strokeStyle = strokeStyle || "#000000";
    ctx.lineWidth=1;
    ctx.beginPath();
    ctx.moveTo(0, 8);
    ctx.lineTo(8, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, 24);
    ctx.lineTo(24, 0);
    ctx.stroke();
    return ctx.createPattern(canvas, 'repeat');
  },
  esriSFSForwardDiagonal: (ctx, strokeStyle) => {
    var canvas = createCanvas(16, 16);
    var ctx=canvas.getContext('2d');

    ctx.strokeStyle = strokeStyle || "#000000";
    ctx.lineWidth=1;
    ctx.beginPath();
    ctx.moveTo(0, 8);
    ctx.lineTo(8, 16);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(8, 0);
    ctx.lineTo(16, 8);
    ctx.stroke();
    return ctx.createPattern(canvas, 'repeat');
  },
  esriSFSCross: (ctx, strokeStyle) => {
    var canvas = createCanvas(16, 16);
    var ctx=canvas.getContext('2d');

    ctx.strokeStyle = strokeStyle || "#000000";
    ctx.lineWidth=1;
    ctx.beginPath();
    ctx.moveTo(0, 8);
    ctx.lineTo(16, 8);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(8, 0);
    ctx.lineTo(8, 16);
    ctx.stroke();
    return ctx.createPattern(canvas, 'repeat');
  },
  esriSFSDiagonalCross: (ctx, strokeStyle) => {
    var canvas = createCanvas(16, 16);
    var ctx=canvas.getContext('2d');

    ctx.strokeStyle = strokeStyle || "#000000";
    ctx.lineWidth=1;
    ctx.beginPath();
    ctx.moveTo(0, 8);
    ctx.lineTo(8, 16);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(8, 0);
    ctx.lineTo(16, 8);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, 8);
    ctx.lineTo(8, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, 24);
    ctx.lineTo(24, 0);
    ctx.stroke();
    return ctx.createPattern(canvas, 'repeat');
  },
}
