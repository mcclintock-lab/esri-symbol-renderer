const { renderSymbol, symbols, fillPatterns } = require("./symbols");

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
  options = {
    ...DEFAULT_OPTIONS,
    ...options
  };
  if (!options.width || !options.height) {
    options.width = options.height = Math.round(30 * options.scale);
  }
  var symbols = [];
  switch (renderer.type) {
    case "simple":
      appendSymbol(
        symbols,
        renderer.label,
        renderer.symbol,
        options,
        1,
        callback
      );
      break;
    case "uniqueValue":
      if (options.includeDefaultValues && renderer.defaultSymbol) {
        renderer.uniqueValueInfos.push(
          {
            symbol: renderer.defaultSymbol,
            label: renderer.defaultLabel || "Other"
          }
        );
      }
      for (var info of renderer.uniqueValueInfos) {
        appendSymbol(
          symbols,
          info.label,
          info.symbol,
          options,
          renderer.uniqueValueInfos.length,
          callback
        );
      }
      break;
    case "classBreaks":
      if (options.includeDefaultValues && renderer.defaultSymbol) {
        renderer.classBreakInfos.push(
          {
            symbol: renderer.defaultSymbol,
            label: renderer.defaultLabel || "Other"
          }
        );
      }
      for (var info of renderer.classBreakInfos) {
        appendSymbol(
          symbols,
          info.label,
          info.symbol,
          options,
          renderer.classBreakInfos.length,
          callback
        );
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

module.exports.symbols = symbols;
module.exports.fillPatterns = fillPatterns;
