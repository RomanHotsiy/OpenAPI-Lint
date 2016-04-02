import gulp  from 'gulp';
import {Instrumenter} from 'isparta';

import {mocha} from './test';
const $ = global.$;

function coverage(done) {
  require('babel-register');
  gulp.src(['src/**/!(*spec).js'])
    .pipe($.istanbul({ instrumenter: Instrumenter }))
    .pipe($.istanbul.hookRequire())
    .on('finish', () => {
      return mocha()
        .pipe($.istanbul.writeReports())
        .on('end', done);
    });
}

gulp.task('coverage', ['lint'], coverage);
