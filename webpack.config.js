/* eslint-env node */
const { resolve } = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

const buildDir = 'docs';
const path = resolve(__dirname, buildDir);

module.exports = {
  // start here
  entry: './src/index.js',
  // put the build output here (not dev server)
  output: {
    path,
    filename: 'bundle.[hash].js',
    publicPath: ''
  },
  // mode (will eventually be cmd line arg in package.json scripts)
  mode: 'development',
  plugins: [
  new CleanWebpackPlugin(`${path}/bundle.*.js`), 
  new HtmlPlugin({ template: './src/index.html' })
  ]
};