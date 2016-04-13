import gulp  from 'gulp';
import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';

const files = [
  './src/schemas/schema.yaml'
];

gulp.task('build-yaml', () => {
  files.forEach((file) => {
    let doc = yaml.safeLoad(fs.readFileSync(file, 'utf8'));
    let destFile = path.join(path.dirname(file), path.basename(file, '.yaml')) + '.json';
    fs.writeFileSync(destFile, JSON.stringify(doc))
  });
});
