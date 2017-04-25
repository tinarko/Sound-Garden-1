const path = require('path');
module.exports = function(config) {
  config.set({
    basePath: '',
    browsers: ['PhantomJS'],
    frameworks: ['mocha'],
    files: [
      'spec/**/*.jsx'
    ],
    preprocessors: {
      'client/src/index.jsx': ['webpack', 'sourcemap'],
      'spec/**/*.jsx': ['webpack', 'sourcemap']
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.js?/,
            loader: 'babel-loader',
            exclude: path.resolve(__dirname, 'node_modules'),
            query: {
              presets: ['react', 'es2015']
            }
          },
          {
            test: /\.json$/,
            loader: 'json-loader',
          },
        ]
      },
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      }
    },
    webpackServer: {
      noInfo: true
    },
    reporters: ['nyan'],
    nyanReporter: {
      suppressErrorHighlighting: true,
    },
    
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
  });
};