/* eslint-env node */
const { resolve } = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

const buildDir = 'docs';
const path = resolve(__dirname, buildDir);

module.exports = {
  entry: './src/index.js',

  output: {
    path,
    filename: 'bundle.[hash].js',
    publicPath: ''
  },

  plugins: [
    new CleanWebpackPlugin(`${path}/bundle.*.js`),
    new HtmlPlugin({ template: './src/index.html' })
  ],
  
  devServer: {
    contentBase: './docs',
},


 
}