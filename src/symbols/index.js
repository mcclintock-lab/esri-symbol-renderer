let symbols = {
  esriSFS: require('./esriSFS'),
  esriSLS: require('./esriSLS'),
  esriSMS: require('./esriSMS'),
  esriPMS: require('./esriPMS'),
  // lots in common with esriSFS code
  esriPFS: require('./esriSFS')
}

import fillPatterns from './fillPatterns';
import {createCanvas} from '../utils';

module.exports = {
  symbols,
  fillPatterns,
  renderSymbol: (symbol, options, callback) => {
    if (!(symbol.type in symbols)) {
      callback(new Error(`Unrecognized symbol type ${symbol.type}`), []);
    } else {
      let canvas = createCanvas(options.width, options.height, options.canvas);
      symbols[symbol.type](symbol, canvas, options, callback)
    }
  }
}
