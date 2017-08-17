const path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/index.js',
  externals: ["canvas-prebuilt"],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'renderSymbols',
    libraryTarget: "umd"
  },
  resolve: {
    modules: [
      path.resolve('./node_modules')
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
};
