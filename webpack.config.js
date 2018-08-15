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

  devtool: 'inline-source-map',
  devServer: {
    contentBase: `./${buildDir}`,
},


  plugins: [
    new CleanWebpackPlugin(`${path}/bundle.*.js`),
    new HtmlPlugin({ template: './src/index.html' })
  ],
  
  module: {
    rules: [
      // js
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                targets: {
                  browsers: 'Chrome 65'
                  // browsers: ['last 2 versions', 'safari >= 7']
                },
              }],
              'react'
            ],
            plugins: [
              require('babel-plugin-transform-object-rest-spread'),
              require('babel-plugin-transform-class-properties'),
            ],
            cacheDirectory: true
          }
        }
      },
    

      
    ]
  }
      
}