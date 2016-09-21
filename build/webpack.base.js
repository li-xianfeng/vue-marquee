/*eslint-env node */
module.exports = {
  module: {
    loaders: [
      { test: /\.vue$/, 
        loader: 'vue' 
      },
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
            presets: ['es2015']
        }
      }
    ]
  },
  vue: {
    loaders: {
        js: 'babel?presets[]=es2015'
    }
  }
};
 
