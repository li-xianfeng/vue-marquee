var options = require('./webpack.base.js');
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

options.entry = [__dirname + '/../demo/index.js'];
options.output = {
  filename: __dirname + '/../demo/dist/app.js',
  publicPath: path.join(__dirname, '../demo'),
};

options.plugins = [
    // new HtmlWebpackPlugin({
    //   filename: 'dist/index.html',
    //   template: 'dist/index.html',
    //   inject: true
    // })
]
module.exports = options;