// Karma configuration
// Generated on Fri Aug 04 2017 15:54:53 GMT+0800 (CST)

const webpack = require('webpack')

module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],

    files: [
      {
        pattern: 'test/**/*.spec.js',
        watched: false,
        include: true
      }
    ],

    exclude: [
    ],

    preprocessors: {
      './app/renderer/**/*.jsx': ['webpack', 'sourcemap', 'coverage'],
      './test/**/*.spec.js': ['webpack', 'sourcemap']
    },

    singleRun: process.env.NODE_ENV === 'production',

    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type: 'html',
      dir: './coverage/'
    },

    // webpack配置
    webpack: {
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.js(x)?$/,
            exclude: /(node_modules|bower_components)/,
            use: ['babel-loader', 'isparta-instrumenter-loader']
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
          },
          {
            test: /\.(png|jpg|gif|webp)$/,
            use: ['url-loader?limit=10240']
          }
        ]
      },
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
        'react-addons-test-utils': 'react-dom',
      }
    },

    // 只显示错误信息，不显示打包信息
    webpackMiddleware: {
      stats: 'errors-only'
    },

    browsers: ['Chrome'],

    plugins: [
      'karma-coverage',
      'karma-mocha',
      'karma-chrome-launcher',
      'karma-sourcemap-loader',
      // 'karma-phantomjs-launcher',
      'karma-webpack'
    ]
  })
}
