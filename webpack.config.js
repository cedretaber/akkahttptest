var path = require("path");
var webpack = require("webpack");

module.exports = {
    devtool: 'inline-source-map',
    entry: [
        './app.ts'
    ],
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.ts(x?)$/, loader: 'ts-loader' }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  },
};