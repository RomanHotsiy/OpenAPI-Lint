import {groupBy, mapValues} from 'lodash';

import {runCheckers, getIssuesInfo} from './checkers';
import API from './types/api';
import chalk from 'chalk';

const OpenAPILint = {
  lint(spec) {
    return API.create(spec).then((api) => {
      let checks = runCheckers(api);
      return groupBy(checks, 'code');
    });
  },

  lintResolved(spec) {
    let api = API.createResolved(spec);
    let checks = runCheckers(api);
    return groupBy(checks, 'code');
  },

  getIssuesInfo
};

export default OpenAPILint;
