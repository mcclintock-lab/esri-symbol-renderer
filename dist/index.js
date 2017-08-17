(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["renderSymbols"] = factory();
	else
		root["renderSymbols"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var createCanvas = (w, h, nodeCanvas) => {
  if (nodeCanvas) {
    return new nodeCanvas(w, h);
  } else {
    let canvas = document.createElement("canvas");
    canvas.setAttribute("width", w);
    canvas.setAttribute("height", h);
    return canvas;
  }
};

var createImage = (nodeCanvas, w, h) => {
  if (nodeCanvas) {
    return new nodeCanvas.Image(w, h);
  } else {
    return new Image(w, h);
  }
};

module.exports = {
  createCanvas: createCanvas,
  rgba: color => `rgba(${color[0]},${color[1]},${color[2]},${color[3]})`,
  ptToPx: pt => Math.round(pt * 1.33),
  createImage: createImage
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const { createCanvas, rgba, ptToPx, createImage } = __webpack_require__(0);
const fillPatterns = __webpack_require__(5);
const linePatterns = __webpack_require__(2);

module.exports = (symbol, options, callback) => {
  let canvas = createCanvas(options.width, options.height, options.canvas);
  var ctx = canvas.getContext("2d");
  var image = null;
  if (symbol.style === "esriSFSSolid") {
    ctx.fillStyle = rgba(symbol.color);
  } else if (symbol.style === "esriSFSNull") {
    ctx.fillStyle = rgba([0, 0, 0, 0]);
  } else if (symbol.style in fillPatterns) {
    ctx.fillStyle = fillPatterns[symbol.style](ctx, options.blackFillPatterns ? "#000000ff" : rgba(symbol.color));
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
  };
  if (image) {
    image.onload = () => {
      ctx.fillStyle = ctx.createPattern(image, 'repeat');
      drawPoly();
    };
    let { contentType, imageData } = symbol;
    image.src = `data:${contentType};base64,${imageData}`;
  } else {
    drawPoly();
  }
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {
  esriSLSSolid: () => [],
  esriSLSDash: strokeWidth => [strokeWidth * 2, strokeWidth * 2],
  esriSLSDashDot: strokeWidth => [strokeWidth * 4, strokeWidth * 2, strokeWidth, strokeWidth * 2],
  esriSLSDashDotDot: strokeWidth => [strokeWidth * 4, strokeWidth * 2, strokeWidth, strokeWidth * 2, strokeWidth, strokeWidth * 2],
  esriSLSNull: () => [0, 10]
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const { renderSymbol } = __webpack_require__(4);

const DEFAULT_OPTIONS = {
  blackFillPatterns: true,
  includeDefaultValues: false,
  scale: 1,
  Canvas: null
};

module.exports = (renderer, options, callback) => {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  if (!callback) {
    throw new Error("You must supply a callback");
  }
  options = _extends({}, DEFAULT_OPTIONS, options);
  options.width = options.height = Math.round(30 * options.scale);
  var symbols = [];
  switch (renderer.type) {
    case "simple":
      appendSymbol(symbols, renderer.label, renderer.symbol, options, 1, callback);
      break;
    case "uniqueValue":
      if (options.includeDefaultValues && renderer.defaultSymbol) {
        renderer.uniqueValueInfos.push({
          symbol: renderer.defaultSymbol,
          label: renderer.defaultLabel || "Other"
        });
      }
      for (var info of renderer.uniqueValueInfos) {
        appendSymbol(symbols, info.label, info.symbol, options, renderer.uniqueValueInfos.length, callback);
      }
      break;
    case "classBreaks":
      if (options.includeDefaultValues && renderer.defaultSymbol) {
        renderer.classBreakInfos.push({
          symbol: renderer.defaultSymbol,
          label: renderer.defaultLabel || "Other"
        });
      }
      for (var info of renderer.classBreakInfos) {
        appendSymbol(symbols, info.label, info.symbol, options, renderer.classBreakInfos.length, callback);
      }
      break;
    default:
      callback(new Error(`Unknown renderer type '${renderer.type}'`));
  }
};

// Renderers are async (Image API) so a function is needed to do async map
const appendSymbol = (symbols, label, symbol, options, length, callback) => {
  renderSymbol(symbol, options, (err, item) => {
    if (err) {
      callback(err, []);
    } else {
      symbols.push({
        label: label,
        canvas: item
      });
      if (symbols.length === length) {
        callback(null, symbols);
      }
    }
  });
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

let symbols = {
  esriSFS: __webpack_require__(1),
  esriSLS: __webpack_require__(6),
  esriSMS: __webpack_require__(7),
  esriPMS: __webpack_require__(8),
  // lots in common with esriSFS code
  esriPFS: __webpack_require__(1)
};

module.exports = _extends({}, symbols, {
  renderSymbol: (symbol, options, callback) => {
    if (!(symbol.type in symbols)) {
      callback(new Error(`Unrecognized symbol type ${symbol.type}`), []);
    } else {
      symbols[symbol.type](symbol, options, callback);
    }
  }
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const { createCanvas } = __webpack_require__(0);

module.exports = {
  esriSFSVertical: (ctx, strokeStyle) => {
    var canvas = createCanvas(16, 16);
    var ctx = canvas.getContext('2d');

    ctx.strokeStyle = strokeStyle || "#000000";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(8, 0);
    ctx.lineTo(8, 16);
    ctx.stroke();
    return ctx.createPattern(canvas, 'repeat');
  },
  esriSFSHorizontal: (ctx, strokeStyle) => {
    var canvas = createCanvas(16, 16);
    var ctx = canvas.getContext('2d');

    ctx.strokeStyle = strokeStyle || "#000000";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 8);
    ctx.lineTo(16, 8);
    ctx.stroke();
    return ctx.createPattern(canvas, 'repeat');
  },
  esriSFSBackwardDiagonal: (ctx, strokeStyle) => {
    var canvas = createCanvas(16, 16);
    var ctx = canvas.getContext('2d');

    ctx.strokeStyle = strokeStyle || "#000000";
    ctx.lineWidth = 1;
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
    var ctx = canvas.getContext('2d');

    ctx.strokeStyle = strokeStyle || "#000000";
    ctx.lineWidth = 1;
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
    var ctx = canvas.getContext('2d');

    ctx.strokeStyle = strokeStyle || "#000000";
    ctx.lineWidth = 1;
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
    var ctx = canvas.getContext('2d');

    ctx.strokeStyle = strokeStyle || "#000000";
    ctx.lineWidth = 1;
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
  }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const { createCanvas, rgba, ptToPx } = __webpack_require__(0);
const linePatterns = __webpack_require__(2);

module.exports = (symbol, options, callback) => {
  let canvas = createCanvas(options.width, options.height, options.canvas);
  var ctx = canvas.getContext('2d');
  var strokeWidth = ptToPx(symbol.width || 1);
  ctx.lineWidth = strokeWidth;
  ctx.strokeStyle = rgba(symbol.color);
  if (symbol.style in linePatterns) {
    ctx.setLineDash(linePatterns[symbol.style](strokeWidth));
    ctx.beginPath();
    let midpoint = options.height * 0.5 + strokeWidth;
    ctx.moveTo(0, midpoint);
    ctx.lineTo(options.width, midpoint);
    ctx.stroke();
    callback(null, canvas);
  } else {
    callback(new Error(`Unknown esriSLS style ${symbol.outline.style}`), []);
  }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const { createCanvas, rgba, ptToPx } = __webpack_require__(0);

module.exports = (symbol, options, callback) => {
  let canvas = createCanvas(options.width, options.height, options.canvas);
  var ctx = canvas.getContext("2d");
  ctx.lineWidth = ptToPx(!!symbol.outline ? symbol.outline.width : 1);
  ctx.strokeStyle = !!symbol.outline ? rgba(symbol.outline.color) : rgba(symbol.color);
  ctx.fillStyle = rgba(symbol.color);
  switch (symbol.style) {
    case "esriSMSCircle":
      ctx.beginPath();
      var x = options.width / 2;
      var y = options.height / 2;
      var radius = ptToPx(symbol.size) * options.scale;
      ctx.arc(x, y, radius, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.stroke();
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

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const { createCanvas, ptToPx, createImage } = __webpack_require__(0);

module.exports = (symbol, options, callback) => {
  let canvas = createCanvas(options.width, options.height, options.canvas);
  var ctx = canvas.getContext("2d");
  let { contentType, imageData } = symbol;
  var image = createImage(options.canvas, ptToPx(symbol.width) * options.scale, ptToPx(symbol.height) * options.scale);
  image.onload = function () {
    ctx.drawImage(image, (options.width - image.width) / 2, (options.height - image.height) / 2, Math.round(ptToPx(symbol.width) * options.scale), Math.round(ptToPx(symbol.height) * options.scale));
    callback(null, canvas);
  };
  image.src = `data:${contentType};base64,${imageData}`;
};

/***/ })
/******/ ]);
});