import gulp  from 'gulp';
import fs from 'fs';
import glob from 'glob';
import path from 'path';
import {Server as KarmaServer} from 'karma';

import {coverage} from './coverage';
import mochaGlobals from '../test/setup/.globals.json';
const $ = global.$;

function bundleTests() {
  const suitesDir = path.join(__dirname, '/../test/suites');
  const output = path.join(suitesDir, 'suites.bundle.json');
  let res = {};
  let specs = glob.sync(path.join(suitesDir, '!(*.expected|*.bundle).json'));
  for (let specFile of specs) {
    let basename = path.basename(specFile, '.json');
    res[basename] = JSON.parse(fs.readFileSync(specFile));
    let expectedFile = path.join(suitesDir, basename + '.expected.json');
    let expected = null;
    try {
      fs.statSync(expectedFile);
      expected = JSON.parse(fs.readFileSync(expectedFile));
    } catch(e) {};
    res[basename].expected = expected;
  }
  fs.writeFileSync(output, JSON.stringify(res));
}

export function mocha() {
  require('babel-register');
  return gulp.src(['test/setup/node.js', 'test/**/*.spec.js', 'src/**/*.spec.js'], {read: false})
    .pipe($.mocha({
      reporter: 'spec',
      globals: Object.keys(mochaGlobals.globals),
      ignoreLeaks: false
    }));
}

function karma(done) {
  new KarmaServer({
    configFile: __dirname + '/../karma.conf.js',
    singleRun: true
  }, done).start();
};

function test(done) {
  bundleTests();
  if (process.env.KARMA) {
    karma(done);
  } else {
    coverage(done);
  }
}

// Lint and run our tests
gulp.task('test', ['build-yaml', 'lint'], test);
gulp.task('test-browser', ['build-yaml', 'lint'], karma);
