import gulp  from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import requireDir from 'require-dir';

// Load all of our Gulp plugins
global.$ = loadPlugins();

requireDir('./tasks');

gulp.task('default', ['test']);
