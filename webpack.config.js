'use strict';

const dotEnv = require('dotenv-webpack');
const mode = process.env.NODE_ENV || 'development';

let systemvarsValue = false;
if (mode === 'production') {
  systemvarsValue = true;
}

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: __dirname,
    filename: './public/bundle.js',
  },
  mode: 'development',
  context: __dirname,
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },

  plugins: [new dotEnv({ systemvars: systemvarsValue })],
};
