//*******************//
// Karma Test Runner //
//*******************//

var babelrc = JSON.parse(require('fs').readFileSync('.babelrc').toString())

// We use webpack to resolve import/require statements
var webpackConfig = require('./webpack.config.js')
webpackConfig.entry = {}
// inline the source map instead of a separate file
webpackConfig.devtool = 'inline-source-map'
// instrumentation for coverage
if (!webpackConfig.module.preLoaders) webpackConfig.module.preLoaders = []
webpackConfig.module.preLoaders.push({
    test: /\.jsx?$/,
    include: /src/,
    exclude: /(node_modules)/,
    loader: 'babel-istanbul',
    query: {
        cacheDirectory: true
}})
webpackConfig.resolve = {
    alias: {
        'isomorphic-fetch': 'mock-fetch',
    }
}
webpackConfig.externals = {
    'jsdom': 'window',
    'mockery': 'window',
}

module.exports = function(config) {
    config.set({
        autoWatch: true,
        singleRun: false,
        browsers: ['Chrome'],
        frameworks: ['mocha'],
        logLevel: config.LOG_INFO,
        files: [ 'tests.webpack.js' ],
        preprocessors: {
            'tests.webpack.js': ['webpack', 'sourcemap']
        },
        webpack: webpackConfig,
        webpackMiddleware: { noInfo: true },
        coverageReporter: {
          reporters: [
            { type: 'html', subdir: 'html' },
            { type: 'lcovonly', subdir: '.' },
          ],
        },
        reporters: ['progress', 'coverage', 'junit'],
        junitReporter: {
            outputDir: 'junit'
        }
    })
}
