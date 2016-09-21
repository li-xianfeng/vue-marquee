/*eslint-env node */
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
var options = require('./webpack.base.js');
options.entry = __dirname + '/../src/index.js';
options.output = {
  filename: 'index.js',
  path: __dirname + '/../dist',
  library: 'Broadcast',
  libraryTarget: 'umd'
};
module.exports = options;