const { resolve } = require('path');

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
  devServer: {
    contentBase: `./${buildDir}`,
  },
};