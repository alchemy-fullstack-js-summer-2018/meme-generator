const { resolve } = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

const buildDir = 'docs';
const path = resolve(__dirname, buildDir);

module.exports = {
  entry: './src/index.js',
  output: {
    path,
    filename: 'bundle.[hash].js',
    publicPath: '/docs'
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: `./${buildDir}`,
  },
  plugins: [
    new CleanPlugin(`${path}/bundle.*.js`),
    new HtmlPlugin({ template: './src/index.html' })
  ],
};