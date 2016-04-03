module.exports = function (config) {
    let travis = process.env.TRAVIS;

    function configureLocalBrowsers() {
      let isMac     = /^darwin/.test(process.platform),
          isWindows = /^win/.test(process.platform),
          isLinux   = !(isMac || isWindows);

      if (isMac) {
        return ['PhantomJS', 'Firefox', 'Chrome'];
      } else if (isLinux) {
        return ['PhantomJS', 'Firefox'];
      } else {
        return ['PhantomJS'];
      }
    }


    config.set({
        frameworks: ['browserify', 'mocha', 'sinon-chai'],
        preprocessors: {
          'test/**/*.js': [ 'browserify' ],
          'src/**/*.js': [ 'browserify' ]
        },
        coverageReporter: {
          dir: 'coverage/',
          reporters: [
              {type: 'html'},
              {type: 'text-summary'},
              {type: 'lcov'}
          ]
        },
        browserify: {
          transform: [
            require('browserify-istanbul')({
              instrumenter: require('isparta'),
              ignore: ['**/*.spec.js']
            }),
            ['babelify', {'presets': ['es2015']}]
          ]
        },
        files: [
          'node_modules/babel-polyfill/dist/polyfill.js',
          './test/setup/browser.js',
          'test/**/*.spec.js',
          'src/**/*.spec.js',
          {pattern: 'test/specs/**', included: false, served: true}
        ],

        proxies: {
          '/test/': '/base/test/',
        },

        reporters:['mocha', 'coverage'],

        browsers: configureLocalBrowsers(),

        browserNoActivityTimeout: 60000
    });
}
