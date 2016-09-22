/*eslint-env node */
var options = require('./webpack.base.js');
options.entry = __dirname + '/../src/index.js';
options.output = {
  filename: 'index.js',
  path: __dirname + '/../dist',
  library: 'VueMarquee',
  libraryTarget: 'umd'
};
module.exports = options;