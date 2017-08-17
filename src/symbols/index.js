let symbols = {
  esriSFS: require('./esriSFS'),
  esriSLS: require('./esriSLS'),
  esriSMS: require('./esriSMS'),
  esriPMS: require('./esriPMS'),
  // lots in common with esriSFS code
  esriPFS: require('./esriSFS')
}

module.exports = {
  ...symbols,
  renderSymbol: (symbol, options, callback) => {
    if (!(symbol.type in symbols)) {
      callback(new Error(`Unrecognized symbol type ${symbol.type}`), []);
    } else {
      symbols[symbol.type](symbol, options, callback)
    }
  }
}
